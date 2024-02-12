import React, {
  useState,
  ChangeEvent,
  useRef,
  useCallback,
  FormEvent,
} from "react";
import { Avatar } from "@mui/material";
import { defaultBackend, login, userId, userPic } from "../../../api/api.js";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import Image from "next/image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red } from "@mui/material/colors";
interface CommentProps {
  postId?: number;
  subComment?:boolean;
}
export const CommentsInput: React.FC<CommentProps> = ({ postId,subComment }) => {
  const maxFiles = 4;
  const [comments, setComments] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([]);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  const handleRemoveImage = (index: number) => {
    const updatedPreviews = [...previews];
    const updatedFiles = [...files];

    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);

    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!subComment){
      try {
        const formData = new FormData();
  
        formData.append("commentContent", comments);
        if (postId != undefined && postId != null) {
          formData.append("postId", String(postId));
        }
        if (userId !== null) {
          formData.append("userId", userId);
        }
        files.forEach((file) => {
          formData.append("files", file);
        });
        const upload = await axios.post(
          `${defaultBackend}/comment/add`,
          formData
        ); 
        location.reload();
        return
      } catch (error) {
        console.log(error);
      }
    }else{
      try {
        
      } catch (error) {
        
      }
    }
  };

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let selectFiles: File[] = Array.from(e.target.files ?? []);
      const previewArray: (string | ArrayBuffer | null)[] = [...previews];
      let fileArray: File[] = [...files];
      if (files.length >= maxFiles) {
        return;
      }
      if (selectFiles !== null) {
        selectFiles.map((file) => {
          const reader = new FileReader();
          reader.onload = function () {
            previewArray.push(reader.result);
            setPreviews([...previewArray]);
            fileArray.push(file);
            setFiles(fileArray);
          };
          reader.readAsDataURL(file);
        });
      }
    },
    [files, maxFiles, previews]
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      {login ? (
        <div className="flex flex-col border-2 border-gray-700 rounded-xl">
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-row pb-5 m-2">
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
            <div className="flex flex-row">
              {previews.map((preview, index) => (
                <div key={index} className="p-2 relative">
                  <Image
                    src={preview as string}
                    alt={`Preview ${index}`}
                    width={100}
                    height={100}
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    type="button"
                    className="absolute top-0 right-0 p-0.5 text-white rounded-full bg-red-500"
                  >
                    <DeleteForeverIcon sx={{ color: red }} />
                  </button>
                </div>
              ))}
            </div>
            <div className="relative flex flex-row bg-gray-800 rounded-bl-xl rounded-br-xl">
              <button
                type="button"
                onClick={handleButtonClick}
                className="right-0 bottom-0 bg-transparent m-2 ml-14"
              >
                <AddPhotoAlternateOutlinedIcon />
              </button>
              <input
                onChange={handleFile}
                ref={fileInputRef}
                type="file"
                className="inset-0 cursor-pointer hidden"
              />
              <div className="bg-primary text-primaryBg rounded-xl">
                <button className="font-montserrart p-2" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="font-montserrart text-white border-red-500 text-center items-center border-2 rounded-lg ">
          You must be logged in before you can comment.
        </div>
      )}
    </>
  );
};
