"use client";
import React,{useState,useEffect} from "react";
import Banner from "@/app/components/ui/header";
import { Sidebar } from "@/app/components/ui/sidebar";
import { Avatar } from "@mui/material";
import { defaultBackend } from "@/api/api.js";
import axios from "axios";
interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  user_avatar: string;
  id_user: number;
}
export default function Page({ params }: Readonly<{ params: { id: number } }>) {
    const [user, setUser] = useState<User>();
    useEffect(() =>{
        const fetchUser = async()=>{
            try {
                const res = await axios.get(`${defaultBackend}/user/${params.id}`);
                setUser(res.data)
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }
        fetchUser();
    },[params.id])
    console.log(user)
  return (
    <div className="">
      <Banner />
      <div className="min-h-screen bg-primaryBg flex flex-row">
        <div className="text-white basis-[20%] flex flex-col">
          <Sidebar variant="default" />
        </div>
        <div className="text-white basis-[60%]">
          <div className="flex flex-col">
            <div className="flex flex-row mt-12 ml-6">
              <Avatar
                src={user?.user_avatar}
                sx={{
                  width: 136,
                  height: 136,
                }}
              />
              <div className="flex flex-col ml-10">
                <h1 className="font-montserrart font-bold text-4xl">
                  {user?.user_name}
                </h1>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut
                </p>
              </div>
            </div>
            <div className="flex flex-row mt-12 ml-10 space-x-6">
              <p className="text-xl border-b-2 border-primary text-primary">overview</p>
              <p className="text-xl">post</p>
              <p className="text-xl">comments</p>
              <p className="text-xl">media</p>
              <p className="text-xl">like</p>
            </div>
          </div>
        </div>
        <div className="text-white basis-[20%] ">
          <h1>{""}</h1>
        </div>
      </div>
    </div>
  );
}
