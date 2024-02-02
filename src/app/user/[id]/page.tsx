"use client";
import React, { useState, useEffect } from "react";
import Banner from "@/app/components/ui/header";
import { Sidebar } from "@/app/components/ui/sidebar";
import { Avatar } from "@mui/material";
import { defaultBackend } from "@/api/api.js";
import axios from "axios";
import { Posts } from "@/app/components/ui/posts";
import Image from "next/image";
interface Images {
  id_image: number;
  image_path: string;
}

interface Post {
  id_post: number;
  post_title: string;
  post_badge: string;
  created_at: string;
  user_id: number;
  ac_images: Images[];
  ac_user: User;
}
interface User {
  user_name: string;
  user_email: string;
  user_avatar: string;
  id_user: number;
}
export default function Page({ params }: Readonly<{ params: { id: number } }>) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();
  const [image,setImage] = useState<Images[]>([]);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [noPost, setNoPost] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${defaultBackend}user/${params.id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchUser();
  }, [params.id]);
  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const res = await axios.get(`${defaultBackend}post/user/${params.id}`);
        setPosts(res.data);
        setNoPost(false);
      } catch (error) {
        setNoPost(true);
      }
    };
    fetchUserPost();
  }, [params.id]);
  useEffect(() => {
    const fetchImage = async () =>{
      console.log('above fetch image')
      try {
        const res = await axios.get(`${defaultBackend}image/${params.id}`)
        setImage(res.data)
      } catch (error) {
        console.log("hello fro error",error)
        setNoPost(true);
      }
    }
    fetchImage()
  },[params.id])
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
              <button
                className={`text-xl ${
                  activeTab === "overview"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                overview
              </button>
              <button
                className={`text-xl ${
                  activeTab === "post"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("post")}
              >
                post
              </button>
              <button
                className={`text-xl ${
                  activeTab === "comments"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("comments")}
              >
                comments
              </button>
              <button
                className={`text-xl ${
                  activeTab === "media"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("media")}
              >
                media
              </button>
              <button
                className={`text-xl ${
                  activeTab === "like"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("like")}
              >
                like
              </button>
            </div>
          </div>
          {noPost ? (
            <div className="flex flex-col">
              <h1>User has no post</h1>
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="">
                  {noPost ? (
                    <div className="flex flex-col">
                      <h1>User has no post</h1>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <Posts
                        showComment={false}
                        key={post.id_post}
                        userId={post.id_post}
                        title={post.post_title}
                        badge={post.post_badge}
                        userName={post.ac_user.user_name}
                        date={post.created_at}
                        images={post.ac_images}
                        userPic={post.ac_user.user_avatar}
                      />
                    ))
                  )}
                </div>
              )}
              {activeTab === "post" && (
                <div className="">
                  {noPost ? (
                    <div className="flex flex-col">
                      <h1>User has no post</h1>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <Posts
                        showComment={false}
                        key={post.id_post}
                        userId={post.id_post}
                        title={post.post_title}
                        badge={post.post_badge}
                        userName={post.ac_user.user_name}
                        date={post.created_at}
                        images={post.ac_images}
                        userPic={post.ac_user.user_avatar}
                      />
                    ))
                  )}
                </div>
              )}
              {activeTab === "comments" && <div className=""></div>}
              {activeTab === "media" && <div className="">
                {noPost ? (<div><h1>User has no media</h1></div>):(<div className="flex flex-row flex-wrap m-2">
                  {image.map((images)=>(
                    <Image className="object-cover m-2" key={images.id_image} src={images.image_path} width={500} height={500} alt="placeholder"/>
                  ))}
                </div>)}
                </div>}
              {activeTab === "like" && <div className=""></div>}
            </>
          )}
        </div>
        <div className="text-white basis-[20%] ">
          <h1>{""}</h1>
        </div>
      </div>
    </div>
  );
}
