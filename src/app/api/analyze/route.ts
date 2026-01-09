import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// استدعاء المفتاح من ملف .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { bundleCount, tokenName } = await req.json();

    // إعداد نموذج Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are "Aegis Rogue Radar", a savage security AI expert on Solana. 
      Your tone is sarcastic, witty, and elite British English.
      Analyze the following data for a token on Pump.fun:
      - Token Name: ${tokenName}
      - Bundled Wallets detected: ${bundleCount}

      Instructions:
      1. If bundleCount > 8: Label the dev "The Puppet Master 🎭" and roast him for trying to control the whole supply.
      2. If bundleCount 4-7: Label him "A Greedy Jeeter 🤡" and warn people he might dump soon.
      3. If bundleCount < 3: Label him "Potential Chad 🗿" but stay skeptical.
      
      Keep the response short (under 50 words) and very viral. Start with "Listen up, Anon...".
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ aiResponse: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gemini is sleeping right now." }, { status: 500 });
  }
}
