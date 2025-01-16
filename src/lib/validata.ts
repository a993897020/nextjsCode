/*
 * @Author: 关振俊
 * @Date: 2024-11-22 16:58:59
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-16 16:07:11
 * @Description:
 */
import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// 根据需要增减文件类型
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// 验证文件上传
export const validationSchema = z.object({
  // title: z.string().min(1, "名称不能为空").max(20, "名称最多为20个字符"),
  // desc: z.string().min(1, "简介不能为空").max(200, "名称最多为200个字符"),
  fileUpload: z
    .custom<FileList>((v) => v instanceof FileList)
    .transform((val) => {
      console.log("val:", val); // 调试信息：打印输入值
      if (val instanceof File) return val;
      if (val instanceof FileList) return val[0];
      return null;
    })
    .refine((file) => Boolean(file), {
      message: "请上传文件",
    })
    // 验证文件大小
    .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, {
      message: `文件大小不能超过 ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
    }),
  // 验证文件类型
  // .refine(
  //   (file) =>
  //     file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
  //   { message: "类型不支持,请选择 (jpeg, jpg, png, webp)类型" }
  // ),
});
