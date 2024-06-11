import Quill from "quill";

export const HOST = "http://localhost:3000";
export const FETCH_CONTENT_API = `${HOST}/api/v1/fetchContent`;
export const SAVE_CONTENT_API = `${HOST}/api/v1/saveContent`;
export const SCAN_CONTENT_API = `${HOST}/api/v1/scanContent`;
export const CREATE_CONTENT_API = `${HOST}/api/v1/createContent`;

export const GROQ_API = "/api/v1/groq";

export type QuillInstancesType = {
  twitter: Quill;
  content: Quill;
  title: Quill;
  keywords: Quill;
};

export const FIELDS = ["twitter", "content", "title", "keywords"];
