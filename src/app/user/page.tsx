/*
 * @Author: 关振俊
 * @Date: 2024-11-20 17:02:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-11-21 16:04:07
 * @Description:
 */
// app/page.tsx
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PencilLine, Trash2, Undo2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [temData, setTemData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
  });
  const [editIdx, setEditIdx] = useState<number>(-1);
  const { toast } = useToast();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const url = `/api/users${editIdx > -1 ? `?id=${users[editIdx].id}` : ""}`;
      const method = editIdx > -1 ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      setSubmitLoading(false);
      if (!response.ok) {
        setSubmitLoading(false);
        throw new Error("Failed to add user");
      }
      if (editIdx > -1) {
        toast({
          title: "修改成功",
          description: `${name}已修改`,
          duration: 2000,
        });
      } else {
        toast({
          title: "添加成功",
          description: `${name}已添加`,
          duration: 2000,
        });
      }
      setName("");
      setEmail("");
      setEditIdx(-1);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  /**
   * 编辑当前用户信息
   * @param idx -1 撤回修改
   */
  const handleEditUser = (idx: number) => {
    setEditIdx(idx);
    if (idx === -1) {
      setName(temData.name);
      setEmail(temData.email);
    } else {
      const user: User = users[idx];
      setTemData({ name, email });
      setName(user.name);
      setEmail(user.email);
    }
  };
  /**
   * 删除当前用户
   */
  const deleteUser = async (user: User) => {
    try {
      const response = await fetch(`/api/users?id=${user.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      toast({
        title: "删除成功",
        description: `${user.name}已删除`,
        duration: 2000,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  interface IDeleteUserModal {
    children: React.ReactNode;
    user: User;
  }

  function DeleteModal<T extends IDeleteUserModal>(props: T): React.ReactNode {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认要删除该用户?</AlertDialogTitle>
            <AlertDialogDescription>
              此操作无法撤消,这将永久删除您的帐户并从我们的服务器中删除您的数据。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteUser(props.user)}>
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
      <form onSubmit={addUser} className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className={`p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 flex items-center gap-2 ${
            submitLoading
              ? "disabled:pointer-events-none disabled:opacity-50"
              : ""
          }`}
          disabled={submitLoading}
        >
          {submitLoading && <Loader2 size={20} className="animate-spin" />}
          {editIdx > -1 ? "Edit User" : "Add User"}
        </button>
      </form>
      {users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((user, idx: number) => (
            <li
              key={user.id}
              className="p-3 bg-gray-100 rounded shadow  flex justify-between items-center"
            >
              <div>
                <span className="font-semibold">{user.name}</span> -{" "}
                <span>{user.email}</span>
              </div>
              <div className="flex gap-2">
                {editIdx === idx ? (
                  <Undo2
                    className="cursor-pointer"
                    onClick={() => handleEditUser(-1)}
                  />
                ) : (
                  <PencilLine
                    className="cursor-pointer"
                    onClick={() => handleEditUser(idx)}
                  />
                )}
                <DeleteModal user={user}>
                  <Trash2 className="cursor-pointer" />
                </DeleteModal>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 ">
          No users found. Add a user to get started!
        </p>
      )}
    </div>
  );
};

export default Home;
