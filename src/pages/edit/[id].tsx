import React, { useEffect, useMemo, useState } from "react";
import "quill/dist/quill.snow.css";
import Layout from "@/app/components/layout";
import "@/app/globals.css";
import {
  EDITOPTIONS,
  PLAINOPTIONS,
  PLATFORMS,
} from "@/app/const/quillSettings";
import { useQuill } from "@/app/hooks/useQuill";
import { GROQ_API, QuillInstancesType, FIELDS } from "@/app/const/api";
import { fetchData, saveContent, toTitleCase } from "@/app/utils/api";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import fs from "fs";
import path from "path";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const contentDirectory = path.join(process.cwd(), "content");
  const ids = fs.readdirSync(contentDirectory).filter((file) => {
    return fs.statSync(path.join(contentDirectory, file)).isDirectory();
  });

  return {
    paths: ids.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;

  if (!params || !params.id || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const id = params.id;
  const initialData: Record<string, any> = {};
  for (let field of FIELDS) {
    const data = await fetchData(id, field);
    if (data) {
      initialData[field] = data;
    }
  }

  return {
    props: {
      id,
      initialData,
    },
  };
};

interface HomeProps {
  id: string;
  initialData: { [key: string]: any };
}

export default function Home({ id, initialData }: HomeProps) {
  const twitterQuill = useQuill("#twitter", EDITOPTIONS);
  const contentQuill = useQuill("#content", EDITOPTIONS);
  const titleQuill = useQuill("#title", PLAINOPTIONS);
  const keywordsQuill = useQuill("#keywords", PLAINOPTIONS);
  const [selectedPlatform, setSelectedPlatform] = useState("twitter");

  const handlePlatformChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPlatform(event.target.value);
  };
  const articleContent: QuillInstancesType = useMemo(
    () => ({
      title: titleQuill,
      keywords: keywordsQuill,
      content: contentQuill,
      twitter: twitterQuill,
    }),
    [contentQuill, titleQuill, keywordsQuill, twitterQuill]
  );

  const handleSaveContent = async () => {
    for (const [field, quill] of Object.entries(articleContent)) {
      const content = quill.getContents();
      await saveContent(id, field, content);
    }
  };

  const handleGenerateContent = () => {
    if (selectedPlatform) {
      generateContent(selectedPlatform);
    }
  };

  useEffect(() => {
    Object.keys(articleContent).forEach((key) => {
      const instance = articleContent[key as keyof QuillInstancesType];
      if (instance) {
        const data = initialData[key as keyof typeof initialData];
        if (data) {
          instance.setContents(data);
        }
      }
    });
  }, [articleContent, initialData]);

  const generateContent = async (platform: string) => {
    const title = titleQuill.getText();
    const content = contentQuill.getText();
    const keywords = keywordsQuill.getText();
    try {
      const response = await fetch(GROQ_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, content, keywords, platform }),
      });

      if (response.ok) {
        const data = await fetchData(id, platform);
        if (data) {
          articleContent[platform as keyof QuillInstancesType].setContents(
            data
          );
        } else {
          throw new Error(`Failed to fetch data for platform: ${platform}`);
        }
      } else {
        throw new Error(`Failed to generate content for platform: ${platform}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Link className="inline-block mb-4" href="/">
        <ArrowLeftIcon className="h-6 w-6" />
      </Link>

      <h1 className="text-4xl mb-2">Editor</h1>
      {Object.keys(articleContent).map((key) => (
        <div className="mb-4" key={`${key}-container`}>
          <h2 className="text-2xl mb-2">{toTitleCase(key)}</h2>
          <div id={key} />
        </div>
      ))}
      <button
        onClick={handleSaveContent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Save
      </button>
      <div className="mb-4">
        <select
          value={selectedPlatform}
          onChange={handlePlatformChange}
          className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          {PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              Generate for {platform}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleGenerateContent}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Content
      </button>
    </Layout>
  );
}
