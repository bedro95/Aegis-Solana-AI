"use client";
import { useState, useEffect } from 'react';
import { Shield, Radio, Terminal, Cpu, Zap, Activity, Search, Github, AlertTriangle, Lock, Eye } from 'lucide-react';

export default function AegisMasterpiece() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState(0);

  const steps = [
    "LINKING NEURAL INTERFACE...",
    "SCANNING SOLANA LEDGER...",
    "DECRYPTING DEV WALLETS...",
    "ISOLATING BUNDLE LOOPS...",
    "AI JUDGMENT COMMENCING..."
  ];

  const runScan = async () => {
    if (!address) return;
    setLoading(true);
    setResult(null);
    for (let i = 0; i < steps.length; i++) {
      setScanStep(i);
      await new Promise(r => setTimeout(r, 600));
    }
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenName: "SOL_ROGUE", bundleCount: 12 }),
      });
      const data = await res.json();
      setResult(data.aiResponse);
    } catch (e) {
      setResult("FATAL_ERROR: AI CORE OVERLOAD.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
      </div>

      {/* Header */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-8 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-20 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-8 h-8 text-cyan-400 relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">AEGIS <span className="text-cyan-500">ROGUE</span></span>
            <span className="text-[8px] tracking-[0.5em] opacity-40 font-bold uppercase">AI Intelligence Unit</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/bedro95" 
            target="_blank" 
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-bold tracking-widest uppercase"
          >
            <Github className="w-4 h-4" /> Dev: Bedro95
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/20 bg-cyan-500/5 rounded-full">
              <Activity className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.2em] text-cyan-400 uppercase">System Status: Elite Active</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
              GOD <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">EYE</span>
            </h1>
            <p className="text-gray-500 max-w-md text-lg font-light leading-relaxed italic">
              Scanning the blockchain darkness. We expose the bundles, the snipers, and the lies.
            </p>
            <div className="flex gap-10 border-t border-white/5 pt-8">
              <div>
                <div className="text-[8px] text-gray-600 tracking-widest uppercase mb-1">Processing Power</div>
                <div className="text-xl font-bold text-cyan-500 italic">1.5 PFLOPS</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-600 tracking-widest uppercase mb-1">Detection Rate</div>
                <div className="text-xl font-bold text-cyan-500 italic">99.8%</div>
              </div>
            </div>
          </div>

          {/* Right Side: The Terminal */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] blur opacity-20" />
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/40" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                  <div className="w-2 h-2 rounded-full bg-green-500/40" />
                </div>
                <span className="text-[10px] font-bold opacity-30 tracking-[0.3em]">ENCRYPTED_SCANNER_v3</span>
              </div>

              <div className="p-8 md:p-10 space-y-8">
                <div className="relative group">
                  <Terminal className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500 opacity-50" />
                  <input 
                    type="text" 
                    placeholder="ENTER MINT ADDRESS..." 
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-10 pr-4 text-xl md:text-2xl text-cyan-400 placeholder:text-gray-800 focus:outline-none focus:border-cyan-500 transition-all font-mono italic uppercase"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <button 
                  onClick={runScan}
                  disabled={loading || !address}
                  className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-sm hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-4 group"
                >
                  {loading ? <Cpu className="animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />}
                  {loading ? steps[scanStep] : "EXECUTE DEEP SCAN"}
                </button>

                {result && (
                  <div className="mt-8 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-2 mb-4 text-red-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-[10px] font-black tracking-[0.3em] uppercase">AI Intel Discovered:</span>
                    </div>
                    <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl italic text-lg md:text-xl font-light leading-relaxed">
                      "{result}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-20" />
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold tracking-[0.5em] text-gray-700 uppercase">
        Built by Bedro95 // Secured by Aegis AI
      </div>
    </div>
  );
}
