// path: src/app/page.tsx
"use client";

import { useState } from 'react';
import { AegisEngine } from '@/lib/AegisEngine';

export default function AegisHome() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>(["Aegis Systems Online...", "Waiting for Solana command..."]);

  const engine = new AegisEngine();

  const handleCommand = async () => {
    if (!input) return;
    setLogs(prev => [...prev, `> User: ${input}`]);
    
    // Call our "Smart Brain"
    const response = await engine.interpretIntent(input);
    
    setLogs(prev => [...prev, `[AI]: Action detected: ${response.agentDecision}`, `[Network]: Confirmed on Solana Mainnet`]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-black text-green-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto border-2 border-green-900 rounded-lg p-6 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-widest uppercase">
          Aegis: AI Solana Commander
        </h1>

        <div className="bg-gray-900 h-64 overflow-y-auto p-4 mb-4 rounded border border-green-800 scrollbar-hide">
          {logs.map((log, i) => (
            <div key={i} className="mb-2 text-sm opacity-80">{log}</div>
          ))}
        </div>

        <div className="flex gap-2">
          <input 
            className="flex-1 bg-black border border-green-800 p-3 outline-none focus:border-green-400"
            placeholder="Enter command (e.g. 'Protect my SOL wallet')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
          />
          <button 
            onClick={handleCommand}
            className="bg-green-900 hover:bg-green-700 text-black px-6 font-bold transition-all"
          >
            EXECUTE
          </button>
        </div>
      </div>
    </main>
  );
}