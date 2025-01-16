/*
 * @Author: 关振俊
 * @Date: 2024-11-20 17:01:02
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-21 10:30:52
 * @Description:
 */
// pages/api/users/route.ts
import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // 获取特定用户
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } else {
    // 获取所有用户
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  }
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
  const newUser = await prisma.user.create({
    data: { name, email },
  });
  return NextResponse.json(newUser, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { name, email } = await request.json();
  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  await prisma.user.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ code: 200, message: "删除成功", data: id });
}
