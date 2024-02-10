import React, { useState, ChangeEvent, useRef,useCallback,FormEvent } from "react";
import { Avatar } from "@mui/material";
import { defaultBackend, login, userId, userPic } from "../../../api/api.js";
import axios from "axios";
interface CommentProps{
  postId?:number
}
export const CommentsInput:React.FC<CommentProps> = ({
postId
}) => {
  const maxFiles = 4;
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
  const handleFormSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("commnetContent",comments)
      if (postId !== undefined) {
        formData.append("postId", postId.toString());
      }
      if(userId!==null){
        formData.append("userId",userId)
      }
      files.forEach((file)=>{
        formData.append("files",file)
      })
      const upload = await axios.post(`${defaultBackend}/comment/add`,formData)
      console.log(upload)
    } catch (error) {
      console.log(error)      
    }
  }

  const handleFile = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    let selectFiles:File[] = Array.from(e.target.files ?? []);
    let fileArray:File[] = [...files]
    if(files.length >= maxFiles){
      return
    }
    if(selectFiles !== null){
      selectFiles.map((file)=>{
        fileArray.push(file)
        setFiles(fileArray)
      })
    }
  },[files,maxFiles])
  console.log(files)
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
          <input onChange={handleFile} type="file" name="" id="" />
        </div>
      ) : (
        <div className="font-montserrart text-white border-red-500 text-center items-center border-2 rounded-lg ">
          You must be logged in before you can comment.
        </div>
      )}
    </>
  );
};
