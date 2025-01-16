/*
 * @Author: 关振俊
 * @Date: 2025-01-15 14:33:03
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-15 14:50:55
 * @Description:
 */
import * as monaco from "monaco-editor";
// import editorWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
// import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
// import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
// import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
// import typescriptWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";

function initMonaco() {
  //   self.MonacoEnvironment = {
  //     getWorker: function (_workerId: string, label: string) {
  //       switch (label) {
  //         case "json":
  //           return new jsonWorker({ name: label });
  //         case "css":
  //           return new cssWorker({ name: label });
  //         case "html":
  //         case "xhtml":
  //         case "xml":
  //           return new htmlWorker({ name: label });
  //         case "javascript":
  //           return new typescriptWorker({ name: label });
  //         default:
  //           return new editorWorker({ name: label });
  //       }
  //     },
  //   };

  emmetHTML(monaco);
  emmetCSS(monaco);
  return monaco;
}

export { initMonaco };
