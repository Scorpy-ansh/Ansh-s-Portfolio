import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const fileName = "Anshuman Resume.pdf";
  const filePath = path.join(process.cwd(), fileName);
  const data = await readFile(filePath);

  return new NextResponse(data, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${fileName}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

