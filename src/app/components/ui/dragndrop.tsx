"use client";
import axios from "axios";
import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const DragAndDrop = () => {
  const maxFiles = 4;
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [postTitles, setPostTitles] = useState<string>("");
  const [postFocused, setPostFocused] = useState<boolean>(false);

  const [postBadge, setPostBadge] = useState<string>("");
  const [postBadgeFocused, setPostBadgeFocused] = useState<boolean>(false);

  const userId = localStorage.getItem("userId");

  const login = localStorage.getItem("token") === null ? false : true;

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
        "http://localhost:3030/api/post/create",
        formData
      );
      console.log(response);
      location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    }
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
      <form onSubmit={handleOnSubmit} className="flex flex-col">
        <input
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
            postFocused && login && postTitles === ""
              ? "text-white border-2 border-red-700 rounded-xl p-2 mr-5"
              : "hidden"
          }
        >
          Post title cannot be empty
        </p>
        <p
          id="postTitle"
          className={
            postFocused && !login
              ? "text-white border-2 border-red-700 rounded-xl p-2"
              : "hidden"
          }
        >
          You must be logged in to create post
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
        <p
          id="postBadge"
          className={
            postBadgeFocused && !login
              ? "text-white border-2 border-red-700 rounded-xl p-2"
              : "hidden"
          }
        >
          You must be logged in to create post
        </p>
        <div className={login ? "" : "hidden"}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="border-primary border-2 border-dotted font-montserrart text-neutral-400">
                Drop image file here
              </p>
            ) : (
              <h1 className="text-neutral-400 font-montserrart">
                <p className={previews[0] == null ? "" : "opacity-0"}>
                  Drop image file here
                </p>
              </h1>
            )}
          </div>

          <div className="flex flex-row">
            {previews.map((preview, index) => (
              <div key={index} className="p-2">
                <Image
                  src={preview as string}
                  alt={`Preview ${index}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
          <div className="pt-5 ml-[20%] mr-[40%]">
            <button
            disabled={postBadge === "" || postTitles === "" ? true :false}
              type="submit"
              className={postBadge === "" || postTitles === ""? "border-red-500 border-2 rounded-lg text-red-500 w-full" : "border-primary border-2 rounded-lg text-primary w-full"}
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
