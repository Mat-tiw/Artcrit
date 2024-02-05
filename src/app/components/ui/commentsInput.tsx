import React, { useState, ChangeEvent, useRef } from "react";
import { Avatar } from "@mui/material";
import { login, userPic } from "../../../api/api.js";

export const CommentsInput = () => {
  const [comments, setComments] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight
    }
  };

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
