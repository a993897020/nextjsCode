/*
 * @Author: 关振俊
 * @Date: 2024-11-22 14:57:41
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-02 11:05:16
 * @Description:下载
 */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Download: React.FC = () => {
  const [fileList, setFileList] = useState([]);
  const getUploadFiles = () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const url = `${API_BASE_URL}/getUploadFile`;
    axios.get(url).then((res) => {
      console.log({ res });
      setFileList(res.data.data);
    });
  };

  useEffect(() => {
    getUploadFiles();
  }, []);

  return (
    <div className="p-4 pt-0">
      <div className="bg-white">
        <ul role="list" className="divide-y">
          {fileList.map((file: any) => (
            <li key={file.name} className="flex justify-between gap-x-6 py-5">
              <a href={file.url} target="__blank">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Download;
