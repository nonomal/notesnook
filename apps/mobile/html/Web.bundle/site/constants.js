let pageTheme = {
  colors: {
    accent: '#00c853',
    shade: '#00c85312',
    fg: '#00c853',
    normal: 'black',
    icon: 'gray',
    errorBg: '#FFD2D2',
    errorText: '#D8000C',
    successBg: '#DFF2BF',
    successText: '#4F8A10',
    warningBg: '#FEEFB3',
    warningText: '#9F6000',
    night: false,
    bg: 'white',
    navbg: '#f6fbfc',
    nav: '#f0f0f0',
    pri: 'black',
    sec: 'white',
    factor: 1,
    border: '#E8E8E8'
  }
};

const markdownPatterns = [
  { start: '*', end: '*', format: 'italic' },
  { start: '**', end: '**', format: 'bold' },
  { start: '`', end: '`', format: 'code' },
  { start: '# ', format: 'h1' },
  { start: '## ', format: 'h2' },
  { start: '### ', format: 'h3' },
  { start: '#### ', format: 'h4' },
  { start: '##### ', format: 'h5' },
  { start: '###### ', format: 'h6' },
  { start: '* ', cmd: 'InsertUnorderedList' },
  { start: '- [x] ', cmd: 'insertCheckList', value: { checked: true } },
  { start: '- [ ] ', cmd: 'insertCheckList' },
  { start: '- ', cmd: 'InsertUnorderedList' },
  { start: '> ', format: 'blockquote' },
  {
    start: '1. ',
    cmd: 'InsertOrderedList',
    value: { 'list-style-type': 'decimal' }
  },
  {
    start: '1) ',
    cmd: 'InsertOrderedList',
    value: { 'list-style-type': 'decimal' }
  },
  {
    start: 'a. ',
    cmd: 'InsertOrderedList',
    value: { 'list-style-type': 'lower-alpha' }
  },
  {
    start: 'a) ',
    cmd: 'InsertOrderedList',
    value: { 'list-style-type': 'lower-alpha' }
  },
  {
    start: 'i. ',
    cmd: 'InsertOrderedList',
    value: { 'list-style-type': 'lower-roman' }
  },
  {
    start: 'i) ',
    cmd: 'InsertOrderedList',
    value: { 'list-style-type': 'lower-roman' }
  },
  { start: '---', replacement: '<hr/>' },
  { start: '--', replacement: '—' },
  { start: '(c)', replacement: '©' }
];

function dark() {
  if (document.getElementById('dark_sheet')) {
    document.getElementById('dark_sheet').removeAttribute('disabled');
    document.getElementById('light_sheet').setAttribute('disabled');
  }
  if (!globalThis.tinymce) return;
  if (!tinymce.activeEditor) return;
  tinymce.activeEditor.dom.styleSheetLoader.unload('dist/skins/notesnook/content.min.css');
  tinymce.activeEditor.dom.styleSheetLoader.load('dist/skins/notesnook-dark/content.min.css');
  tinymce.activeEditor.ui.styleSheetLoader.unload('dist/skins/notesnook/skin.min.css');
  tinymce.activeEditor.ui.styleSheetLoader.load('dist/skins/notesnook-dark/skin.min.css');
}

function light() {
  if (document.getElementById('dark_sheet')) {
    document.getElementById('dark_sheet').setAttribute('disabled');
    document.getElementById('light_sheet').removeAttribute('disabled');
  }
  if (!globalThis.tinymce) return;
  if (!tinymce.activeEditor) return;
  tinymce.activeEditor.dom.styleSheetLoader.unload('dist/skins/notesnook-dark/content.min.css');
  tinymce.activeEditor.dom.styleSheetLoader.load('dist/skins/notesnook/content.min.css');
  tinymce.activeEditor.ui.styleSheetLoader.unload('dist/skins/notesnook-dark/skin.min.css');
  tinymce.activeEditor.ui.styleSheetLoader.load('dist/skins/notesnook/skin.min.css');
}

const codeblock_theme_light = `


.hljs {
  color: #383a42;
  background: #fafafa !important;
  text-shadow: none !important;
}

.hljs-comment,
.hljs-quote {
  color: #a0a1a7;
  font-style: italic !important;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #a626a4 !important;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e45649 !important;
}

.hljs-literal {
  color: #0184bb !important;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #50a14f !important;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #986801 !important;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #4078f2 !important;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #c18401 !important;
}

.hljs-emphasis {
  font-style: italic !important;
}

.hljs-strong {
  font-weight: 600 !important;
}

.hljs-link {
  text-decoration: underline !important;
}

.mce-content-body hr {
  border-color: #b1b1b1 !important;
}
`;

const codeblock_theme_dark = `


.hljs {
  color: #abb2bf !important;
  background: #282c34 !important;
  text-shadow: none !important;
}

.hljs-comment,
.hljs-quote {
  color: #5c6370 !important;
  font-style: italic !important;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #c678dd !important;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75 !important;
}

.hljs-literal {
  color: #56b6c2 !important;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #98c379 !important;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #d19a66 !important;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee !important;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #e6c07b !important;
}

.hljs-emphasis {
  font-style: italic !important;
}

.hljs-strong {
  font-weight: 600 !important;
}

.hljs-link {
  text-decoration: underline !important;
}

.mce-content-body hr {
  border-color: #b1b1b1 !important;
}

`;

let styleElementDocument = null;
let styleElementEditorDocument = null;

function setTheme() {
  if (globalThis.tinymce) {
    if (pageTheme.colors.night) {
      dark();
    } else {
      light();
    }

    addStyle();

    let node2 = `
  .mce-content-body table[data-mce-selected], {
    outline: 3px solid ${pageTheme.colors.shade} !important;
}

.mce-content-body audio[data-mce-selected], 
  .mce-content-body embed[data-mce-selected], 
  .mce-content-body img[data-mce-selected], 
  .mce-content-body object[data-mce-selected], 
  .mce-content-body video[data-mce-selected] {
    outline: 3px solid ${pageTheme.colors.shade} !important;
    border-radius:5px;
}

.mce-content-body div.mce-resizehandle {
  background-color: ${pageTheme.colors.accent} !important;
  border-color:  ${pageTheme.colors.accent} !important;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  height: 30px !important;
  position: absolute;
  width: 30px !important;
  z-index: 10000;
  opacity:0.5;
}

.mce-content-body a {
  color: ${pageTheme.colors.accent} !important;
}

.mce-content-body [data-mce-selected="inline-boundary"] {
  background-color: ${pageTheme.colors.shade} !important;
}

::selection {
  color: white !important;
  background: ${pageTheme.colors.accent} !important;
}


img::selection,
video::selection,
iframe::selection,
.mce-preview-object::selection {
  color: white !important;
  background: transparent !important;
} {
  color: white !important;
  background: transparent !important;
} {
  color: white !important;
  background: transparent !important;
}


.mce-content-body a[data-mce-selected] {
  box-shadow: none !important;
}

span.attachment {
  overflow: hidden;
  position: relative;
  z-index: 1;
  user-select: none;
  display: inline-flex;
  align-items: center;
  background-color: ${pageTheme.colors.nav};
  padding: 0px 5px 0px 22px;
  border-radius: 3px;
  border: 1px solid var(--border);
  font-size: 0.85rem;
  cursor: pointer !important;
  word-break: break-all;
  max-width: 250px;
}

span.attachment .filename {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

span.attachment:not([data-progress])::after {
  content: attr(data-size);
  color: ${pageTheme.colors.icon};
  margin-left: 5px;
  font-size: 0.7rem;
  white-space: nowrap;
}

span.attachment[data-progress]::after {
  content: attr(data-progress);
  color:${pageTheme.colors.icon};
  margin-left: 5px;
  font-size: 0.7rem;
  white-space: nowrap;
}

span.attachment::before {
  display: inline-block;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: var(--progress, 0px);
  height: 100%;
  transition: width 100ms ease-in;
  background-size: 15px 15px;
  background-repeat: no-repeat;
  background-position: 5px 1.5px;
  background-color: var(--border);
}

span.attachment em::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  left: 5px;
  top: 1.5px;
  background-color: ${pageTheme.colors.pri};
  -webkit-mask-size: 15px 15px;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' width='24'%3E%3Cpath d='M7.5,18A5.5,5.5 0 0,1 2,12.5A5.5,5.5 0 0,1 7.5,7H18A4,4 0 0,1 22,11A4,4 0 0,1 18,15H9.5A2.5,2.5 0 0,1 7,12.5A2.5,2.5 0 0,1 9.5,10H17V11.5H9.5A1,1 0 0,0 8.5,12.5A1,1 0 0,0 9.5,13.5H18A2.5,2.5 0 0,0 20.5,11A2.5,2.5 0 0,0 18,8.5H7.5A4,4 0 0,0 3.5,12.5A4,4 0 0,0 7.5,16.5H17V18H7.5Z'%3E%3C/path%3E%3C/svg%3E");
  mask-size: 15px 15px;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' width='24'%3E%3Cpath d='M7.5,18A5.5,5.5 0 0,1 2,12.5A5.5,5.5 0 0,1 7.5,7H18A4,4 0 0,1 22,11A4,4 0 0,1 18,15H9.5A2.5,2.5 0 0,1 7,12.5A2.5,2.5 0 0,1 9.5,10H17V11.5H9.5A1,1 0 0,0 8.5,12.5A1,1 0 0,0 9.5,13.5H18A2.5,2.5 0 0,0 20.5,11A2.5,2.5 0 0,0 18,8.5H7.5A4,4 0 0,0 3.5,12.5A4,4 0 0,0 7.5,16.5H17V18H7.5Z'%3E%3C/path%3E%3C/svg%3E");
}

.mce-content-body code[data-mce-selected="inline-boundary"]:not(pre code),
.hljs[data-mce-selected="inline-boundary"]:not(pre code) {
  background-color: ${pageTheme.colors.nav} !important;
}

.mce-content-body code:not(pre code),
.hljs:not(pre code) {
  background-color: ${pageTheme.colors.nav} !important;
  border: 1px solid ${pageTheme.colors.border} !important;
  border-radius: 5px !important;
  padding: 3px 5px 0px 5px !important;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono,
    Menlo, monospace !important;
  font-size: 10pt !important;
  overflow-x:auto !important;
}

.tox-checklist > li,
.checklist > li {
  list-style: none;
  margin: 0.25em 0;
  color: ${pageTheme.colors.pri};
}

.tox-checklist > li::before,
.checklist > li::before {
  content: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-unchecked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2215%22%20height%3D%2215%22%20x%3D%22.5%22%20y%3D%22.5%22%20fill-rule%3D%22nonzero%22%20stroke%3D%22%234C4C4C%22%20rx%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A');
  cursor: pointer;
  height: 1.1em;
  margin-left: -2.5em;
  margin-top: 0.125em;
  position: absolute;
  width: 1.5em;
  padding-left: 1em;
}



.tox-checklist li.tox-checklist--checked::before,
.checklist li.checked::before {
  content: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-checked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23${pageTheme.colors.accent.replace(
    '#',
    ''
  )}%22%20fill-rule%3D%22nonzero%22%20rx%3D%222%22%2F%3E%3Cpath%20id%3D%22Path%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20d%3D%22M11.5703186%2C3.14417309%20C11.8516238%2C2.73724603%2012.4164781%2C2.62829933%2012.83558%2C2.89774797%20C13.260121%2C3.17069355%2013.3759736%2C3.72932262%2013.0909105%2C4.14168582%20L7.7580587%2C11.8560195%20C7.43776896%2C12.3193404%206.76483983%2C12.3852142%206.35607322%2C11.9948725%20L3.02491697%2C8.8138662%20C2.66090143%2C8.46625845%202.65798871%2C7.89594698%203.01850234%2C7.54483354%20C3.373942%2C7.19866177%203.94940006%2C7.19592841%204.30829608%2C7.5386474%20L6.85276923%2C9.9684299%20L11.5703186%2C3.14417309%20Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A');
}

.tox-checklist li.tox-checklist--checked,
.checklist li.checked {
  color:${pageTheme.colors.icon};
}

[dir="rtl"] .tox-checklist > li::before,
[dir="rtl"] .checklist > li::before {
  margin-left: 0;
  margin-right: -1.5em;
}

a[data-mce-selected],
td[data-mce-selected],
th[data-mce-selected],
table[data-mce-selected] {
  box-shadow: none !important;
}

/* TABLE */

.mce-content-body table {
  table-layout: fixed;
  border-collapse: separate !important;
  border-spacing: 0px;
  border: none !important;
  border-radius: 5px;
  font-size: 14px;
  min-width: 100% !important;
}

tr td,
tr th {
  padding: 5px !important;
  border: 1px solid ${pageTheme.colors.border} !important;
}

thead tr td,
tbody tr td,
thead tr th,
tbody tr th {
  border-left: none !important;
  border-top: none !important;
}

tfoot tr td,
tfoot tr th, {
  border-left: none !important;
}

table caption,
thead td {
  border-bottom: 1px solid ${pageTheme.colors.border} !important;
}

tfoot td {
  border-top: 1px solid ${pageTheme.colors.border} !important;
}

.mce-content-body td:last-child {
  border-right: none !important;
}

.mce-content-body tbody tr:last-child td {
  border-bottom: none !important;
}

.mce-content-body tr:nth-child(even) {
  background-color: ${pageTheme.colors.nav};
}

table thead {
  font-weight: bold !important;
}

.mce-content-body .table-container {
  border: 1px solid ${pageTheme.colors.border} !important;
  border-radius: 5px;
  overflow-x: auto;
  max-width: 100%;
}

td,
th {
  min-width:100px !important;
}

.mce-content-body td > *,
.mce-content-body th > * {
  margin: 0 !important;
}

.mce-content-body td > * + *,
.mce-content-body th > * + * {
  margin-top: 0.75em !important;
}

.mce-content-body td[data-mce-selected]::after,
.mce-content-body th[data-mce-selected]::after {
  background-color: ${pageTheme.colors.shade} !important;
  border: 1px solid ${pageTheme.colors.shade} !important;
  bottom: -1px;
  content: "";
  left: -1px;
  mix-blend-mode: multiply;
  position: absolute;
  right: -1px;
  top: -1px;
}

.mce-content-body table td:hover {
  background-color: ${pageTheme.colors.shade};
}

.mce-content-body table[data-mce-selected] tr[data-mce-active] {
  background-color: ${pageTheme.colors.shade};
  /* color: var(--static); */
}

.mce-content-body
  table[data-mce-selected]
  tr[data-mce-active]
  td:not([data-mce-active]),
.mce-content-body
  table[data-mce-selected]
  tr[data-mce-active]
  th:not([data-mce-active]) {
  border-bottom: 1px solid ${pageTheme.colors.accent + 'B3'} !important;
  border-top: 1px solid ${pageTheme.colors.accent + 'B3'} !important;
}

.mce-content-body
  table[data-mce-selected]
  tr[data-mce-active]
  td:not([data-mce-active]):first-child,
.mce-content-body
  table[data-mce-selected]
  tr[data-mce-active]
  th:not([data-mce-active]):first-child {
  border-left: 1px solid ${pageTheme.colors.accent + 'B3'} !important;
}

.mce-content-body
  table[data-mce-selected]
  tr[data-mce-active]
  td:not([data-mce-active]):last-child,
.mce-content-body
  table[data-mce-selected]
  tr[data-mce-active]
  th:not([data-mce-active]):last-child {
  border-right: 1px solid ${pageTheme.colors.accent + 'B3'} !important;
}

.mce-content-body table[data-mce-selected] td[data-mce-active],
.mce-content-body table[data-mce-selected] th[data-mce-active] {
  border: 2px solid ${pageTheme.colors.accent + 'B3'} !important;
  background-color: ${pageTheme.colors.shade};
}

pre code {
  background-color: transparent !important;
  font-size: 10pt !important;
  padding: 0px 0px 0px 0px !important;
  overflow-x:auto !important;
}


h1::before,
h2::before,
h3::before,
h4::before,
h5::before,
h6::before {
  background-color: ${pageTheme.colors.icon};
}

`;

    if (pageTheme.colors.night) {
      node2 = node2 + codeblock_theme_dark;
    } else {
      node2 = node2 + codeblock_theme_light;
    }

    if (tinymce && tinymce.activeEditor) {
      if (!styleElementEditorDocument) {
        styleElementEditorDocument = document.createElement('style');
        let doc = tinymce.activeEditor.dom.doc;
        styleElementEditorDocument.innerHTML = node2;
        doc.head.appendChild(styleElementEditorDocument);
      } else {
        styleElementEditorDocument.innerHTML = node2;
      }
    }
  }

  let node = `
  body {
    color: ${pageTheme.colors.pri};
    font-family:"Open Sans";
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    color: ${pageTheme.colors.heading};
    font-weight:600 !important;
  }

  img {
    max-width:100% !important;
    height:auto !important;
    border-radius:5px !important;
  }

	#titleInput {
	  color:${pageTheme.colors.heading};
	  font-size:${25 * pageTheme.colors.factor};
	}
  
	#titleInput::-webkit-input-placeholder {
	  color:${pageTheme.colors.icon};
	}

	.info-bar {
	  color:${pageTheme.colors.icon};
	}

  .tag-bar-parent {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding-right: 12px;
    padding-left: 12px;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .tag-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .tag {
    background-color: ${pageTheme.colors.nav};
    border-radius: 100px;
    margin-right: 5px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 12px;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .newtag {
    background-color: ${pageTheme.colors.nav};
    border-radius: 100px;
    margin-right: 5px;
    padding-left: 12px !important;
    padding-right: 12px !important;
    font-size: 12px;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .tag:active,
  .tag:focus,
  .pressed {
    background-color: ${pageTheme.colors.transGray} !important;
    border-width: 2px;
  }

  .alttagnew {
    padding-left: 12px !important;
    padding-right: 6px !important;
  }
  .alttagnew svg {
    padding-right:3px;
  }

  .newtag {
    padding-left: 20px;
    padding-right: 20px;
    color:${pageTheme.colors.icon};
  }

  .tag svg,
  .newtag svg {
    fill: ${pageTheme.colors.accent};
    width: 20px;
    height: 20px;
  }

  .hidden {
    opacity:1;
  }

  .tag p {
    margin: 0px !important;
    pointer-events: none;
    user-select: none;
    color: ${pageTheme.colors.icon};
  }
  
	  #titlebar {
		display:flex !important;
	  }
    
    .tox .tox-tbtn:hover {
      background: ${pageTheme.colors.shade} !important;
    }
    
    .tox-textfield {
      border-radius: 0px !important;
      border-color: ${pageTheme.colors.nav} !important;
      border-width: 0px 0px 2px 0px !important;
      color: var(--text) !important;
      padding: 10px !important;
      font-size: 0.875rem !important;
      line-height: 0.875rem !important;
    }
    
    .tox-textfield:focus {
      outline: none !important;
      border-color: ${pageTheme.colors.accent} !important;
      border-width: 0px 0px 2px 0px !important;
      border-radius: 0px !important;
    }
    
    .tox-textfield:hover {
      border-color: ${pageTheme.colors.accent + '80'} !important;
    }

    .tox .tox-tbtn--select {
      min-width: 120px;
    }
    
    .tox-button {
      background-color: ${pageTheme.colors.accent} !important;
      color: white;
      transition: opacity 300ms linear;
      border-width: 0px !important;
    }
    
    .tox-button:hover:not(.tox-button[disabled="disabled"]) {
      opacity: 0.8;
    }
    
    .tox-button--secondary,
    .tox-button--icon {
      background-color: ${pageTheme.colors.nav} !important;
      color: ${pageTheme.colors.icon} !important;
    }
    .tox-button[disabled="disabled"] {
      background-color:  ${pageTheme.colors.nav}  !important;
      color: ${pageTheme.colors.icon} !important;
    }
    
    tox-tbtn tox-tbtn--select {
      border-radius: 5px !important;
    }
    
    .tox-dialog {
      border-radius: 5px !important;
      border-width: 0px !important;
      box-shadow: 4px 5px 18px 2px #00000038;
      padding: 0px !important;
      max-width: 95vw !important;
      margin-left:2.5vw,
      margin-right:2.5vw,
      align-self:center !important;
    }
    
    .tox-dialog__footer {
      border-top: 0px !important;
    }
    
    .tox-dialog__title {
      color: ${pageTheme.colors.pri} !important;
      font-size: 1.2rem !important;
      font-weight: bold !important;
    }
    
    .tox .tox-toolbar,
    .tox .tox-toolbar__overflow,
    .tox .tox-toolbar__primary {
      background: none !important;
      border-bottom: 1px solid ${pageTheme.colors.nav} !important;
    }

    ::selection {
      color: white !important;
      background: ${pageTheme.colors.accent} !important;
    }

    .tox-checklist > li,
.checklist > li {
  list-style: none;
  margin: 0.25em 0;
}

.tox-checklist > li::before,
.checklist > li::before {
  content: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-unchecked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2215%22%20height%3D%2215%22%20x%3D%22.5%22%20y%3D%22.5%22%20fill-rule%3D%22nonzero%22%20stroke%3D%22%234C4C4C%22%20rx%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A');
  cursor: pointer;
  height: 1.1em;
  margin-left: -2.5em;
  margin-top: 0.125em;
  position: absolute;
  width: 1.5em;
  padding-left: 1em;
}



.tox-checklist li.tox-checklist--checked::before,
.checklist li.checked::before {
  content: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-checked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23${pageTheme.colors.accent.replace(
    '#',
    ''
  )}%22%20fill-rule%3D%22nonzero%22%20rx%3D%222%22%2F%3E%3Cpath%20id%3D%22Path%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20d%3D%22M11.5703186%2C3.14417309%20C11.8516238%2C2.73724603%2012.4164781%2C2.62829933%2012.83558%2C2.89774797%20C13.260121%2C3.17069355%2013.3759736%2C3.72932262%2013.0909105%2C4.14168582%20L7.7580587%2C11.8560195%20C7.43776896%2C12.3193404%206.76483983%2C12.3852142%206.35607322%2C11.9948725%20L3.02491697%2C8.8138662%20C2.66090143%2C8.46625845%202.65798871%2C7.89594698%203.01850234%2C7.54483354%20C3.373942%2C7.19866177%203.94940006%2C7.19592841%204.30829608%2C7.5386474%20L6.85276923%2C9.9684299%20L11.5703186%2C3.14417309%20Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A');
}

.tox-checklist li.tox-checklist--checked,
.checklist li.checked {
  color:${pageTheme.colors.icon};
}

[dir="rtl"] .tox-checklist > li::before,
[dir="rtl"] .checklist > li::before {
  margin-left: 0;
  margin-right: -1.5em;
}

/* TABLE */

table {
  table-layout: fixed;
  border-collapse: separate !important;
  border-spacing: 0px;
  border: none !important;
  border-radius: 5px;
  font-size: 14px;
  min-width: 100% !important;
}

tr td,
tr th {
  padding: 5px !important;
  border: 1px solid ${pageTheme.colors.border} !important;
}

thead tr td,
tbody tr td,
thead tr th,
tbody tr th {
  border-left: none !important;
  border-top: none !important;
}

tfoot tr td,
tfoot tr th, {
  border-left: none !important;
}

table caption,
thead td {
  border-bottom: 1px solid ${pageTheme.colors.border} !important;
}

tfoot td {
  border-top: 1px solid ${pageTheme.colors.border} !important;
}

td:last-child {
  border-right: none !important;
}

tbody tr:last-child td {
  border-bottom: none !important;
}

tr:nth-child(even) {
  background-color: ${pageTheme.colors.nav};
}

table thead {
  font-weight: bold !important;
}

.table-container {
  border: 1px solid ${pageTheme.colors.border} !important;
  border-radius: 5px;
  overflow-x: auto;
  max-width: 100%;
}

td,
th {
  min-width:100px !important;
}

td > *,
th > * {
  margin: 0 !important;
}

td > * + *,
th > * + * {
  margin-top: 0.75em !important;
}

td[data-mce-selected]::after,
th[data-mce-selected]::after {
  background-color: ${pageTheme.colors.shade} !important;
  border: 1px solid ${pageTheme.colors.shade} !important;
  bottom: -1px;
  content: "";
  left: -1px;
  mix-blend-mode: multiply;
  position: absolute;
  right: -1px;
  top: -1px;
}

table td:hover {
  background-color: ${pageTheme.colors.shade};
}

table[data-mce-selected] tr[data-mce-active] {
  background-color: ${pageTheme.colors.shade};
  /* color: var(--static); */
}

table[data-mce-selected]
  tr[data-mce-active]
  td:not([data-mce-active]),
table[data-mce-selected]
  tr[data-mce-active]
  th:not([data-mce-active]) {
  border-bottom: 1px solid ${pageTheme.colors.accent + 'B3'} !important;
  border-top: 1px solid ${pageTheme.colors.accent + 'B3'} !important;
}

table[data-mce-selected]
  tr[data-mce-active]
  td:not([data-mce-active]):first-child,
table[data-mce-selected]
  tr[data-mce-active]
  th:not([data-mce-active]):first-child {
  border-left: 1px solid ${pageTheme.colors.accent + 'B3'} !important;
}

table[data-mce-selected]
  tr[data-mce-active]
  td:not([data-mce-active]):last-child,
table[data-mce-selected]
  tr[data-mce-active]
  th:not([data-mce-active]):last-child {
  border-right: 1px solid ${pageTheme.colors.accent + 'B3'} !important;
}

table[data-mce-selected] td[data-mce-active],
table[data-mce-selected] th[data-mce-active] {
  border: 2px solid ${pageTheme.colors.accent + 'B3'} !important;
  background-color: ${pageTheme.colors.shade};
}

 code[data-mce-selected="inline-boundary"]:not(pre code),
.hljs[data-mce-selected="inline-boundary"] {
  background-color: ${pageTheme.colors.nav} !important;
}


code:not(pre code),
.hljs {
  background-color: ${pageTheme.colors.nav} !important;
  border: 1px solid ${pageTheme.colors.border} !important;
  border-radius: 5px !important;
  padding: 3px 5px 0px 5px !important;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono,
    Menlo, monospace !important;
  font-size: 10pt !important;
}

a {
  color: ${pageTheme.colors.accent} !important;
}

`;

  if (pageTheme.colors.night) {
    node = node + codeblock_theme_dark;
  } else {
    node = node + codeblock_theme_light;
  }

  if (!styleElementDocument) {
    styleElementDocument = document.createElement('style');
    styleElementDocument.type = 'text/css';
    styleElementDocument.innerHTML = node;
    document.getElementsByTagName('head')[0].appendChild(styleElementDocument);
  } else {
    styleElementDocument.innerHTML = node;
  }
}

var minifyImg = function (
  dataUrl,
  newWidth,
  imageType = 'image/jpeg',
  resolve,
  imageArguments = 0.7
) {
  fetch(dataUrl).then(function (res) {
    res.blob().then(function (blob) {
      new Compressor(blob, {
        quality: imageArguments,
        width: newWidth,
        mimeType: imageType,
        success: function (result) {
          let fileReader = new FileReader();
          fileReader.onloadend = function () {
            resolve(fileReader.result);
            fileReader.onloadend = null;
          };
          fileReader.readAsDataURL(result);
        },
        error: function (err) {
          console.log(err.message);
        }
      });
    });
  });
};

function loadImage() {
  let fileInput = document.querySelector('#image-input');
  let listener = function () {
    if (fileInput.files != null && fileInput.files[0] != null) {
      let reader = new FileReader();
      console.log(reader.readyState, 'READY STATE');
      let load = function (e) {
        console.log(e, 'loaded error');
        minifyImg(
          reader.result,
          1024,
          'image/jpeg',
          function (r) {
            var content = `<img style="max-width:100% !important;" src="${r}">`;
            editor.insertContent(content);
          },
          0.6
        );
        fileInput.removeEventListener('change', listener);
        reader.removeEventListener('load', load);
      };
      let error = function () {
        console.log('error');
        reader.onload = null;
        fileInput.removeEventListener('change', listener);
        reader.removeEventListener('load', load);
        reader.removeEventListener('error', error);
      };
      reader.onabort = function () {
        console.log('abort');
      };
      reader.addEventListener('load', load);
      reader.addEventListener('error', error);
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  fileInput.addEventListener('change', listener);
  fileInput.click();
}
