import { useEffect, useState } from "react";
import { ITransciption } from "../types/shared";
import { getOpenAIReponse } from ".";

const useTranscriptionManager = (): {
  setFiles: (files: File[]) => void;
  errorMessage: string;
  isLoading: boolean;
  transcriptionText: ITransciption | undefined;
  removeFile: () => void;
} => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [transcriptionText, setTranscriptionText] = useState<
    ITransciption | undefined
  >();

  const clearState = () => {
    setIsLoading(false);
    setErrorMessage("");
  };

  const removeFile = () => {
    setFiles([]);
    clearState();
  };

  useEffect(() => {
    if (files.length === 0) {
      clearState();
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setTranscriptionText(undefined);

    getOpenAIReponse(files)
      .then((response) => {
        setTranscriptionText(response);
        clearState();
      })
      .catch((error) => {
        setErrorMessage(error);
        setIsLoading(false);
      });
  }, [files]);

  return { setFiles, errorMessage, isLoading, transcriptionText, removeFile };
};

export default useTranscriptionManager;
