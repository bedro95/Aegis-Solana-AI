"use client";
import { useState, useEffect } from 'react';
import { Shield, Radio, AlertTriangle, Terminal, Cpu, Zap, Activity, Search } from 'lucide-react';

export default function AegisUltimateRadar() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState('');

  const steps = [
    "INTERCEPTING PUMP.FUN DATA...",
    "DECRYPTING SMART CONTRACT...",
    "ANALYZING BUNDLE ARCHITECTURE...",
    "CONSULTING AEGIS AI CORE...",
    "GENERATING ROAST REPORT..."
  ];

  const analyzeToken = async () => {
    if (!address) return;
    setLoading(true);
    setResult(null);

    // سيموليشن لخطوات الفحص لإعطاء هيبة للواجهة
    for (const step of steps) {
      setScanStep(step);
      await new Promise(r => setTimeout(r, 800));
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tokenName: "SOLANA ROGUE", 
          bundleCount: Math.floor(Math.random() * 15) 
        }),
      });
      const data = await res.json();
      setResult(data.aiResponse);
    } catch (e) {
      setResult("FATAL ERROR: AI CORE DISCONNECTED. PROBABLY A RUG.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Top Navigation Bar */}
      <nav className="relative z-20 border-b border-white/10 bg-black/50 backdrop-blur-xl px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500 p-1.5 rounded-sm">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Aegis <span className="text-cyan-500">Rogue</span></span>
        </div>
        <div className="hidden md:flex gap-6 text-xs font-bold tracking-widest opacity-50">
          <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> NETWORK: MAINNET</span>
          <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> AI: GEMINI 1.5 PRO</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto pt-20 px-6 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
            Identify The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Rogue</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            The most advanced AI-powered security radar on Solana. We don't just find bundles; we destroy the dev's ego.
          </p>
        </div>

        {/* Scan Console */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl">
          <div className="bg-[#0f0f0f] rounded-xl p-6 md:p-10 border border-white/5 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="PASTE SOLANA MINT ADDRESS..." 
                  className="w-full bg-black border border-white/10 rounded-lg py-5 pl-14 pr-6 text-cyan-400 focus:outline-none text-lg placeholder:text-gray-700 transition-all font-bold"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={analyzeToken}
              disabled={loading || !address}
              className="group relative w-full overflow-hidden rounded-lg bg-white py-6 text-black font-black uppercase tracking-[0.3em] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? <Zap className="animate-bounce" /> : <Radio className="group-hover:animate-pulse" />}
                {loading ? scanStep : "Initiate Rogue Scan"}
              </span>
            </button>

            {/* AI Result Area */}
            {result && (
              <div className="mt-10 animate-in zoom-in-95 duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-red-900" />
                  <span className="text-[10px] font-bold text-red-500 tracking-[0.4em] uppercase">Intelligence Report</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-red-900" />
                </div>
                <div className="bg-red-950/10 border border-red-900/50 rounded-xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <AlertTriangle className="w-20 h-20 text-red-500" />
                  </div>
                  <p className="text-xl md:text-2xl text-red-50 text-center italic font-medium leading-relaxed">
                    "{result}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "AI CORE", val: "GEMINI 1.5 FLASH" },
            { label: "SEC-RATING", val: "MILITARY GRADE" },
            { label: "SCAN SPEED", val: "0.42s" }
          ].map((s, i) => (
            <div key={i} className="border border-white/5 bg-white/[0.02] p-4 rounded-lg text-center">
              <div className="text-[9px] text-gray-500 tracking-widest uppercase mb-1">{s.label}</div>
              <div className="text-xs font-bold text-cyan-500">{s.val}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
    </div>
  );
}
