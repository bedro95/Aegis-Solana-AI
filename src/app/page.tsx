// path: src/app/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { AegisEngine } from '@/lib/AegisEngine';

export default function AegisDashboard() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>(["[SYSTEM]: Core Initialized", "[NETWORK]: Connected to Solana Mainnet"]);
  const [price, setPrice] = useState<string>("Loading...");
  const engine = new AegisEngine();

  useEffect(() => {
    const fetchPrice = async () => {
      const p = await engine.getLivePrice();
      setPrice(`$${p}`);
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const handleCommand = async () => {
    if (!input) return;
    
    // إظهار أمر المستخدم
    setLogs(prev => [...prev, `> USER: ${input.toUpperCase()}`]);
    
    // تشغيل "المخ" فعلياً
    const result = await engine.executeAICommand(input);
    
    // إظهار رد "المخ" الحقيقي
    setLogs(prev => [...prev, `[AEGIS]: ${result.message}`]);
    
    setInput("");
  };
  return (
    <main className="min-h-screen bg-[#050505] text-[#00ff41] p-6 font-mono selection:bg-[#00ff41] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Dashboard Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-[#00ff41]/30 bg-black/50 p-4 rounded shadow-[0_0_10px_rgba(0,255,0,0.1)]">
            <p className="text-xs text-gray-500 uppercase">SOL/USD Price</p>
            <p className="text-2xl font-bold tracking-tighter text-white">{price}</p>
          </div>
          <div className="border border-[#00ff41]/30 bg-black/50 p-4 rounded animate-pulse">
            <p className="text-xs text-gray-500 uppercase">Network Status</p>
            <p className="text-2xl font-bold tracking-tighter">OPERATIONAL</p>
          </div>
          <div className="border border-[#00ff41]/30 bg-black/50 p-4 rounded">
            <p className="text-xs text-gray-500 uppercase">Security Level</p>
            <p className="text-2xl font-bold tracking-tighter text-blue-500">AEGIS-LEVEL 1</p>
          </div>
        </div>

        {/* Main Terminal Area */}
        <div className="border border-[#00ff41]/50 rounded-lg overflow-hidden flex flex-col h-[600px] bg-black shadow-[0_0_30px_rgba(0,255,0,0.05)]">
          <div className="bg-[#00ff41]/10 p-2 border-b border-[#00ff41]/20 flex justify-between items-center">
            <span className="text-xs font-bold tracking-widest uppercase">Aegis Intelligence Console v1.0</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-hide bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,3px_100%]">
            {logs.map((log, i) => (
              <div key={i} className="text-sm border-l-2 border-[#00ff41]/20 pl-3 leading-relaxed">
                <span className="opacity-50 text-[10px] mr-2">
  [{new Date().toLocaleTimeString('en-GB', { hour12: false })}]
</span>
                {log}
              </div>
            ))}
          </div>

          <div className="p-4 bg-black border-t border-[#00ff41]/20">
            <div className="flex gap-4">
              <span className="text-[#00ff41] font-bold mt-2">❯</span>
              <input 
                className="flex-1 bg-transparent border-none outline-none text-[#00ff41] placeholder-[#00ff41]/30 text-lg"
                placeholder="INPUT COMMAND..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}