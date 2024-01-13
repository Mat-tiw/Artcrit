"use client";
import { MiniProfile } from "./components/ui/miniprofile";
import * as React from "react";
import Banner from "./components/Test";
import { Sidebar } from "./components/ui/sidebar";
import Avatar from "@mui/material/Avatar";
import DragAndDrop from "./components/ui/dragndrop";
import { useEffect,useState } from "react"
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
}
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/post");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <React.Fragment>
      <Banner />
      <div className="bg-primaryBg flex flex-row">
        <div className="text-white basis-[20%] flex flex-col">
          <MiniProfile userName="Placeholder" />
          <Sidebar variant="default" />
        </div>
        <div className="text-white basis-[60%]">
          <div className="m-5 flex flex-col bg-secondary rounded-xl border-primary border-2">
            <div className="p-2 font-montserrart font-bold text-primary text-2xl">
              Create Post
            </div>
            <div className="pl-5 mb-5 flex pt-4">
              <Avatar />
              <div className="pl-4 -translate-y-3 w-full">
                <DragAndDrop />
              </div>
            </div>
          </div>
          {posts.map((post) => (
        <Posts
          key={post.id_post}
          title={post.post_title}
          badge={post.post_badge}
          userName={String(post.user_id)} // Convert user_id to string or use the actual username property if available
          date={post.created_at}
          images={post.ac_images}
        />
      ))}
        </div>
        <div className="text-white basis-[20%] ">
          <h1>right content</h1>
        </div>
      </div>
    </React.Fragment>
  );
}
