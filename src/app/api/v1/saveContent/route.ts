import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

interface RequestBody {
  id: string;
  content: string;
  field: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();
  const { id, content, field } = body;
  const filePath = path.join(process.cwd(), "content", `${id}/${field}.json`);
  fs.writeFileSync(filePath, JSON.stringify(content));
  return new Response(
    JSON.stringify({ message: "Content saved successfully" }),
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-transform",
      },
    }
  );
}
