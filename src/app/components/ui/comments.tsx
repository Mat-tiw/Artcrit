import { Avatar } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplyIcon from "@mui/icons-material/Reply";
import React, { useState } from "react";
import Image from "next/image";
import { userId, defaultBackend } from "@/api/api";
import axios from "axios";
import { CommentsInput } from "./commentsInput";
interface CommentProps {
  userName?: string;
  userPic?: string;
  commentPoint?: number;
  commentContent?: string;
  comment_id?: number;
  commentImage?: Images[];
  parentId?:number
  post_id?:number
}
interface Images {
  id_image: number;
  image_path: string;
}
const Comments: React.FC<CommentProps> = ({
  userName,
  userPic,
  commentPoint,
  commentContent,
  commentImage,
  comment_id,
  parentId,
  post_id
}) => {
  const [userClick, setUserClick] = useState<string | null>(null);
  const [votePoint, setVotePoint] = useState<number | null | undefined>(
    commentPoint
  );
  const [reply,setReply] = useState<boolean>(false)
  const handleUpVote = async () => {
    try {
      await axios.post(`${defaultBackend}comments/${comment_id}/upvote`, {
        userId,
      });
      if (userClick === null || userClick === "down")
        setVotePoint((prevVotePoint) => (prevVotePoint || 0) + 1);
      if (userClick === "up")
        setVotePoint((prevVotePoint) => (prevVotePoint || 0) - 1);

      if (userClick === null || userClick === "down") {
        setUserClick("up");
      } else if (userClick === "up") {
        setUserClick(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownVote = async () => {
    try {
      await axios.post(`${defaultBackend}comments/${comment_id}/downvote`, {
        userId,
      });
      if (userClick === null || userClick === "up")
        setVotePoint((prevVotePoint) => (prevVotePoint || 0) - 1);
      if (userClick === "down")
        setVotePoint((prevVotePoint) => (prevVotePoint || 0) + 1);
      if (userClick === null || userClick === "up") {
        setUserClick("down");
      } else if (userClick === "down") {
        setUserClick(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
<div className="flex flex-row pt-5 w-full">
  <div className="flex flex-col">
    <ArrowDropUpIcon
      className="hover:text-primary hover:cursor-pointer"
      sx={{ width: 36, height: 36 }}
      onClick={handleUpVote}
    />
    <p className="self-center">{votePoint}</p>
    <ArrowDropDownIcon
      className="hover:text-blue-300 hover:cursor-pointer"
      sx={{ width: 36, height: 36 }}
      onClick={handleDownVote}
    />
  </div>
  <div className="flex flex-col pl-4  w-full">
    <div className="flex flex-row">
      <Avatar src={userPic ?? ""} />
      <p className="font-montserrat pl-2 pt-2 font-semibold">{userName}</p>
    </div>
    <p className="font-karla pt-2 text-wrap">{commentContent}</p>
    <div className="flex flex-row">
    {commentImage?.map((image) => (
      <Image
      className="m-1 object-cover"
        key={image.id_image}
        src={image.image_path}
        alt={`Preview ${image.image_path}`}
        width={100}
        height={100}
      />
    ))}</div>
    <div className="flex flex-row pt-2 text-gray-400 cursor-pointer">
      <div className="flex flex-row">
        <button onClick={()=>setReply(true)}>
        <ReplyIcon />
        </button>
        <p className="font-bold font-montserrat pl-2">Reply</p>
      </div>
    </div>

  {reply ? <div className="w-full"><CommentsInput postId={post_id} parentId={parentId} subComment={true}/> </div>:""}
  </div>
</div>

  );
};

Comments.displayName = "Comments";
export { Comments };
