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
  const [postBadge, setPostBadge] = useState<string>("");

  const handlePostTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostTitles(e.target.value);
  };

  const handlePostBadgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostBadge(e.target.value);
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("postTitles", postTitles);
      formData.append("postBadge", postBadge);

      // Append each file to the FormData with the correct field name 'files'
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
          onChange={handlePostTitleChange}
        />
        <input
          className="font-montserrart bg-transparent border-none focus:border-none outline-none"
          type="text"
          placeholder="Post badge"
          onChange={handlePostBadgeChange}
        />
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
            type="submit"
            className=" border-primary border-2 rounded-lg text-primary w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default DragAndDrop;
