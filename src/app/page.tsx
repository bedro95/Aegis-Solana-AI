"use client";
import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

// --- المكونات الداخلية (Components) ---

// مكون بطاقة الرادار
const RogueRadar = ({ data, aiResponse }: any) => {
  const shareOnX = () => {
    const text = `🕵️ Aegis Rogue Radar Scan Report:\n\n"${aiResponse}"\n\nBundled Wallets: ${data.bundleCount}\n\nScan with Aegis AI! 🛡️`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden bg-black border-2 border-red-600 rounded-3xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.2)] mt-10">
      {/* تأثير نبض الرادار */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-red-900/30 rounded-full animate-ping" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] bg-red-600/40 animate-spin-slow origin-left" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-red-600 font-black text-3xl tracking-tighter italic leading-none">AEGIS RADAR</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Threat Assessment Active</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-600/50 rounded-full">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-red-500 text-[10px] font-black uppercase">Live Scan</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Bundled Wallets</p>
            <p className="text-4xl font-mono font-black text-white">{data.bundleCount}</p>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Threat Level</p>
            <p className={`text-xl font-black ${data.bundleCount > 5 ? 'text-red-600' : 'text-green-500'}`}>
              {data.bundleCount > 8 ? 'CRITICAL' : data.bundleCount > 4 ? 'WARNING' : 'STABLE'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-950/40 to-black p-6 rounded-2xl border-l-4 border-red-600 mb-8 shadow-inner">
          <p className="text-red-100 text-sm italic font-medium leading-relaxed font-serif">
            "{aiResponse}"
          </p>
        </div>

        <button 
          onClick={shareOnX}
          className="w-full bg-white text-black hover:bg-red-600 hover:text-white font-black py-4 rounded-2xl transition-all duration-500 uppercase tracking-widest text-sm shadow-xl transform hover:-translate-y-1"
        >
          Roast this Dev on X
        </button>
      </div>
    </div>
  );
};

// --- الصفحة الرئيسية (Main Page) ---

export default function AegisPage() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const performScan = async () => {
    if (!address) return;
    setLoading(true);
    setError('');
    
    try {
      // 1. منطق سحب بيانات البلوكشين مباشرة
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const mint = new PublicKey(address);
      const signatures = await connection.getSignaturesForAddress(mint, { limit: 20 });
      const firstTxTime = signatures[signatures.length - 1].blockTime;
      
      const txDetails = await connection.getParsedTransactions(
        signatures.map(s => s.signature), 
        { maxSupportedTransactionVersion: 0 }
      );

      let bundleCount = 0;
      txDetails.forEach(tx => {
        if (tx?.blockTime && firstTxTime && (tx.blockTime - firstTxTime) < 10) {
          bundleCount++;
        }
      });

      // 2. إرسال البيانات للذكاء الاصطناعي
      const aiRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundleCount, tokenName: "The Target" })
      });
      const aiData = await aiRes.json();

      setResult({ bundleCount, aiResponse: aiData.aiResponse });
    } catch (err) {
      setError('Invalid Address or Network Error. Check if it is a Pump.fun mint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white">
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <main className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1 border border-red-900/50 rounded-full bg-red-950/10 text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            Solana AI Security Protocol
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter italic">
            AEGIS <span className="text-red-600">AI</span>
          </h1>
          <p className="text-zinc-500 max-w-md mx-auto font-medium text-sm">
            Detecting "Puppet Master" bundles and predatory dev behavior on Pump.fun in real-time.
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3 p-2 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-[2rem] shadow-2xl">
          <input
            type="text"
            placeholder="Enter Token Mint Address (CA)..."
            className="flex-1 bg-transparent px-6 py-4 outline-none font-mono text-sm text-red-500 placeholder:text-zinc-600"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={performScan}
            disabled={loading}
            className="bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-white font-black px-10 py-4 rounded-[1.5rem] transition-all duration-300 uppercase text-xs tracking-widest shadow-lg shadow-red-900/20"
          >
            {loading ? 'Analyzing...' : 'Execute Scan'}
          </button>
        </div>

        {/* Results */}
        {error && <p className="mt-6 text-red-500 font-mono text-xs uppercase tracking-widest">{error}</p>}
        
        {result && (
          <div className="w-full animate-in fade-in zoom-in duration-1000">
            <RogueRadar data={result} aiResponse={result.aiResponse} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-6 w-full text-center">
        <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.5em]">Powered by Aegis AI Protocol & Solana</p>
      </footer>
    </div>
  );
}
