import { NextRequest } from "next/server";
import {
  generateUserPrompt,
  generateSystemPrompt,
  TWITTERINSTRUCTIONS,
} from "./prompt";
import Delta from "quill-delta";
import fs from "fs";
import path from "path";

const Groq = require("groq-sdk");

export async function POST(req: NextRequest) {
  const controller = new AbortController();

  try {
    const { id, title, content, keywords, platform } = await req.json();
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    const instructions = TWITTERINSTRUCTIONS;

    const result = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: generateSystemPrompt({ platform, instructions }),
        },
        {
          role: "user",
          content: generateUserPrompt({
            title,
            content,
            keywords,
            platform,
          }),
        },
      ],
      model: "llama3-8b-8192",
    });
    const delta = new Delta().insert(result.choices[0].message.content);
    const filePath = path.resolve(
      process.cwd(),
      "content",
      `${id}/${platform}.json`
    );
    fs.writeFile(filePath, JSON.stringify(delta), (err) => {
      if (err) throw err;
    });

    return new Response(JSON.stringify(delta), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Something went wrong"), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } finally {
    controller.abort();
  }
}
