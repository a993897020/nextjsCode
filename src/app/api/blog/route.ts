/*
 * @Author: 关振俊
 * @Date: 2025-01-03 10:22:30
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-03 11:43:21
 * @Description:博客
 */
import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

// 根据文章id获取博客详情
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // 获取特定用户
    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } else {
    // 获取所有用户
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs);
  }
}
// 新增编辑文章
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { id, title, content, author } = data;

  if (id) {
    // 编辑文章
    const blog = await prisma.blog.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        author,
      },
    });

    return NextResponse.json(blog);
  } else {
    // 新增文章
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        author,
      },
    });

    return NextResponse.json(blog);
  }
}
// 删除文章
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // 删除特定文章
    const blog = await prisma.blog.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(blog);
  } else {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
}
