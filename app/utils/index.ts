const readTheFile = async (file: File[]) => {
  if (file.length === 0) {
    return Promise.reject(new Error("No file selected"));
  }

  return await file[0].text();
};

const callOpenAI = async (transcriptionText: string) => {
  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ messages: [transcriptionText] }),
  });
  const result = await response.json();
  console.log(result);
  return result;
};

const getOpenAIReponse = async (file: File[]) => {
  const text = await readTheFile(file);
  const response = await callOpenAI(text);
  return response;
};

export { getOpenAIReponse };
