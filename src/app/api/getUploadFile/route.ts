/*
 * @Author: 关振俊
 * @Date: 2024-12-13 11:04:37
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-12-13 11:15:18
 * @Description:
 */
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export const GET = async () => {
  const uploadDir = path.join(process.cwd(), "/public/upload");
  const files = fs.readdirSync(uploadDir);
  const data = files.map((file) => {
    return {
      name: file,
      url: `/upload/${file}`,
    };
  });

  return NextResponse.json({
    code: 200,
    data,
  });
};
