"use client";
import React from "react";
import dynamic from "next/dynamic";

import useTranscriptionManager from "../utils/useTranscriptionManager";

// Components
import HeroContainer from "./HeroContainer";
import UploadFileInput from "./UploadFileInput";
import ErrorBoundary from "./ErrorBoundary";

const AISummaryAndKeyPoints = dynamic(() => import("./AISummaryAndKeyPoints"), {
  loading: () => <p style={{ textAlign: "center", transform: "translateY(4rem)" }}>Loading...</p>,
  ssr: false,
});

const TranscriptProcess = () => {
  const { setFiles, errorMessage, isLoading, transcriptionText, removeFile } =
    useTranscriptionManager();

  return (
    <ErrorBoundary>
      <HeroContainer>
        <UploadFileInput setFiles={setFiles} removeFile={removeFile} />
        <p className={`text text-red ${errorMessage ? "fade-in" : "fade-out"}`}>
          {errorMessage}
        </p>
      </HeroContainer>
      <section className="transcription__container">
        <div className={`loading ${isLoading ? "fade-in" : "fade-out"}`} />
        <AISummaryAndKeyPoints transcriptionText={transcriptionText} />
      </section>
    </ErrorBoundary>
  );
};

export default TranscriptProcess;
