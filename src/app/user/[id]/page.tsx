"use client";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Banner from "@/app/components/ui/header";
import { Sidebar } from "@/app/components/ui/sidebar";
import { Avatar } from "@mui/material";
import { defaultBackend, userId } from "@/api/api.js";
import axios from "axios";
import { Posts } from "@/app/components/ui/posts";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#16181C",
  border: "4px solid #B1F827",
  p: 4,
  color: "white",
  borderRadius: "0.75rem",
};

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
  const [image, setImage] = useState<Images[]>([]);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [noPost, setNoPost] = useState(true);

  const [editBio, setEditBio] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditBio(e.target.value);
    const bioarea = textareaRef.current;
    if (bioarea) {
      bioarea.style.height = "auto";
      bioarea.style.height = `${bioarea.scrollHeight}px`;
    }
  };
  const [editActive, setEditActive] = useState(false);
  const handleClose = () => setEditActive(false);
  const handleOpen = () => setEditActive(true);

  const updateUserId = userId !== null ? parseInt(userId) : null;
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
    const fetchImage = async () => {
      console.log("above fetch image");
      try {
        const res = await axios.get(`${defaultBackend}image/${params.id}`);
        setImage(res.data);
      } catch (error) {
        console.log("error: ", error);
        setNoPost(true);
      }
    };
    fetchImage();
  }, [params.id]);
  return (
    <div className="flex flex-col">
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
                <div className="flex flex-row">
                  <h1 className="font-montserrart font-bold text-4xl">
                    {user?.user_name}
                  </h1>
                  {updateUserId == params.id ? (
                    <div className="flex w-full flex-row-reverse mr-2">
                      <button
                        className="font-montserrart font-semibold border-2 border-primary text-primary rounded-3xl p-1"
                        onClick={handleOpen}
                      >
                        Edit profile
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut
                </p>
              </div>
            </div>
            <Modal
              open={editActive}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className=""></div>
                <div className="flex flex-col">
                  <h1 className="font-bold font-montserrart text-2xl">
                    Edit profile
                  </h1>
                  <div className="flex w-full justify-center mt-2">
                    <Avatar
                      src={user?.user_avatar}
                      sx={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  </div>
                  <input
                    className="mt-2 font-montserrart text-xl bg-transparent border-none focus:border-none outline-none"
                    type="text"
                    placeholder="Username"
                  />
                  <textarea
                    ref={textareaRef}
                    placeholder="user bio"
                    onChange={(e) => handleTextareaChange(e)}
                    value={editBio}
                    className="mt-2 font-montserrart text-xl w-full overflow-y-hidden resize-none bg-transparent focus:border-none outline-none box-border h-auto pb-0.5"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "transparent transparent",
                    }}
                    rows={1}
                  />
                  <div className="flex flex-row-reverse"><button className="mt-2 font-montserrart text-xl border-primary border-2 rounded-lg p-2">Submit</button></div>
                </div>
              </Box>
            </Modal>
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
                        isInProfile={true}
                      />
                    ))
                  )}
                </div>
              )}
              {activeTab === "comments" && <div className=""></div>}
              {activeTab === "media" && (
                <div className="">
                  {noPost ? (
                    <div>
                      <h1>User has no media</h1>
                    </div>
                  ) : (
                    <div className="flex flex-row flex-wrap m-2">
                      {image.map((images) => (
                        <Image
                          className="object-cover m-2"
                          key={images.id_image}
                          src={images.image_path}
                          width={500}
                          height={500}
                          alt="placeholder"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
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
