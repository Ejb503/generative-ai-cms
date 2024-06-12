import React, { useEffect, useMemo, useState } from "react";
import "quill/dist/quill.snow.css";
import Layout from "@/app/components/layout";
import "@/app/globals.css";
import {
  EDITOPTIONS,
  PLAINOPTIONS,
  VIEWOPTIONS,
} from "@/app/const/quillSettings";
import { useQuill } from "@/app/hooks/useQuill";
import { FIELDS } from "@/app/const/api";
import { fetchData, toTitleCase } from "@/app/utils/api";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import fs from "fs";
import path from "path";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import AccordionItem from "@/app/components/accordion-item";
import { QuillInstancesType } from "@/app/const/types";
import Quill from "quill";

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

interface ViewProps {
  initialData: { [key: string]: any };
}

export default function ViewContent({ initialData }: ViewProps) {
  const [contentChanged, setContentChanged] = useState(false);
  const twitterQuill: Quill = useQuill(
    "#twitter",
    EDITOPTIONS,
    setContentChanged
  );
  const contentQuill: Quill = useQuill(
    "#content",
    EDITOPTIONS,
    setContentChanged
  );
  const titleQuill: Quill = useQuill("#title", PLAINOPTIONS, setContentChanged);
  const keywordsQuill: Quill = useQuill(
    "#keywords",
    PLAINOPTIONS,
    setContentChanged
  );
  const blogQuill: Quill = useQuill("#blog", EDITOPTIONS, setContentChanged);
  const githubQuill: Quill = useQuill(
    "#github",
    EDITOPTIONS,
    setContentChanged
  );
  const redditQuill: Quill = useQuill(
    "#reddit",
    EDITOPTIONS,
    setContentChanged
  );
  const linkedinQuill: Quill = useQuill(
    "#linkedin",
    EDITOPTIONS,
    setContentChanged
  );

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

  return (
    <Layout>
      <Link className="inline-block mb-4" href="/">
        <ArrowLeftIcon className="h-6 w-6" />
      </Link>
      {contentChanged && (
        <div className="bg-yellow-200 p-4 mb-4">
          <p className="text-yellow-700">
            Content has changed. Don&apos;t forget to save!{" "}
          </p>
        </div>
      )}
      {Object.keys(articleContent).map((key) => (
        <AccordionItem
          id={key}
          key={`${key}-container`}
          title={toTitleCase(key)}
        />
      ))}
    </Layout>
  );
}
