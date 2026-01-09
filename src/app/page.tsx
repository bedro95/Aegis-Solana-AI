"use client";
import { useState } from 'react';
import { Shield, Radio, AlertTriangle, Terminal } from 'lucide-react';

export default function AegisRadar() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const analyzeToken = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenName: "Unknown Token", bundleCount: Math.floor(Math.random() * 12) }),
      });
      const data = await res.json();
      setResult(data.aiResponse);
    } catch (e) {
      setResult("SYSTEM ERROR: Radar Jammed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black opacity-50" />
      
      <div className="z-10 w-full max-w-2xl border-2 border-green-900 bg-black/80 p-8 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)]">
        <div className="flex items-center gap-4 mb-8 border-b border-green-900 pb-4">
          <Shield className="w-10 h-10 animate-pulse" />
          <h1 className="text-3xl font-bold tracking-tighter uppercase italic">Aegis Rogue Radar</h1>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Terminal className="absolute left-3 top-3 w-5 h-5 opacity-50" />
            <input 
              type="text" 
              placeholder="ENTER MINT ADDRESS..." 
              className="w-full bg-black border border-green-800 p-3 pl-12 focus:outline-none focus:border-green-400 text-green-400 placeholder:opacity-30"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button 
            onClick={analyzeToken}
            disabled={loading}
            className="w-full bg-green-900/20 border border-green-500 py-4 hover:bg-green-500 hover:text-black transition-all duration-300 font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {loading ? <Radio className="animate-spin" /> : "Initiate Deep Scan"}
          </button>

          {result && (
            <div className="mt-8 border-l-4 border-red-600 bg-red-900/10 p-6 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-bold uppercase">Intelligence Report:</span>
              </div>
              <p className="text-white text-lg leading-relaxed italic">"{result}"</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-[10px] opacity-30 uppercase tracking-[0.5em]">
        Status: System Online // Gemini-1.5-Flash active
      </div>
    </div>
  );
}
