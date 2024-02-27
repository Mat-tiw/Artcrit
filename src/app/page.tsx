"use client";
import { MiniProfile } from "./components/ui/miniprofile";
import * as React from "react";
import Banner from "./components/ui/header";
import { Sidebar } from "./components/ui/sidebar";
import Avatar from "@mui/material/Avatar";
import DragAndDrop from "./components/ui/dragndrop";
import { useEffect, useState } from "react";
import { Posts } from "./components/ui/posts";
import axios from "axios";
import { login, userPic, defaultBackend } from "../api/api.js";
import SearchIcon from "@mui/icons-material/Search";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postTag, setPostTag] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${defaultBackend}post`);
        setPosts(response.data);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  function loadBgColor(isLoading: boolean) {
    if (!isLoading) return "h-screen";
    return "";
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    const filteredPosts = posts.filter(post =>
      post.post_badge.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredPosts);
  }, [searchQuery, posts]);

  return (
    <React.Fragment>
      <Banner />
      <div className={`bg-primaryBg flex flex-row min-h-screen`}>
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
                  src={userPic ?? ""}
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
            searchResults.map((post) => (
              <Posts
                showComment={false}
                key={post.id_post}
                post_id={post.id_post}
                title={post.post_title}
                badge={post.post_badge}
                userName={post.ac_user.user_name}
                date={post.created_at}
                images={post.ac_images}
                userPic={post.ac_user.user_avatar}
                user_id={post.ac_user.id_user}
                toOpenModal={false}
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
                toOpenModal={false}
              />
            </div>
          )}
        </div>
        <div className="text-white basis-[20%] ">
          <div className="bg-secondary m-5 flex flex-col items-center justify-center rounded-xl sticky">
            <h1 className="font-montserrat font-bold pb-5 text-2xl">
              search post by tag
            </h1>
            <form
              action=""
              className="flex flex-row border-b-2 border-white bg-transparent m-2 mb-4"
            >
              <SearchIcon />
              <input
                value={searchQuery}
                onChange={handleSearch}
                type="text"
                placeholder="post tag"
                className="border-0 bg-transparent outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
