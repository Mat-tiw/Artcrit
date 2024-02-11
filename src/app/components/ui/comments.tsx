import { Avatar } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplyIcon from "@mui/icons-material/Reply";
import React from "react";
import Image from "next/image";
import { userId,defaultBackend } from "@/api/api";
import axios from "axios";
interface CommentProps {
  userName?: string;
  userPic?: string;
  commentPoint?: number;
  commentContent?: string;
  testImage?: boolean;
  imgPath?: string;
  comment_id?:number
}

const Comments: React.FC<CommentProps> = ({
  userName,
  userPic,
  commentPoint,
  commentContent,
  testImage,
  imgPath,
  comment_id
}) => {
  const handleUpVote = async() =>{
    try {
      await axios.post(`${defaultBackend}comments/${comment_id}/upvote`,{userId})
    } catch (error) {
      console.error(error)
    }
  }
  const handleDownVote = async()=>{
    try {
      await axios.post(`${defaultBackend}comments/${comment_id}/downvote`,{userId})
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex flex-row pt-5 w-full">
      <div className="flex flex-col">
        <ArrowDropUpIcon
          className="hover:text-primary hover:cursor-pointer"
          sx={{ width: 36, height: 36 }}
          onClick={handleUpVote}
        />
        <p className="self-center">{commentPoint}</p>
        <ArrowDropDownIcon
          className="hover:text-blue-300 hover:cursor-pointer"
          sx={{ width: 36, height: 36 }}
          onClick={handleDownVote}
        />
      </div>
      <div className="flex flex-col pl-4">
        <div className="flex flex-row">
          <Avatar src={userPic ?? ""} />
          <p className="font-montserrat pl-2 pt-2 font-semibold">{userName}</p>
        </div>
        <p className="text-pretty font-karla pt-2">{commentContent}</p>
        {testImage && <Image src={imgPath ?? ""} alt="Description of the image" width={200} height={200} />}
        <div className="flex flex-row pt-2 text-gray-400 cursor-pointer">
          <div className="flex flex-row">
            <ReplyIcon />
            <p className="font-bold font-montserrat pl-2">Reply</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Comments.displayName = "Comments";
export { Comments };
