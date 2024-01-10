"use client";
import { MiniProfile } from "./components/ui/miniprofile";
import * as React from "react";
import Banner from "./components/Test";
import { Sidebar } from "./components/ui/sidebar";
import { Post } from "./components/ui/post";
import Avatar from "@mui/material/Avatar";
import DragAndDrop from "./components/ui/dragndrop";
export default function Home() {
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
          <Post />
        </div>
        <div className="text-white basis-[20%] ">
          <h1>right content</h1>
        </div>
      </div>
    </React.Fragment>
  );
}
