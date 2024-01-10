"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const DragAndDrop = () => {
  const maxFiles = 4;
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([]);
  const [files, setFiles] = useState<File[]>([]); // Updated to store File objects

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit done!", files);

    // Assuming you want to send files to the backend here
    // You can use the 'files' array to send to the backend
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const previewArray: (string | ArrayBuffer | null)[] = [...previews];
      const fileArray: File[] = [...files];

      if (acceptedFiles.length + previewArray.length > maxFiles) {
        // Handle exceeding the maximum number of files
        console.log(`Maximum allowed files is ${maxFiles}`);
        return;
      }

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = function () {
          previewArray.push(reader.result);
          setPreviews([...previewArray]);

          // Add the dropped file to the 'files' array
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
    multiple: true, // Allow multiple file drops
  });

  return (
    <>
      <form onSubmit={handleOnSubmit} className="flex flex-col">
        <input
          className="font-montserrart bg-transparent border-none focus:border-none outline-none"
          type="text"
          placeholder="Post title"
        />
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="border-primary border-2 border-dotted font-montserrart text-neutral-400">
              Drop image file here
            </p>
          ) : (
            <h1 className="text-neutral-400 font-montserrart">
              <p className={previews[0] == null ? "" : "opacity-0"}>Drop image file here</p>
            </h1>
          )}
        </div>

        <div className="flex flex-row">
          {previews.map((preview, index) => (
            <div key={index} className="p-2">
              <Image src={preview as string} alt={`Preview ${index}`} width={100} height={100} />
            </div>
          ))}
        </div>
        <div className="pt-5 ml-[20%] mr-[40%]">
          <button type="submit" className=" border-primary border-2 rounded-lg text-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default DragAndDrop;
