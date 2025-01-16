/*
 * @Author: 关振俊
 * @Date: 2024-11-20 09:54:28
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 10:22:22
 * @Description:
 */

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return NextResponse.json({ data });
}

// export async function HEAD(request) {}

export async function POST() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await res.json();
  return NextResponse.json({ code: 200, data, message: "success" });
}

export async function PUT() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify({
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await res.json();
  return NextResponse.json({ code: 200, data, message: "success" });
}
export async function PATCH() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PATCH",
    body: JSON.stringify({
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await res.json();
  return NextResponse.json({ code: 200, data, message: "success" });
}
export async function DELETE() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
  });

  const data = await res.json();
  return NextResponse.json({ code: 200, data, message: "success" });
}

// export async function DELETE(request) {}

// export async function PATCH(request) {}

// // 如果 `OPTIONS` 没有定义, Next.js 会自动实现 `OPTIONS`
// export async function OPTIONS(request) {}
