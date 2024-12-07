import OpenAI from "openai";

class IAClient {
  static instance = null;
  private openAI: OpenAI | null = null;

  constructor(apiKey: string | undefined) {
    if (!apiKey) {
      throw new Error("APY key is required");
    }
    this.init();
  }

  async init() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  get OpenAI(): OpenAI {
    if (!this.openAI) {
      throw new Error("OpenAI is not initialized");
    }
    return this.openAI;
  }
}

const openaiClient = new IAClient(process.env.OPENAI_API_KEY);

export default openaiClient;
