/*
 * @Author: 关振俊
 * @Date: 2025-01-03 14:47:32
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-16 15:31:21
 * @Description:
 */
import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

// 获取文件内容
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const targetPath = searchParams.get("path");
  if (!targetPath) {
    return NextResponse.json({
      code: 400,
      message: "缺少path参数",
    });
  }
  console.log(targetPath);

  try {
    const data = fs.readFileSync(path.resolve(targetPath), "utf-8");
    return NextResponse.json({
      code: 200,
      data,
    });
  } catch (err) {
    console.log({ err });
    return NextResponse.json({
      code: 500,
      message: "读取文件失败",
    });
  }
};
