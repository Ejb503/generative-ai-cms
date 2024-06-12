import { NextRequest } from "next/server";
import Delta from "quill-delta";
import fs from "fs";
import path from "path";
import { githubPrompts } from "@/prompts/github";
import { redditPrompts } from "@/prompts/reddit";
import { blogPrompts } from "@/prompts/blog";
import { linkedinPrompts } from "@/prompts/linkedin";
import { twitterPrompts } from "@/prompts/twitter";

import {
  PromptGenerators,
  SystemPromptParams,
  UserPromptParams,
} from "@/app/const/types";

const Groq = require("groq-sdk");
const platformPrompts: Record<string, PromptGenerators> = {
  github: githubPrompts,
  reddit: redditPrompts,
  blog: blogPrompts,
  linkedin: linkedinPrompts,
  twitter: twitterPrompts,
};

export async function POST(req: NextRequest) {
  try {
    const { id, title, content, keywords, platform } = await req.json();
    const systemPromptParams: SystemPromptParams = {
      platform,
    };
    const userPromptParams: UserPromptParams = {
      title,
      keywords,
      content,
      platform,
    };
    const systemPrompt =
      platformPrompts[platform].generateSystemPrompt(systemPromptParams);
    const userPrompt =
      platformPrompts[platform].generateUserPrompt(userPromptParams);
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const result = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
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
  }
}
