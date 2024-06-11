import React, { useEffect, useMemo, useState } from "react";
import "quill/dist/quill.snow.css";
import Layout from "@/app/components/layout";
import "@/app/globals.css";
import { EDITOPTIONS, PLAINOPTIONS } from "@/app/const/quillSettings";
import { useQuill } from "@/app/hooks/useQuill";
import { FIELDS, PLATFORMS } from "@/app/const/api";
import {
  fetchData,
  generateContent,
  saveContent,
  toTitleCase,
} from "@/app/utils/api";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import fs from "fs";
import path from "path";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { QuillInstancesType } from "@/app/const/types";

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

interface EditProps {
  id: string;
  initialData: { [key: string]: any };
}

export default function EditContent({ id, initialData }: EditProps) {
  const twitterQuill = useQuill("#twitter", EDITOPTIONS);
  const contentQuill = useQuill("#content", EDITOPTIONS);
  const titleQuill = useQuill("#title", PLAINOPTIONS);
  const keywordsQuill = useQuill("#keywords", PLAINOPTIONS);
  const blogQuill = useQuill("#blog", EDITOPTIONS);
  const githubQuill = useQuill("#github", EDITOPTIONS);
  const redditQuill = useQuill("#reddit", EDITOPTIONS);
  const linkedinQuill = useQuill("#linkedin", EDITOPTIONS);

  const [selectedPlatform, setSelectedPlatform] = useState("twitter");

  const articleContent: QuillInstancesType = useMemo(
    () => ({
      title: titleQuill,
      keywords: keywordsQuill,
      content: contentQuill,
      twitter: twitterQuill,
      reddit: redditQuill,
      blog: blogQuill,
      github: githubQuill,
      linkedin: linkedinQuill,
    }),
    [
      titleQuill,
      keywordsQuill,
      contentQuill,
      twitterQuill,
      redditQuill,
      blogQuill,
      githubQuill,
      linkedinQuill,
    ]
  );

  const handlePlatformChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPlatform(event.target.value);
  };

  const handleSaveContent = async () => {
    for (const [field, quill] of Object.entries(articleContent)) {
      const content = quill.getContents();
      await saveContent(id, field, content);
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

  const handleGenerateContent = async () => {
    if (!selectedPlatform) return;
    const title = titleQuill.getText();
    const content = contentQuill.getText();
    const keywords = keywordsQuill.getText();
    try {
      const response = await generateContent(
        id,
        title,
        keywords,
        selectedPlatform,
        content
      );
      if (response.ok) {
        const data = await fetchData(id, selectedPlatform);
        if (data) {
          articleContent[
            selectedPlatform as keyof QuillInstancesType
          ].setContents(data);
        } else {
          throw new Error(
            `Failed to fetch data for platform: ${selectedPlatform}`
          );
        }
      } else {
        throw new Error(
          `Failed to generate content for platform: ${selectedPlatform}`
        );
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
