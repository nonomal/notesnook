import React from "react";
import createStore from "../common/store";
import { db } from "../common";
import { store as appStore } from "./app-store";
import BaseStore from "./index";
import config from "../utils/config";
import { EV } from "notes-core/common";
import { showLoadingDialog } from "../components/dialogs/loadingdialog";
import { Text } from "rebass";
import { showToast } from "../utils/toast";
import { showAccountLoggedOutNotice } from "../components/dialogs/confirm";

class UserStore extends BaseStore {
  isLoggedIn = false;
  isLoggingIn = false;
  isSigningIn = false;
  isSyncing = false;
  user = undefined;
  lastSynced = 0;

  init = () => {
    return db.user.fetchUser(true).then(async (user) => {
      if (!user) return false;
      this.set((state) => {
        state.user = user;
        state.isLoggedIn = true;
      });
      EV.subscribe("db:refresh", () => appStore.refresh());
      EV.subscribe("user:upgraded", (subscription) => {
        this.set((state) => {
          state.user = {
            ...state.user,
            subscription,
          };
        });
      });
      EV.subscribe("user:emailConfirmed", async () => {
        showToast("success", "Email confirmed successfully!");
        window.location.reload();
      });

      EV.subscribe("db:sync", () => this.sync(false));
      EV.subscribe("user:loggedOut", async (reason) => {
        this.set((state) => {
          state.user = {};
          state.isLoggedIn = false;
        });
        config.clear();
        await appStore.refresh();

        if (window.PasswordCredential) {
          await navigator.credentials.preventSilentAccess();
          if (navigator.credentials.requireUserMediation)
            await navigator.credentials.requireUserMediation();
        }
        if (!reason) {
          await showAccountLoggedOutNotice(reason);
        }
      });
      await this.sync();
      return true;
    });
  };

  login = (form) => {
    this.set((state) => (state.isLoggingIn = true));
    return db.user
      .login(form.email, form.password, form.remember)
      .then(() => {
        return showLoadingDialog({
          title: "Importing your data...",
          subtitle:
            "We are importing your data from the server. Please wait...",
          action: async () => {
            return await this.init();
          },
          message: (
            <Text color="error">
              Please do NOT close your browser or power off your device.
            </Text>
          ),
        });
      })
      .finally(() => {
        this.set((state) => (state.isLoggingIn = false));
      });
  };

  signup = (form) => {
    this.set((state) => (state.isSigningIn = true));
    return db.user
      .signup(form.email, form.password)
      .then(() => {
        return this.init();
      })
      .finally(() => {
        this.set((state) => (state.isSigningIn = false));
      });
  };

  sync = (full = true) => {
    this.set((state) => (state.isSyncing = true));
    return db
      .sync(full)
      .then(async () => {
        const lastSynced = await db.lastSynced();
        this.set((state) => (state.lastSynced = lastSynced));
        return await appStore.refresh();
      })
      .catch(async (err) => {
        if (err.code === "MERGE_CONFLICT") await appStore.refresh();
        else {
          showToast("error", err.message);
          console.error(err);
        }
      })
      .finally(() => {
        this.set((state) => (state.isSyncing = false));
      });
  };
}

/**
 * @type {[import("zustand").UseStore<UserStore>, UserStore]}
 */
const [useStore, store] = createStore(UserStore);
export { useStore, store };
