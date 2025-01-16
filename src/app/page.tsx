/*
 * @Author: 关振俊
 * @Date: 2024-11-20 11:51:05
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-16 17:40:25
 * @Description:
 */
"use client";
import AppSidebar from "@/components/app-sidebar";
import { ModeToggle } from "@/components/modeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { IFileItem } from "./global";
import Image from "next/image";
import path from "path";

const Editor = dynamic(() => import("@/components/codeEditor/editor"), {
  ssr: false,
});
const PDF_URL_PRE = "/pdf/web/viewer.html?file="; // pdf预览地址前缀

export default function Page() {
  const [curSelectFileItem, setCurSelectFileItem] = useState<IFileItem>();
  const [pathList, setPathList] = useState<string[]>([]);

  const [language, setLanguage] = useState<string>("javascript");
  const [initialCode, setInitialCode] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [code, setCode] = useState<string>("");
  const [previewFile, setPreviewFile] = useState<IFileItem>();
  const [isOpenSide, setIsOpenSide] = useState<boolean>(true);

  const fileTypeMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
    txt: "plaintext",
    vue: "vue",
    jsx: "javascript",
    tsx: "typescript",
    yaml: "yaml",
    yml: "yaml",
    "": "plaintext",
  };
  // 判断是否为图片
  const checkIsImage = (item: IFileItem) => {
    const imgTypes = ["png", "jpg", "jpeg", "gif", "bmp"];
    const isImage = imgTypes.includes(item.name.split(".").at(-1) as string);
    return isImage;
  };
  // 获取public 文件预览路径
  const getUrl = (item: IFileItem) => {
    let url = item.path
      .replace("D:\\myProject\\nextjs-app-router\\public", "/")
      .replaceAll("\\", "/");
    url = path.resolve(url, item.name);
    return url;
  };

  useEffect(() => {
    if (curSelectFileItem) {
      const paths = curSelectFileItem.path.split("\\");
      paths.push(curSelectFileItem.name);

      if (!curSelectFileItem.isDir) {
        const fileType = curSelectFileItem.name.split(".").at(-1) ?? "";
        const curLanguage = fileTypeMap[fileType] || "plaintext";
        setLanguage(curLanguage);
        if (curSelectFileItem.code) setInitialCode(curSelectFileItem.code);
        setPathList(paths);
        setPreviewFile(curSelectFileItem);
      }
    }
  }, [curSelectFileItem]);

  return (
    <SidebarProvider open={isOpenSide} onOpenChange={setIsOpenSide}>
      <AppSidebar setCurSelectFileItem={setCurSelectFileItem} />
      <SidebarInset>
        <header className="flex h-16 shrink-0  gap-2 border-b px-4 justify-between items-center">
          <div className="flex gap-2 items-center">
            <SidebarTrigger className="-ml-1" />
            {curSelectFileItem && (
              <>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    {pathList.map((p: string, pi: number) => (
                      <React.Fragment key={pi}>
                        <BreadcrumbItem>
                          {pi === pathList.length - 1 ? (
                            <BreadcrumbPage>{p}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href="#">{p}</BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {pi !== pathList.length - 1 && <BreadcrumbSeparator />}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </>
            )}
          </div>
          <ModeToggle />
        </header>
        <main>
          {previewFile && checkIsImage(previewFile) ? (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
              <Image
                width={500}
                height={500}
                src={getUrl(previewFile)}
                alt={previewFile.name}
              />
            </div>
          ) : previewFile && previewFile.name.includes(".pdf") ? (
            <iframe
              className="h-[calc(100vh-64px)] w-full"
              src={`${PDF_URL_PRE}${getUrl(previewFile)}`}
            ></iframe>
          ) : (
            <Editor
              isOpenSide={isOpenSide}
              language={language}
              initialValue={initialCode}
              onChange={(value) => setCode(value)}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
