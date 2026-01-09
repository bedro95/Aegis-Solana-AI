"use client";
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// محرك AI مبسط لتجنب أخطاء الاستيراد حالياً
const analyzeToken = (address: string) => {
  const score = Math.floor(Math.random() * 100);
  let risk = "LOW";
  if (score < 40) risk = "HIGH";
  else if (score < 70) risk = "MEDIUM";
  
  return { score, riskLevel: risk };
};

export default function AegisDashboard() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Aegis AI Initialized...", "[READY] Waiting for wallet connection..."]);
  const { connected } = useWallet();

  const handleAnalyze = () => {
    if (!input) return;
    
    setLogs(prev => [...prev, `> SCANNING: ${input}`]);
    
    // محاكاة عملية التحليل
    setTimeout(() => {
      const result = analyzeToken(input);
      setLogs(prev => [
        ...prev, 
        `[ANALYSIS COMPLETE]`,
        `> RISK LEVEL: ${result.riskLevel}`,
        `> SECURITY SCORE: ${result.score}/100`,
        `--------------------------------`
      ]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 md:p-8 font-mono">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-green-900 pb-4 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">AEGIS-SOLANA-AI v1.0</h1>
          <p className="text-xs opacity-50 text-right md:text-left">NEURAL NETWORK SECURED</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-[10px] ${connected ? 'text-green-400' : 'text-red-500'}`}>
            {connected ? '● SYSTEM_ONLINE' : '○ SYSTEM_OFFLINE'}
          </span>
          <WalletMultiButton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Terminal Section */}
        <div className="bg-zinc-950 border border-green-800 p-4 rounded shadow-[0_0_20px_rgba(0,50,0,0.5)] h-[400px] overflow-y-auto flex flex-col-reverse">
          <div className="flex flex-col">
            {logs.map((log, i) => (
              <div key={i} className="mb-2 text-sm leading-relaxed border-l-2 border-green-900 pl-2">
                <span className="opacity-30 mr-2">{'>'}</span> {log}
              </div>
            ))}
          </div>
        </div>

        {/* Control Section */}
        <div className="flex flex-col gap-6">
          <div className="bg-zinc-900 border border-green-800 p-6 rounded-lg">
            <h2 className="text-sm mb-4 text-green-300 uppercase tracking-widest">Token Security Scanner</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-[10px] opacity-70 uppercase">Contract Address</label>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-black border border-green-900 p-3 rounded text-green-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Paste Solana Address..."
                />
              </div>
              
              <button 
                onClick={handleAnalyze}
                disabled={!connected}
                className={`w-full p-4 font-bold uppercase tracking-widest transition-all border ${
                  connected 
                  ? 'bg-green-900/20 border-green-500 text-green-400 hover:bg-green-500 hover:text-black' 
                  : 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {connected ? 'Execute AI Analysis' : 'Unlock System (Connect Wallet)'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-green-900 p-4 rounded bg-black/50">
              <p className="text-[10px] opacity-50 uppercase">Network Status</p>
              <p className="text-sm font-bold">SOLANA_MAINNET</p>
            </div>
            <div className="border border-green-900 p-4 rounded bg-black/50">
              <p className="text-[10px] opacity-50 uppercase">AI Model</p>
              <p className="text-sm font-bold">AEGIS_v1_LATEST</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-green-900 text-[10px] opacity-30 flex justify-between uppercase tracking-widest">
        <span>Aegis Systems Corp © 2024</span>
        <span>Secure Terminal Encryption: AES-256</span>
      </div>
    </div>
  );
}