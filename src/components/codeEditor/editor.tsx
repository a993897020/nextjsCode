/*
 * @Author: 关振俊
 * @Date: 2025-01-15 11:33:00
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-16 17:02:00
 * @Description:
 */
import { useEffect, useRef, useState } from "react";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";

export default function Editor(props: {
  initialValue: string;
  language: string;
  onChange?: (value: string, event: editor.IModelContentChangedEvent) => void;
  theme?: "vs" | "vs-dark" | "hc-black" | "hc-light";
  isOpenSide: boolean;
}) {
  const { initialValue, language, isOpenSide, onChange } = props;
  const editorRef = useRef<HTMLDivElement>(null);

  const [monacoEditor, setMonacoEditor] =
    useState<editor.IStandaloneCodeEditor>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [monacoModel, setMonacoModel] = useState<editor.ITextModel>();
  const { theme } = useTheme();

  self.MonacoEnvironment = {
    getWorker: function (moduleId, label) {
      if (label === "json") {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/json/json.worker",
            import.meta.url
          )
        );
      }
      if (label === "css" || label === "scss" || label === "less") {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/css/css.worker",
            import.meta.url
          )
        );
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/html/html.worker",
            import.meta.url
          )
        );
      }
      if (label === "typescript" || label === "javascript") {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/typescript/ts.worker",
            import.meta.url
          )
        );
      }
      return new Worker(
        new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url)
      );
    },
  };

  // Create the models & editors
  useEffect(() => {
    if (!editorRef.current) {
      throw new Error("the ref.current is null");
    }
    const model = editor.createModel(initialValue, language);
    const codeEditor = editor.create(editorRef.current, {
      theme: theme === "light" ? "vs" : "vs-dark",
      model,
      smoothScrolling: true,
    });
    setMonacoModel(model);
    setMonacoEditor(codeEditor);
    return () => {
      codeEditor.dispose();
      model.dispose();
    };
  }, [language, initialValue, theme, isOpenSide]);

  useEffect(() => {
    if (monacoEditor && onChange) {
      monacoEditor.onDidChangeModelContent((event) => {
        onChange(monacoEditor.getValue(), event);
      });
    }
  }, [monacoEditor, onChange]);

  return (
    <div
      ref={editorRef}
      className="flex-grow"
      style={{
        height: "calc(100vh - 64px)",
        width: isOpenSide ? "calc(100vw - 256px)" : "calc(100vw - 16px)",
      }}
    />
  );
}
