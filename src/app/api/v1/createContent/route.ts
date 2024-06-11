import { CONTENT_DIR } from "@/app/const/api";
import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";
import util from "util";

const mkdir = util.promisify(fs.mkdir);

async function createDirectory(folderName: string): Promise<boolean> {
  const filePath = path.resolve(CONTENT_DIR, folderName);
  try {
    await mkdir(filePath);
    return true;
  } catch (error) {
    console.error(`Error creating directory: ${error}`);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { folderName } = await request.json();
    const result = await createDirectory(folderName);
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
