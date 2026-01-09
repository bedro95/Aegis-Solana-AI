import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { tokenName, bundleCount, ca } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are AEGIS AI, a brutal and elite Solana blockchain security analyst. 
      Analyze this token: ${tokenName} with Mint Address (CA): ${ca}.
      Information found: The developer has bundled ${bundleCount} wallets.
      
      Your Task:
      1. Give a high-speed technical roast of the developer for bundling.
      2. Rate the rug-pull risk from 1% to 100%.
      3. Use a futuristic, aggressive, and "hacker" tone.
      4. Keep it short (max 3 sentences) and extremely professional yet toxic.
      
      Style: "CRITICAL BREACH DETECTED: [Your Analysis]"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ aiResponse: text });
  } catch (error) {
    return NextResponse.json({ aiResponse: "AI CORE OFFLINE: Access Denied." }, { status: 500 });
  }
}
