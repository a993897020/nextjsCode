/*
 * @Author: 关振俊
 * @Date: 2025-01-06 10:10:08
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-06 10:10:12
 * @Description:
 */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
