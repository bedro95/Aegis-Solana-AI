import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // تأكد من وجود المفتاح في ملف .env
});

export async function POST(req: Request) {
  try {
    const { bundleCount, tokenName } = await req.json();

    const systemPrompt = `
      You are "Aegis Rogue Radar", a savage security AI expert on Solana. 
      Your tone is sarcastic, witty, and elite English.
      Analyze the following data for a token on Pump.fun:
      - Token Name: ${tokenName}
      - Bundled Wallets detected: ${bundleCount}

      Instructions:
      1. If bundleCount > 8: Label the dev "The Puppet Master 🎭" and roast him for trying to control the whole supply.
      2. If bundleCount 4-7: Label him "A Greedy Jeeter 🤡" and warn people he might dump soon.
      3. If bundleCount < 3: Label him "Potential Chad 🗿" but stay skeptical.
      Keep the response under 60 words. Speak to the user as "Anon".
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // أو gpt-3.5-turbo
      messages: [{ role: "system", content: systemPrompt }],
      temperature: 0.8,
    });

    return NextResponse.json({ 
      aiResponse: response.choices[0].message.content 
    });
  } catch (error) {
    return NextResponse.json({ error: "AI Refused to cooperate." }, { status: 500 });
  }
}
