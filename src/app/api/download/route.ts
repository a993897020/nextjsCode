/*
 * @Author: 关振俊
 * @Date: 2024-12-13 10:43:41
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-12-13 10:50:55
 * @Description:下载文件
 */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const uploadDir = path.join(process.cwd(), "/uploadCache");
  const allFiles = fs.readdirSync(uploadDir);
  console.log({ allFiles, name });

  return NextResponse.json({ data: allFiles });
}
