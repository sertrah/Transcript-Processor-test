// Just read the file
const readTheFile = async (file: File[]) => {
  if (file.length === 0) {
    return Promise.resolve("");
  }

  if (file[0].type !== "text/plain") {
    return Promise.reject("Please upload a valid text file");
  }

  return await file[0].text();
};

// Just make the request
const callOpenAI = async (transcriptionText: string) => {
  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ messages: [transcriptionText] }),
  });

  if (!response.ok) {
    throw new Error("Try Again, something went wrong");
  }

  const result = await response.json();
  return result;
};

const getOpenAIReponse = async (file: File[]) => {
  const text = await readTheFile(file);
  try {
    const response = await callOpenAI(text);
    return response;
  } catch (error: Error | unknown) {
    return Promise.reject((error as Error).message);
  }
};

export { getOpenAIReponse };
