"use client";
import React, { useRef } from "react";
import style from "@/app/styles/UploadFileInput.module.css";

const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

const DragAndDropInput: React.FC<{ setFiles: (files: File[]) => void }> = ({
  setFiles,
}) => {
  const uploadFileContainer = useRef<HTMLDivElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    (event.target as HTMLDivElement).classList.remove("dragover");
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
    // Show a status?
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    /* event.target.classList.add("dragover"); */
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    /*     event.target.classList.remove("dragover");
     */
  };

  return (
    <div
      className={style.container}
      ref={uploadFileContainer}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      /*       onClick={() => document.getElementById("fileInput").click()}
       */
    >
      <input
        type="file"
        id="fileUpload"
        name="file"
        accept={allowedTypes.join(",")}
      />
    </div>
  );
};

export default DragAndDropInput;
