/*
 * @Author: 关振俊
 * @Date: 2024-11-20 10:57:46
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 10:59:50
 * @Description: [...folderName]（捕获所有片段）如：/post/lifestyle、/post/lifestyle/travel 和 /post/lifestyle/travel/europe
 */
// app/posts/[...lifestyle]/page.tsx
const page = (params: unknown) => {
  return <div>life style page: {JSON.stringify(params)}</div>;
};

export default page;
