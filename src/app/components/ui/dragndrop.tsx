"use client";
import axios from "axios";
import React, { useState, useCallback, FormEvent } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red } from "@mui/material/colors";
import { login, defaultBackend, userId } from "../../../api/api.js";
const DragAndDrop = () => {
  const maxFiles = 4;
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [postTitles, setPostTitles] = useState<string>("");
  const [postFocused, setPostFocused] = useState<boolean>(false);

  const [postBadge, setPostBadge] = useState<string>("");
  const [postBadgeFocused, setPostBadgeFocused] = useState<boolean>(false);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log();
    try {
      const formData = new FormData();
      formData.append("postTitles", postTitles);
      formData.append("postBadge", postBadge);
      if (userId !== null) {
        formData.append("userId", userId);
      }
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post(
        `${defaultBackend}post/create`,
        formData
      );
      console.log(response);
      location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
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
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const previewArray: (string | ArrayBuffer | null)[] = [...previews];
      const fileArray: File[] = [...files];

      if (acceptedFiles.length + previewArray.length > maxFiles) {
        console.log(`Maximum allowed files is ${maxFiles}`);
        return;
      }

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = function () {
          previewArray.push(reader.result);
          setPreviews([...previewArray]);
          fileArray.push(file);
          setFiles([...fileArray]);
        };
        reader.readAsDataURL(file);
      });
    },
    [previews, files, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <>
      <form onSubmit={handleOnSubmit} className="flex flex-col text-lg">
        <input
          autoFocus
          className="pt-5 font-montserrart bg-transparent border-none focus:border-none outline-none"
          type="text"
          placeholder="Post title"
          autoComplete="off"
          aria-describedby="postTitle"
          value={postTitles}
          onChange={(e) => setPostTitles(e.target.value)}
          onFocus={() => setPostFocused(true)}
          onBlur={() => setPostFocused(false)}
        />
        <p
          id="postTitle"
          className={
            postBadgeFocused && login && postTitles === ""
              ? "text-white border-2 border-red-700 rounded-xl p-2 mr-5"
              : "hidden"
          }
        >
          Post title cannot be empty
        </p>

        <input
          className="font-montserrart bg-transparent border-none focus:border-none outline-none"
          type="text"
          placeholder="Post badge"
          aria-describedby="postBadge"
          autoComplete="off"
          value={postBadge}
          onChange={(e) => setPostBadge(e.target.value)}
          onFocus={() => setPostBadgeFocused(true)}
          onBlur={() => setPostBadgeFocused(false)}
        />
        <p
          id="postBadge"
          className={
            postBadgeFocused && login && postBadge === ""
              ? "text-white border-2 border-red-700 rounded-xl p-2 mr-5"
              : "hidden"
          }
        >
          Badge cannot be empty
        </p>

        <div className={login ? "" : "hidden"}>
          <div {...getRootProps()}>
            <input {...getInputProps()} aria-describedby="image-input" />
            {isDragActive ? (
              <p className="border-primary border-2 border-dotted font-montserrart text-neutral-400">
                Drop image file here
              </p>
            ) : (
              <h1 className="text-neutral-400 font-montserrart">
                <p>Drop image file here</p>
                <p
                  className={files.length === 0 ? "text-red-300" : "opacity-0"}
                >
                  *Please add at least one image*
                </p>
              </h1>
            )}
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

          <div className="flex flex-row-reverse">
            <button
              disabled={
                postBadge === "" || postTitles === "" || files.length === 0
                  ? true
                  : false
              }
              type="submit"
              className={
                postBadge === "" || postTitles === "" || files.length === 0
                  ? "border-gray-500 border-2 rounded-lg text-gray-500 pl-5 pr-5 ml-auto mr-8"
                  : "border-primary border-2 rounded-lg text-primary pl-5 pr-5 ml-auto mr-8"
              }
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DragAndDrop;
