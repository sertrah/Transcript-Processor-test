import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
    const { messages } = await request.json();
    const transcript = messages.join(" ");

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Generate a summary and key points from the following transcript. Format the response as JSON with 'summary' and 'keyPoints' fields, where keyPoints is an array of strings."
          },
          {
            role: "user",
            content: transcript
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" }
      });
      
      const result = response.choices[0].message.content;
      return NextResponse.json(result);
}

