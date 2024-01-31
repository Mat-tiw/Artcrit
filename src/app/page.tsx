"use client";
import { MiniProfile } from "./components/ui/miniprofile";
import * as React from "react";
import Banner from "./components/Test";
import { Sidebar } from "./components/ui/sidebar";
import Avatar from "@mui/material/Avatar";
import DragAndDrop from "./components/ui/dragndrop";
import { useEffect, useState } from "react";
import { Posts } from "./components/ui/posts";
import axios from "axios";
interface Image {
  id_image: number;
  image_path: string;
}

interface Post {
  id_post: number;
  post_title: string;
  post_badge: string;
  created_at: string;
  user_id: number;
  ac_images: Image[];
  ac_user: User;
}
interface User {
  user_name: string;
  user_email: string;
  user_avatar: string;
  id_user: number;
}
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const userPic = localStorage.getItem("userPic");
  const [isLoading , setIsLoading]=useState<boolean>(false)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/post");
        setPosts(response.data);
        setIsLoading(true)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  const login = localStorage.getItem("token") === null ? false : true;
  function loadBgColor(isLoading:boolean){
    if(!isLoading)return "h-screen"
    return ""
  }
  return (
    <React.Fragment>
      <Banner />
      <div className={`bg-primaryBg flex flex-row ${loadBgColor(isLoading)}`}>
        <div className="text-white basis-[20%] flex flex-col">
          <MiniProfile />
          <Sidebar variant="default" />
        </div>
        <div className="text-white basis-[60%]">
          {login ? (
            <div className="m-5 flex flex-col bg-secondary rounded-xl border-primary border-2">
              <div className="p-2 font-montserrart font-bold text-primary text-4xl">
                Create Post
              </div>
              <div className="pl-5 mb-5 flex pt-4">
                <Avatar
                  src={userPic !== null ? userPic : ""}
                  sx={{
                    width: 58,
                    height: 58,
                  }}
                />
                <div className="pl-4 -translate-y-3 w-full">
                  <DragAndDrop />
                </div>
              </div>
            </div>
          ) : (
            <div className="m-5 flex flex-col bg-secondary rounded-xl border-red-700 border-2 ">
              <div className="p-2 font-montserrart font-bold text-white text-2xl ">
                You must be logged in to create a post
              </div>
            </div>
          )}
          {isLoading ? (
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
          ) : (
            <div className="animate-pulse p-2">
            <Posts
            showComment={false}
            title="loading..."
            badge="loading..."
            userName="loading..."
            images={[]}
            userPic=""
          />
          </div>
          )}
        </div>
        <div className="text-white basis-[20%] ">
          <h1>{""}</h1>
        </div>
      </div>
    </React.Fragment>
  );
}
