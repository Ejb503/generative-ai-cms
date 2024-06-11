import Delta from "quill-delta";
import { FETCH_CONTENT_API, GROQ_API, SAVE_CONTENT_API } from "../const/api";

export const fetchData = async (
  id: string,
  field: string
): Promise<Delta | undefined> => {
  try {
    const response = await fetch(
      `${FETCH_CONTENT_API}?id=${id}&field=${field}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
};

export const saveContent = async (
  id: string,
  field: string,
  content: Delta
) => {
  try {
    const response = await fetch(SAVE_CONTENT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, content, field }),
    });

    if (!response.ok) {
      throw new Error("Failed to save content");
    }
  } catch (error) {
    console.error(error);
  }
};

export const generateContent = async (
  id: string,
  title: string,
  keywords: string,
  platform: string,
  content: Delta
) => {
  try {
    const response = await fetch(GROQ_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, content, keywords, platform }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate content");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
