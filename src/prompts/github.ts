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

# Locally hosted AI CMS with Quill

<img src="https://tyingshoelaces.com/logo.png" alt="logo" width="100"/> [![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT) [![Contributors](https://img.shields.io/badge/contributors-1-orange)](https://github.com/Ejb503)

A locally hosted CMS that writes and reads content to JSON using Quill. Integrated with Groq to leverage content generation at scale and publish content in different media channels and formats. Read more in the blog: [Tying Shoelaces](https://tyingshoelaces.com/blog/generative-ai-cms)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)

## Features

- 🎨 **Feature One**: Read/Write content using Quill
- 🚀 **Feature Two**: Generate content via Groq
- 🔒 **Feature Three**: Locally hosted CMS
- 🛠 **Feature Four**: All typescript through NextJS

## Installation

- add GROQ_API_KEY to .env.local.
- mkdir content
- npm i
- npm run dev

### Steps to Install

1. Clone the repository:

git clone https://github.com/Ejb503/generative-ai-cms

2. Change to the project directory:

cd generative-ai-cms

3. Install dependencies:

npm install

4. Set up environment variables

cp .env.example .local.env

## Usage

npm run dev

## Architecture

Here's an overview of the project's architecture and how the components interact with each other.

plaintext
|-- src/
| |-- app/
| |-- pages/
| |-- prompts/
|-- public/
|-- content/

## License
Distributed under the MIT License. See LICENSE for more information.
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
