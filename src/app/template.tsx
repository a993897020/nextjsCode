/*
 * @Author: 关振俊
 * @Date: 2024-11-20 10:24:58
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-15 11:45:58
 * @Description:
 */
const RootTemplate = ({
  children,
}: {
  children: React.ReactNode;
  params?: Promise<{ slug: string }>;
}) => {
  return <div>{children}</div>;
};

export default RootTemplate;
