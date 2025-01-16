/*
 * @Author: 关振俊
 * @Date: 2024-11-20 11:03:21
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 11:05:27
 * @Description: [[...folderName]]（可选的捕获所有片段）
 * 捕获所有片段和可选捕获所有片段的区别在于，可选的情况下，不带参数的路由也会被匹配如：/shop
 */
const page = (params: unknown) => {
  return <div>posts [[...slug]] page：{JSON.stringify(params)}</div>;
};

export default page;
