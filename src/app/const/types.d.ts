import Quill from "quill";

export interface UserPromptParams {
  title: string;
  keywords: string[];
  content: string;
  platform: string;
}

export interface SystemPromptParams {
  platform: string;
}

export type QuillInstancesType = {
  twitter: Quill;
  content: Quill;
  title: Quill;
  keywords: Quill;
};

export type PromptGenerators = {
  generateSystemPrompt: (params: SystemPromptParams) => string;
  generateUserPrompt: (params: UserPromptParams) => string;
};
