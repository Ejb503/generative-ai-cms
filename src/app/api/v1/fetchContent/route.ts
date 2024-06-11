import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const field = searchParams.get("field");
  const id = searchParams.get("id");
  const dirPath = path.join(process.cwd(), "content", `${id}`);
  const filePath = path.join(dirPath, `${field}.json`);

  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({}), {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  const content = fs.readFileSync(filePath, "utf-8");

  return new Response(content, {
    status: 200,
    headers: {
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
