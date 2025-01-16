"use client";
import { useState } from "react";

/*
 * @Author: 关振俊
 * @Date: 2024-11-20 09:28:46
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 15:14:26
 * @Description:首页
 */

const Page: React.FC = () => {
  // 模拟网络延迟 测试loading页面
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  const [isError, setIsError] = useState<boolean>(false);

  return (
    <>
      <p>这里是dashboard</p>
      {isError ? (
        new Error("模拟错误")
      ) : (
        <button onClick={() => setIsError(true)}>get error</button>
      )}
    </>
  );
};
export default Page;
