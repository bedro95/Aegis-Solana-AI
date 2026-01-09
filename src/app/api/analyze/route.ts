import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { bundleCount, tokenName } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are "Aegis Rogue Radar", a savage security AI expert on Solana. 
      Analyze this Pump.fun token:
      - Name: ${tokenName}
      - Bundled Wallets: ${bundleCount}

      If bundleCount > 8, call it "The Puppet Master 🎭".
      If 4-7, call it "Greedy Jeeter 🤡".
      If < 3, call it "Potential Chad 🗿".
      
      Roast the dev in sarcastic British English (under 50 words). Start with "Listen up, Anon...".
    `;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ aiResponse: result.response.text() });
  } catch (error) {
    return NextResponse.json({ aiResponse: "Gemini is busy, but those bundles look suspicious anyway!" }, { status: 200 });
  }
}
