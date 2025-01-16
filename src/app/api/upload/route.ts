/*
 * @Author: 关振俊
 * @Date: 2024-11-22 17:38:35
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-12-13 11:14:55
 * @Description:
 */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  // const data = await request.json();
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const uploadPath = "/public/upload";

  if (!file)
    return NextResponse.json({ message: "请上传文件" }, { status: 400 });
  // 定义暂存路径
  const uploadDir = path.join(process.cwd(), uploadPath);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const fileArrayBuffer = await file.arrayBuffer();
  await fs.writeFileSync(
    path.join(uploadDir, file.name),
    Buffer.from(fileArrayBuffer)
  );

  return NextResponse.json({
    code: 200,
    data: {
      fileName: file.name,
      size: file.size,
      url: `${uploadPath}/${file.name}`,
    },
    message: "上传成功",
  });
}
