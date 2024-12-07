"use client";
import React, { useRef } from "react";
import style from "@/app/styles/UploadFileInput.module.css";

const allowedTypes = [".txt"];

const addClass = (element: HTMLDivElement | null) => {
  if (element) element.classList.add(style.has_file);
};
const removeClass = (element: HTMLDivElement | null) => {
  if (element) element.classList.remove(style.has_file);
};

const DragAndDropInput: React.FC<{
  setFiles: (files: File[]) => void;
  removeFile: () => void;
}> = ({ setFiles, removeFile }) => {
  const uploadFileContainer = useRef<HTMLDivElement>(null);

  const getUploadInputElement = (): HTMLInputElement => {
    const input = uploadFileContainer.current?.querySelector(
      "#fileUpload"
    ) as HTMLInputElement;
    return input;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
    addClass(uploadFileContainer.current);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    addClass(uploadFileContainer.current);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
      addClass(uploadFileContainer.current);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    removeClass(uploadFileContainer.current);
  };

  const removeFileFromInput = () => {
    const input = getUploadInputElement();
    if (input) {
      input.value = "";
      removeFile();
      removeClass(uploadFileContainer.current);
    }
  };

  const getFileFromInput = () => {
    const input = getUploadInputElement();
    if (input) {
      return input.files?.[0];
    }
    return null;
  };

  return (
    <div ref={uploadFileContainer} className={style.container}>
      <div
        className={style.uploadContainer}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => getUploadInputElement().click()}
      >
        <p className={style.default_text}>
          Drag and drop your file here, or click to select
        </p>
        <p className={style.text_attached}> {getFileFromInput()?.name}</p>

        <input
          type="file"
          id="fileUpload"
          name="file"
          className={style.fileUpload}
          onChange={handleChange}
          accept={allowedTypes.join(",")}
        />
      </div>

      <button
        className={style.removeFileBtn}
        type="button"
        onClick={removeFileFromInput}
      >
        Remove file
      </button>
    </div>
  );
};

export default DragAndDropInput;
