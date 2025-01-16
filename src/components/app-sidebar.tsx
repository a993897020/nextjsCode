/*
 * @Author: 关振俊
 * @Date: 2025-01-03 14:40:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-16 16:21:57
 * @Description:
 */
import * as React from "react";
import { ChevronRight, File, Folder, LoaderCircle } from "lucide-react";
import path from "path";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { IFileItem } from "@/app/global";

interface IFileChange extends IFileItem {
  state: "U" | "M";
}
interface IFileTree {
  item: IFileItem;
  handleClickFile: (item: IFileItem) => void;
  setSelectFileItem: (item: IFileItem) => void;
}
interface IAppSidebar extends React.ComponentProps<typeof Sidebar> {
  setCurSelectFileItem: (item: IFileItem | undefined) => void;
}
// 修改历史记录最大数
const MAX_CHANGE_NUM = 6;

const AppSidebar: React.FC<IAppSidebar> = (props) => {
  const [directoryTree, setDirectoryTree] = useState<IFileItem[]>([]);
  const [fileChange, setFileChange] = useState<IFileChange[]>([]);
  const cloneDirTree = React.useRef<IFileItem[]>([]);
  const [selectFileItem, setSelectFileItem] = useState<IFileItem>();

  const getDirData = async (path?: string) => {
    const url = `/api/fileDirectory?path=${path ? path : ""}`;
    const res = await fetch(url).then((res) => res.json());
    // console.log({ data });
    const temData = res.data;
    temData.forEach((p: IFileItem) => {
      p.isLoading = false; //是否加载
      p.isSelect = false; //是否选中
      p.isOpen = false; //目录是否展开
    });
    if (path) {
      return temData;
    } else {
      cloneDirTree.current = temData;
      setDirectoryTree(temData);
    }
  };
  const getFileInfo = async (path: string) => {
    const url = `/api/fileDirectory/file?path=${path}`;
    const res = await fetch(url).then((res) => res.json());
    return res.data;
  };
  /**
   * 递归找到指定目标文件并设置值
   * @param fileList 文件列表
   * @param targetId 目标文件id
   * @param setValue 设置的值
   */
  const loopSetTargetFile = (
    fileList: IFileItem[],
    targetId: string,
    setValue: any
  ) => {
    for (let i = 0; i < fileList.length; i++) {
      const curItem = fileList[i];

      if (curItem.children) {
        const data: any = loopSetTargetFile(
          curItem.children,
          targetId,
          setValue
        );
        // curItem.children = data;
        Object.assign(curItem, { children: data });
      }
      if (curItem.id === targetId) {
        // console.log("bingo", curItem.name, targetName, setValue);
        Object.assign(curItem, setValue);
      } else {
        // 其他收起
        curItem.isSelect = false;
      }
    }
    return fileList;
  };

  const handleClickFile = async (item: IFileItem) => {
    /**
     * 设置状态
     * 文件则设置选择，文件夹设置有无按需加载
     */
    cloneDirTree.current = loopSetTargetFile(
      cloneDirTree.current,
      item.id,
      Object.assign({}, item, {
        isLoading: item.isDir ? (item.children ? false : true) : false,
        isSelect: true,
        isOpen: item.isDir ? !item.isOpen : false,
      })
    );
    setDirectoryTree(cloneDirTree.current.slice());

    if (item.isDir) {
      if (!item.children) {
        // 按需加载改目录文件并设置
        const newDirList = await getDirData(path.resolve(item.path, item.name));
        cloneDirTree.current = loopSetTargetFile(
          cloneDirTree.current,
          item.id,
          Object.assign({}, item, {
            isLoading: false,
            isSelect: true,
            children: newDirList,
          })
        );
        setDirectoryTree(cloneDirTree.current.slice());
      }
    } else {
      // 选择文件，添加记录文件
      setFileChange((pre) => {
        const newState = pre.slice();
        const index = newState.findIndex((p: IFileChange) => p.id === item.id);
        if (index === -1) {
          if (newState.length >= MAX_CHANGE_NUM) {
            newState.shift();
          }
          newState.push({ ...item, state: "M" });
        }
        return newState;
      });
      // 获取文件内容
      const code = await getFileInfo(path.resolve(item.path, item.name));
      setSelectFileItem(Object.assign({}, item, { code }));
    }
  };
  React.useEffect(() => {
    getDirData();
  }, []);
  React.useEffect(() => {
    props?.setCurSelectFileItem?.(selectFileItem);
  }, [selectFileItem]);

  React.useEffect(() => {
    if (fileChange.length > 4) {
      const allFileChange = document.querySelectorAll(".change_item");
      const curIdx = fileChange.findIndex(
        (item) => item.id === selectFileItem?.id
      );
      const curDom = allFileChange[curIdx];
      curDom?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [fileChange]);
  return (
    <React.Fragment>
      {directoryTree ? (
        <Sidebar>
          <SidebarContent>
            <SidebarGroupLabel className="px-4 pt-2">Changes</SidebarGroupLabel>
            {fileChange.length > 0 && (
              <ScrollArea className="max-h-36">
                <SidebarGroup style={{ paddingTop: 0 }}>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {fileChange.map((item: IFileChange, index: number) => (
                        <SidebarMenuItem className="change_item" key={index}>
                          <SidebarMenuButton
                            isActive={item.id === selectFileItem?.id}
                          >
                            <File />
                            {item.name}
                          </SidebarMenuButton>
                          <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </ScrollArea>
            )}

            <SidebarGroupLabel className="px-4 pt-2">Files</SidebarGroupLabel>
            <ScrollArea>
              <SidebarGroup style={{ paddingTop: 0 }}>
                <SidebarGroupContent>
                  <ScrollArea className="rounded-md">
                    <SidebarMenu>
                      {directoryTree.map((item: IFileItem, index: number) => (
                        <Tree
                          key={index}
                          item={item}
                          setSelectFileItem={setSelectFileItem}
                          handleClickFile={handleClickFile}
                        />
                      ))}
                    </SidebarMenu>
                  </ScrollArea>
                </SidebarGroupContent>
              </SidebarGroup>
            </ScrollArea>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

function Tree({ item, handleClickFile, setSelectFileItem }: IFileTree) {
  const openFile = (e: any, item: IFileItem) => {
    e.stopPropagation();
    setSelectFileItem(item);
    handleClickFile(item);
  };

  if (!item.isDir) {
    return (
      <SidebarMenuButton
        isActive={item.isSelect}
        onClick={(e) => openFile(e, item)}
      >
        <File />
        <div className="truncate" title={item.name}>
          {item.name}
        </div>
      </SidebarMenuButton>
    );
  }

  return (
    <React.Fragment>
      <SidebarMenuItem>
        <Collapsible
          className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
          open={item.isOpen}
          onClick={(e) => openFile(e, item)}
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton isActive={item.isSelect}>
              {item.isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <ChevronRight className="transition-transform" />
              )}
              <Folder />
              <div className="truncate" title={item.name}>
                {item.name}
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {item?.children?.length > 0 && (
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.children.map((subItem: IFileItem, index: number) => (
                  <Tree
                    key={index}
                    item={subItem}
                    handleClickFile={handleClickFile}
                    setSelectFileItem={setSelectFileItem}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </Collapsible>
      </SidebarMenuItem>
    </React.Fragment>
  );
}
export default AppSidebar;
