/*
 * @Author: 关振俊
 * @Date: 2024-11-20 17:00:15
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-20 17:00:21
 * @Description:
 */
// data/prisma.ts
import { PrismaClient } from "@prisma/client";

class PrismaInstance {
  private static instance: PrismaClient | undefined;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaInstance.instance) {
      PrismaInstance.instance = new PrismaClient();
    }
    return PrismaInstance.instance;
  }
}

// 导出 Prisma 实例获取方法
export const prisma = PrismaInstance.getInstance();
