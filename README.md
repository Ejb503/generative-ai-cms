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
