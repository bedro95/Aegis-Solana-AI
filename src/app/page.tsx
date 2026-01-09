"use client";
import { useState, useEffect } from 'react';
import { Shield, Radio, Terminal, Cpu, Zap, Activity, Search, Globe, Github, ChevronRight, Layers, Eye } from 'lucide-react';

export default function AegisMasterpiece() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // تأثير تتبع الماوس للإضاءة الخلفية
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const runScan = async () => {
    if (!address) return;
    setLoading(true);
    setResult(null);
    
    // محاكاة تأخير تقني لإعطاء هيبة للعملية
    await new Promise(r => setTimeout(r, 2500));

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenName: "AEGIS_CORE", bundleCount: 9 }),
      });
      const data = await res.json();
      setResult(data.aiResponse);
    } catch (e) {
      setResult("SYSTEM_FAILURE: AI UPLINK BROKEN.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      
      {/* Dynamic Interactive Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.05), transparent 80%)`
        }}
      />

      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Futuristic Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-10 py-8 backdrop-blur-md">
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-10 h-10 text-cyan-400 relative z-10 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-[ -0.05em] uppercase leading-none">
              Aegis <span className="text-cyan-500 italic">Rogue</span>
            </span>
            <span className="text-[9px] tracking-[0.6em] opacity-40 uppercase font-bold">Protocol v3.0.1</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex gap-10 text-[10px] font-black tracking-[0.3em] opacity-30 uppercase">
            <span className="hover:opacity-100 transition-opacity cursor-crosshair">Network: Solana Mainnet</span>
            <span className="hover:opacity-100 transition-opacity cursor-crosshair">Status: Scanning Active</span>
          </div>
          {/* GitHub Button - Bedro95 */}
          <a 
            href="https://github.com/bedro95" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500"
          >
            <Github className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
            <span className="text-xs font-bold tracking-widest uppercase">Dev: Bedro95</span>
          </a>
        </div>
      </nav>

      <main className="relative z-40 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 pt-16">
        
        {/* Left Side: Branding & Stats */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-cyan-500/20 bg-cyan-500/5 rounded-full">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase italic">Neural Network Linked</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic">
              God <br /> <span className="text-transparent bg-clip-text bg-gradient-to-t from-cyan-600 via-cyan-300 to-white">Eye</span>
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md italic">
              The ultimate truth in a world of rugs. Powered by Gemini 1.5 Pro, Aegis dissects Solana contracts with military precision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Scans/Hour", val: "142,093" },
              { label: "Threats Identified", val: "89.4%" }
            ].map((s, i) => (
              <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="text-[9px] text-gray-600 tracking-[0.3em] uppercase mb-2">{s.label}</div>
                <div className="text-2xl font-black text-cyan-500">{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Console */}
        <div className="lg:col-span-7 relative">
          <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full" />
          <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[32px] p-1 shadow-2xl overflow-hidden">
            <div className="bg-[#121212] rounded-[30px] p-8 md:p-12 space-y-10">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-500/10 p-2 rounded-lg"><Terminal className="w-5 h-5 text-cyan-500" /></div>
                  <span className="text-xs font-bold tracking-[0.2em] opacity-40 uppercase italic">Aegis Terminal Input</span>
                </div>
                <div className="text-[10px] text-cyan-500/50 font-mono tracking-tighter">00:00:FF:A2</div>
              </div>

              <div className="group relative">
                <input 
                  type="text" 
                  placeholder="CONTRACT ADDRESS (CA)..." 
                  className="w-full bg-transparent border-b-2 border-white/10 py-6 text-2xl md:text-4xl font-black text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-white/5 uppercase italic"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button 
                onClick={runScan}
                disabled={loading || !address}
                className="relative w-full py-8 group overflow-hidden rounded-2xl bg-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-black font-black uppercase tracking-[0.5em] text-lg flex items-center justify-center gap-4">
                  {loading ? <Activity className="animate-spin" /> : <Zap className="group-hover:animate-bounce" />}
                  {loading ? "Decrypting..." : "Execute Scan"}
                </span>
              </button>

              {result && (
                <div className="animate-in slide-in-from-bottom-10 duration-700">
                  <div className="bg-red-500/5 border-l-4 border-red-500 p-8 rounded-r-2xl space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-black text-xs tracking-widest uppercase">
                      <AlertTriangle className="w-4 h-4" /> Final Intel Report
                    </div>
                    <p className="text-xl md:text-2xl font-medium text-red-50 italic leading-relaxed">
                      "{result}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Extreme Footer */}
      <footer className="fixed bottom-10 left-10 z-50 flex items-center gap-4 opacity-20 hover:opacity-100 transition-opacity cursor-none">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full animate-pulse" />)}
        </div>
        <span className="text-[8px] font-black tracking-[0.5em] uppercase">Secured by Gemini AI Architecture</span>
      </footer>
    </div>
  );
}
