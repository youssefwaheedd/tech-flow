/* eslint-disable no-unused-vars */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    const response = await fetch(`https://api.edenai.run/v2/text/generation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EDENAI_API_KEY}`,
      },
      body: JSON.stringify({
        providers: "cohere",
        text: `Tell me a story about cristiano ronaldo`,
        temperature: 0.2,
        max_tokens: 250,
      }),
    });

    const data = await response.json();

    const aiAnswer = data;
    return NextResponse.json({ aiAnswer });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message });
  }
}
