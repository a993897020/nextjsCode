/*
 * @Author: 关振俊
 * @Date: 2024-11-20 10:30:23
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 15:39:36
 * @Description:[folderName]（动态片段）
 */

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = await res.json();

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
      </div>
      <div className="text-lg text-gray-800">
        <h5>My Post id: {slug}</h5>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default page;
