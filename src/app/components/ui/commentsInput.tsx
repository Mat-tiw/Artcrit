import React, { useState, ChangeEvent, useRef } from "react";
import { Avatar } from "@mui/material";
import { defaultBackend, login, userId, userPic } from "../../../api/api.js";

interface CommentProps{
  userId?:number;
  postId?:number
}
export const CommentsInput:React.FC<CommentProps> = ({
  userId,postId
}) => {
  const [comments, setComments] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [files,setFiles] = useState<File[]>([]);
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  const handleFormSubmit = async()=>{
    try {
      const formData = new FormData();
      formData.append("commnetContent",comments)
      const user_id = userId ?? ""
      const post_id = postId ?? ""
      formData.append("postId",post_id)
      formData.append("userId",user_id)
      if(files){
        formData.append("file",files)
      }
      const upload = await axios.post(`${defaultBackend}/comment/add`,formData)
      console.log(upload)
    } catch (error) {
      console.log(error)      
    }
  }

  return (
    <>
      {login ? (
        <div className="flex flex-col">
          <div className="flex flex-row pb-5">
            <Avatar src={userPic ?? ""} />
            <textarea
              ref={textareaRef}
              placeholder="What are your thoughts?"
              id="comment-content"
              value={comments}
              onChange={(e) => handleTextareaChange(e)}
              className="ml-2 w-full overflow-y-hidden resize-none bg-transparent border-b-2 focus:border-none focus:border-b-2 outline-none box-border h-auto pb-0.5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent",
              }}
              rows={1}
            />
          </div>
        </div>
      ) : (
        <div className="font-montserrart text-white border-red-500 text-center items-center border-2 rounded-lg ">
          You must be logged in before you can comment.
        </div>
      )}
    </>
  );
};
