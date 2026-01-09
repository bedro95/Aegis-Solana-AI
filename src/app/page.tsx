"use client";
import { useState, useEffect } from 'react';
import { AegisEngine } from '@/lib/AegisEngine';
// استيراد أدوات المحفظة
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function AegisDashboard() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>(["[SYSTEM]: Core Initialized", "[NETWORK]: Connected to Solana"]);
  const [price, setPrice] = useState<string>("Loading...");
  
  // استخدام بيانات المحفظة
  const { publicKey, connected } = useWallet();
  const engine = new AegisEngine();

  useEffect(() => {
    const fetchPrice = async () => {
      const p = await engine.getLivePrice();
      setPrice(`$${p}`);
    };
    fetchPrice();
  }, []);

  const handleCommand = async () => {
    if (!input) return;
    setLogs(prev => [...prev, `> USER: ${input.toUpperCase()}`]);
    const result = await engine.executeAICommand(input);
    setLogs(prev => [...prev, `[AEGIS]: ${result.message}`]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#00ff41] p-6 font-mono">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* هدا هو الـ Header المحدث: يحتوي على الاسم وزر المحفظة */}
        <div className="flex justify-between items-center border-b border-[#00ff41]/20 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">AEGIS COMMANDER</h1>
            <p className="text-[10px] opacity-50 underline">SECURE AI INTERFACE v1.0</p>
          </div>
          {/* زر المحفظة يظهر هنا في أقصى اليمين */}
          <WalletMultiButton className="!bg-[#00ff41] !text-black !rounded-none !font-mono !text-xs" />
        </div>

        {/* مربعات البيانات الثلاثة كما هي */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-[#00ff41]/30 bg-black/50 p-4 rounded shadow-[0_0_10px_rgba(0,255,0,0.1)]">
            <p className="text-xs text-gray-500 uppercase">SOL/USD Price</p>
            <p className="text-2xl font-bold text-white">{price}</p>
          </div>
          <div className="border border-[#00ff41]/30 bg-black/50 p-4 rounded">
            <p className="text-xs text-gray-500 uppercase">Wallet Status</p>
            <p className={`text-2xl font-bold ${connected ? 'text-green-400' : 'text-red-500'}`}>
              {connected ? 'CONNECTED' : 'DISCONNECTED'}
            </p>
          </div>
          <div className="border border-[#00ff41]/30 bg-black/50 p-4 rounded">
            <p className="text-xs text-gray-500 uppercase">Security Level</p>
            <p className="text-2xl font-bold text-blue-500 font-mono italic">AEGIS-L1</p>
          </div>
        </div>

        {/* الترمنال كما هو */}
        <div className="border border-[#00ff41]/50 rounded-lg overflow-hidden flex flex-col h-[500px] bg-black shadow-[0_0_30px_rgba(0,255,0,0.05)]">
            <div className="bg-[#00ff41]/10 p-2 border-b border-[#00ff41]/20 flex justify-between">
                <span className="text-xs font-bold uppercase">Intelligence Console</span>
                <span className="text-[10px] text-white/50">{connected ? `ID: ${publicKey?.toBase58().slice(0,6)}...` : 'ID: UNAUTHORIZED'}</span>
            </div>
            {/* ... باقي كود الـ logs و input المدخلات ... */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {logs.map((log, i) => (
                    <div key={i} className="text-sm border-l-2 border-[#00ff41]/20 pl-3">
                        <span className="opacity-50 text-[10px] mr-2">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
                        {log}
                    </div>
                ))}
            </div>
            <div className="p-4 bg-black border-t border-[#00ff41]/20 flex gap-4">
                <span className="text-[#00ff41] font-bold">❯</span>
                <input 
                    className="flex-1 bg-transparent border-none outline-none text-[#00ff41]" 
                    placeholder="ENTER COMMAND..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
                />
            </div>
        </div>
      </div>
    </main>
  );
}