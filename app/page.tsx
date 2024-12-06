"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import AISummaryAndKeyPoints from "./components/AISummaryAndKeyPoints";
import { getOpenAIReponse } from "./utils";

const UploadFileInput = dynamic(() => import("./components/DragAndDropInput"), {
  loading: () => <h1>Loading...</h1>,
});

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [transcriptionText, setTranscriptionText] = useState<string>("");

  useEffect(() => {
    getOpenAIReponse(files).then((response) => {
      console.log(response);
      setTranscriptionText(response);
    });
  }, [files]);

  return (
    <main>
      <UploadFileInput setFiles={setFiles} />
      <AISummaryAndKeyPoints transcriptionText={transcriptionText} />
    </main>
  );
}
