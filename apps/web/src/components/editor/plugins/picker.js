import Compressor from "compressorjs";
import { AppEventManager, AppEvents } from "../../../common/app-events";
import { db } from "../../../common/db";
import {
  showBuyDialog,
  showProgressDialog,
} from "../../../common/dialog-controller";
import { isUserPremium } from "../../../hooks/use-is-user-premium";
import fs from "../../../interfaces/fs";
import { formatBytes } from "../../../utils/filename";
import { showToast } from "../../../utils/toast";

const FILE_SIZE_LIMIT = 500 * 1024 * 1024;
const IMAGE_SIZE_LIMIT = 50 * 1024 * 1024;

function register(editor) {
  editor.ui.registry.addButton("attachment", {
    icon: "attachment",
    tooltip: "Attach a file",
    onAction: () => insertAttachment(editor, "*/*"),
  });

  editor.ui.registry.addButton("image", {
    icon: "image",
    tooltip: "Insert image",
    onAction: () => insertAttachment(editor, "image/*"),
  });
}

async function insertAttachment(editor, type) {
  if (!isUserPremium()) {
    await showBuyDialog();
    return;
  }

  const selectedFile = await showFilePicker({
    acceptedFileTypes: type || "*/*",
  });

  await attachFile(editor, selectedFile);
}

export async function attachFile(editor, selectedFile) {
  if (!isUserPremium()) {
    await showBuyDialog();
    return;
  }
  if (selectedFile.type.startsWith("image/")) {
    const image = await pickImage(selectedFile);
    console.log(image);
    editor.execCommand("mceAttachImage", image);
  } else {
    const file = await pickFile(selectedFile);
    editor.execCommand("mceAttachFile", file);
  }
}

(function init() {
  global.tinymce.PluginManager.add("picker", register);
})();

/**
 * @param {File} selectedFile
 * @returns
 */
async function pickFile(selectedFile) {
  try {
    if (selectedFile.size > FILE_SIZE_LIMIT)
      throw new Error("File too big. You cannot add files over 500 MB.");
    if (!selectedFile) return;

    return await addAttachment(selectedFile);
  } catch (e) {
    showToast("error", `${e.message}`);
  }
}

/**
 * @param {File} selectedImage
 * @returns
 */
async function pickImage(selectedImage) {
  try {
    if (selectedImage.size > IMAGE_SIZE_LIMIT)
      throw new Error("Image too big. You cannot add images over 50 MB.");
    if (!selectedImage) return;

    const { dataurl, file } = await compressImage(selectedImage, "buffer");
    return await addAttachment(file, dataurl);
  } catch (e) {
    showToast("error", e.message);
  }
}

async function getEncryptionKey() {
  const key = await db.attachments.generateKey();
  if (!key) throw new Error("Could not generate a new encryption key.");
  return key;
}

/**
 *
 * @returns {Promise<File>}
 */
function showFilePicker({ acceptedFileTypes }) {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", acceptedFileTypes);
    input.dispatchEvent(new MouseEvent("click"));
    input.onchange = async function () {
      var file = this.files[0];
      if (!file) return null;
      resolve(file);
    };
  });
}

/**
 *
 * @param {File} file
 * @param {"base64"|"buffer"} type
 * @returns
 */
function compressImage(file) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      mimeType: file.type,
      maxWidth: 4000,
      maxHeight: 4000,
      /**
       *
       * @param {Blob} result
       */
      async success(result) {
        const buffer = await result.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        resolve({
          dataurl: `data:${file.type};base64,${base64}`,
          file: new File([result], file.name, {
            lastModified: file.lastModified,
            type: file.type,
          }),
        });
      },
      error(err) {
        reject(err);
      },
    });
  });
}

/**
 *
 * @param {File} file
 * @param {string} dataurl
 * @returns
 */
async function addAttachment(file, dataurl) {
  const result = await showProgressDialog({
    title: `Encrypting attachment`,
    subtitle: "Please wait while we encrypt this attachment for upload.",
    message: file.name,
    total: formatBytes(file.size, 0),
    setProgress: (set) => {
      const event = AppEventManager.subscribe(
        AppEvents.UPDATE_ATTACHMENT_PROGRESS,
        ({ type, total, loaded }) => {
          if (type !== "encrypt") return;

          const percent = Math.round((loaded / total) * 100);
          set({ loaded: formatBytes(loaded, 0), progress: percent });
        }
      );
      return () => {
        event.unsubscribe();
      };
    },
    action: async () => {
      const key = await getEncryptionKey();

      const reader = file.stream().getReader();
      const { hash, type: hashType } = await fs.hashStream(reader);
      reader.releaseLock();

      if (!db.attachments.exists(hash)) {
        const output = await fs.writeEncryptedFile(file, key, hash);
        if (!output) throw new Error("Could not encrypt file.");

        await db.attachments.add({
          ...output,
          hash,
          hashType,
          filename: file.name,
          type: file.type,
          key,
        });
      }

      return {
        hash: hash,
        filename: file.name,
        type: file.type,
        size: file.size,
        dataurl,
      };
    },
  });
  console.log(file, dataurl, result);
  if (result instanceof Error) throw result;
  return result;
}
