"use client";
/*
 * @Author: 关振俊
 * @Date: 2024-11-20 09:51:14
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 15:38:01
 * @Description: 全局错误:处理根目录layout和template组件的异常
 */
export interface IError {
  error: Error & { digest?: string };
  reset: () => void;
}
const GlobalError: React.FC<IError> = ({ reset }) => {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};
export default GlobalError;
