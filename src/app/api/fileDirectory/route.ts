/*
 * @Author: 关振俊
 * @Date: 2025-01-03 14:47:32
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-06 10:31:10
 * @Description:
 */
import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

// 获取文件目录
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const targetPath = searchParams.get("path");
  console.log(targetPath);

  const data = fs.readdirSync(
    path.resolve(targetPath ? targetPath : process.cwd()),
    {
      withFileTypes: true,
    }
  );
  const filterName = [".git", ".next", "node_modules"];
  const fileData = data.filter((p: any) => !filterName.includes(p.name));
  fileData.forEach((p: any) => {
    p.isDir = p.isDirectory();
    p.id = Math.random().toString(32).slice(2);
  });

  return NextResponse.json({
    code: 200,
    data: fileData,
  });
};
