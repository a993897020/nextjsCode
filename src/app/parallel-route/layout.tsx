/*
 * @Author: 关振俊
 * @Date: 2024-11-20 11:15:54
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 15:00:24
 * @Description: 平行路由-layout，可按需展示页面内容
 */
import Link from "next/link";

export default function RootLayout({
  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <>
      <nav className="flex items-center gap-4">
        <Link href="/parallel-route">Home</Link>
        <br />
        <Link href="/parallel-route/page-views">Page Views</Link>
        <br />
        <Link href="/parallel-route/visitors">Visitors</Link>
      </nav>
      <h1>root layout</h1>
      <div>{analytics}</div>
    </>
  );
}
