import type { Monaco } from "@monaco-editor/react";

/**
 * 将对象转化为数组形式
 * @param input 待转换对象
 * @param path 递归路径
 * @param pathList 转换后的路径数组
 */
const convertObject2Array = (
  input: Record<any, any>,
  path: string[],
  pathList: string[][]
) => {
  const arr = Object.keys(input);
  for (const k in arr) {
    const res = [path, arr[k]].flat();

    if (input[arr[k]].constructor !== Object) {
      // Object 递归处理
      // 说明找到了一条完整的路径
      pathList.push(res);

      if (k === String(arr.length - 1)) return;
    } else {
      convertObject2Array(input[arr[k]], res, pathList);
    }
  }
};

const getLastData = (content: string, index: number) => {
  content = content.substring(0, index - 1);
  const sql = content
    .trim()
    .replace(/\s+/g, " ")
    .replace(/,/g, ", ")
    .replace(/=/g, "= ")
    .replace(/\(/g, "( ");
  const splitRes = sql.split(" ");
  const res = splitRes[splitRes.length - 1];
  return res.substring(0, res.length - 1);
};

/**
 * 将对象注入到monaco编辑器中进行提示
 * @param monaco 编辑器实例
 * @param obj 注入对象
 * @param triggerCharacters 触发字符
 */
export const injectSuggestionsByObject = (
  monaco: Monaco,
  obj: Record<any, any>,
  triggerCharacters = ["."]
) => {
  const suggestionData: string | any[] = []; // 二维数组
  convertObject2Array(obj, [], suggestionData);

  monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: (model, position) => {
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: model.getWordUntilPosition(position).startColumn,
        endColumn: model.getWordUntilPosition(position).endColumn,
      };
      const line = position.lineNumber;
      const content = model.getLineContent(line);
      const point = content[position.column - 2];
      const data = getLastData(content, position.column);
      const property = data.split(triggerCharacters[0]); // [ 'basic' , 'Info' ]  -----> 期望 .出 name
      const suggestions: any[] = [];

      // 横向遍历二维数组 找到满足条件的所有行
      if (property.length !== 0 && triggerCharacters.indexOf(point) !== -1) {
        for (let r = 0; r < suggestionData.length; r++) {
          for (let c = 0; c < property.length; c++) {
            if (property[c] !== suggestionData[r][c]) {
              continue;
            }
            if (c === property.length - 1) {
              // 避免重复添加相同的提示
              if (
                suggestions.findIndex(
                  (suggestion) => suggestion.label === suggestionData[r][c + 1]
                ) === -1
              ) {
                // 转成provider需要的格式
                suggestions.push({
                  label: suggestionData[r][c + 1], // 显示的提示内容
                  kind: monaco.languages.CompletionItemKind.Function, // 用来显示提示内容后的不同的图标
                  insertText: suggestionData[r][c + 1], // 选择后粘贴到编辑器中的文字
                  detail: "", // 提示内容后的说明
                  range: range,
                });
              }
            }
          }
        }
      }

      return { suggestions: suggestions };
    },
    triggerCharacters: triggerCharacters,
  });
};
