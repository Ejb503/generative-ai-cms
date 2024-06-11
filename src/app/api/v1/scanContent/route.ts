import { CONTENT_DIR } from "@/app/const/api";
import fs from "fs";
import path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

async function getDirectories(): Promise<string[]> {
  const filePath = path.resolve(CONTENT_DIR);
  try {
    const filesAndDirectories = await readdir(filePath);
    const directoryCheckPromises = filesAndDirectories.map(async (file) => {
      const isDirectory = await stat(path.join(filePath, file)).then((stats) =>
        stats.isDirectory()
      );
      return isDirectory ? file : null;
    });
    const directories = (await Promise.all(directoryCheckPromises)).filter(
      Boolean
    ) as string[];
    return directories;
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return [];
  }
}

export async function GET(): Promise<Response> {
  try {
    const result = await getDirectories();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
