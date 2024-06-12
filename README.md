# Locally hosted CMS with Quill and Generative AI features

<img src="https://tyingshoelaces.com/_next/image?url=https%3A%2F%2Ftyingshoelaces.com%2Fcrackingnutssledgehammer.jpg&w=3840&q=75" alt="logo" width="360"/> By [tyingshoelaces.com](https://tyingshoelaces.com)

[![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT) [![Contributors](https://img.shields.io/badge/contributors-1-orange)](https://github.com/Ejb503)

A locally hosted CMS that writes and reads content to JSON using Quill. Integrated with Groq to leverage content generation at scale and publish content in different media channels and formats. Read more in the blog: [Tying Shoelaces](https://tyingshoelaces.com/blog/generative-ai-cms)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)

## Features

1. Read / Write local content to JSON using Quill
2. NextJS for interactive frontend and API integrated into Groq (API key required)
3. Content augmentation generating social media specific bites from long form content

- **Groq:** ★★★★★ - New benchmarks in speed and cost for generative AI.
- **Quill:** ★★★★★ - Locally hosted content editor. Does the job, nice experience if tricky to get setup with SSR.
- **NextJS:** ★★★★★ - Wonderful technology, simplifies client and server-side development.

## Installation

- add GROQ_API_KEY to .env.local.
- mkdir content
- npm i
- npm run dev

### Steps to Install

1. Clone the repository:

```sh
git clone https://github.com/Ejb503/generative-ai-cms
```

2. Change to the project directory:

```sh
cd generative-ai-cms
```

3. Install dependencies:

```sh
npm install
```

4. Set up environment variables

```sh
cp .env.example .local.env
```

## Usage

```sh
npm run dev
```

## Architecture

Here's an overview of the project's architecture and how the components interact with each other.

```plaintext
|-- src/
| |-- app/
| |-- pages/
| |-- prompts/
|-- public/
|-- content/
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
