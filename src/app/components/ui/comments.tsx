import { Avatar } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplyIcon from '@mui/icons-material/Reply';
import React from 'react'
interface commentProps{
    userName?:string;
    userPic?:string;
    commentPoint?:number;
    commentContent?:string;

}
const Comments: React.FC<commentProps>=({userName,userPic,commentPoint,commentContent})=>{
  return (
    <>
        <div className="flex flex-row pt-5 w-full">
          <div className="flex flex-col">
            <ArrowDropUpIcon />
            <p className="self-center">{commentPoint}</p>
            <ArrowDropDownIcon />
          </div>
          <div className="flex flex-col pl-4">
            <div className="flex flex-row">
              <Avatar src={userPic !== null ? userPic : ""} />
              <p className="font-montserrart pl-2 pt-2 font-semibold" >{userName}</p>
            </div>
            <p className="text-pretty font-karla pt-2">
              {commentContent}
            </p>
            <div className="flex flex-row pt-2">
                <ReplyIcon sx={{
                    color:"#9ca3af"
                }} />
              <p className="font-bold font-montserrart text-gray-400 pl-2">Reply</p>
            </div>
          </div>
        </div>
    </>
  );
}
Comments.displayName = 'Comments';
export {Comments}