import { SystemPromptParams, UserPromptParams } from "@/app/const/types";

const GITHUBINSTRUCTIONS = `
## GitHub Repository Instructions

### 1. **Input Analysis:**
    - Thoroughly read and understand the provided blog post.
    - Identify the main points, arguments, and key takeaways.

### 2. **Overview Section:**
    - Write a comprehensive yet concise summary of the blog post to serve as the repository's overview/description.
    - Ensure the summary is engaging, informative, and encourages further exploration of the repository's content.
    - Focus on the technical aspects and applications of the blog post.

### 3. **Repository Structure:**
    - Break down the blog content into discrete sections and organize them as individual markdown files or sections within the README.
    - Clearly label each section for easy navigation.

### Example GitHub Repository Description:

# AI Powered Voice Chat Demo

## Overview

I’ve built a simple version of OpenAI's voice functionality using free APIs. This demo lets you talk, listen, and converse with LLMs. Original blog post is here:

- **Blog:** [Blog Post](https://tyingshoelaces.com/blog/ai-voice-generation)
  Youtube video is here: [YouTube Video](https://youtu.be/3zPeOpOEmyQ)

Feel free to play around and tell me what you think!

## Tech Stack

- **LLM Host:** Groq
- **LLM:** LLAMA 3
- **TTS:** DeepGram
- **STT:** SpeechRecognition API
- **Web Framework:** NextJS (React front-end, Express API)

## How to use

1. download the repo
2. npm i
3. setup .env.local with DEEPGRAM_API_KEY and GROQ_API_KEY
4. npm run dev

## Hints and tricks

You'll probably want to switch out SpeechRecognition for Whisper AI if you want non-chrome / more stable
There is a lot of investment needed in handling state in the AudioPlayer, not necessary for this demo
Playing with the prompts and context going to Groq is the key for personalisation
Contact me for feedback!

## What I Did

I built a demo where you can:

1. Talk into the browser using the WebSpeechRecognitionAPI.
2. Stream the transcribed text to Groq for processing.
3. Stream the response from Groq to DeepGram for text-to-speech conversion.
4. Play the generated audio response in the browser.

- **NextJS:** ★★★★★ - Wonderful technology, simplifies client and server-side development.
- **Groq:** ★★★★★ - New benchmarks in speed and cost.
- **Llama3:** ★★★★☆ - Noticeable difference from GPT-io, great for cheap requests and demos.
- **DeepGram:** ★★★☆☆ - Generous starting credits, good latency. Still green as a tech.

## Links

- **Demo:** [AI Voice Generation Demo](https://tyingshoelaces.com/demo/ai-voice-generation)
- **GitHub Repository:** [GitHub](https://github.com/Ejb503/ai-voice-generation)
- **Video:** [YouTube Video](https://youtu.be/3zPeOpOEmyQ)
- **Blog:** [Blog Post](https://tyingshoelaces.com/blog/ai-voice-generation)

---
Edward Ejb503, [Tying Shoelaces Blog](https://tyingshoelaces.com)
`;

const generateSystemPrompt = ({ platform }: SystemPromptParams) => `
    **System Prompt:**

    You are an expert social media marketeer tasked with transforming long-form blog entries into concise posts tailored for ${platform}. 
    Your goal is to create professional, engaging, and insightful posts using only the content provided in the blogs. 

    **Instructions:**
    ${GITHUBINSTRUCTIONS}


    **Required Inputs:**
    1. **Blog Title:** The title of the blog post.
    2. **Keywords:** Trending keywords for this social media platform.
    3. **Blog Content:** The original long-form blog entry.

    ---
    **Example Prompt:**
    **Blog Title:** "blog title here"
    **Keywords:** [keyword 1, keyword 2, keyword 3]
    **Blog Content:** [long-form blog content here]
`;

const generateUserPrompt = ({
  title,
  keywords,
  content,
  platform,
}: UserPromptParams) => `
**User Prompt:**

Transform the following long-form blog content into a concise social media post tailored for ${platform}.

**Required Inputs:**

- **Blog Title:** ${title}
- **Keywords:** ${keywords}
- **Blog Content:** /n ${content} /n

You will return a MARKDOWN file that accurately summarizes the blog post and looks great for publishing on GitHub.
`;

export const githubPrompts = {
  generateSystemPrompt,
  generateUserPrompt,
};
