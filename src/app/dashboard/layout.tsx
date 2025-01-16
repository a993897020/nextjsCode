/*
 * @Author: 关振俊
 * @Date: 2024-11-20 09:23:53
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 15:31:31
 * @Description: 首页布局
 */
const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
  params?: Promise<{ slug: string }>;
}) => {
  return (
    <section>
      <nav>dashboard nav</nav>
      {children}
    </section>
  );
};
export default DashboardLayout;
