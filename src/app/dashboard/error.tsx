/*
 * @Author: 关振俊
 * @Date: 2024-11-20 09:42:25
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 09:53:08
 * @Description: 错误页面
 */
"use client"; //错误组件必须是客户端组件
import { useEffect } from "react";
import { IError } from "../global-error";

const Error: React.FC<IError> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <div>
        <h2>Something went wrong!</h2>
        <button
          onClick={
            // 尝试恢复
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </>
  );
};
export default Error;
