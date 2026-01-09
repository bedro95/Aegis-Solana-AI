"use client";
import React from 'react';

export default function RogueRadar({ data, aiResponse, tokenName }: any) {
  const shareOnX = () => {
    const text = `🕵️ Aegis Rogue Radar Scan: ${tokenName}\n\n"${aiResponse}"\n\nScan your gems with Aegis AI! 🛡️`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden bg-black border-2 border-red-600 rounded-2xl p-6 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
      {/* Radar Animation Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-red-500 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-red-500 animate-spin-slow origin-center" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-red-500 font-black text-2xl tracking-tighter italic">AEGIS RADAR</h2>
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zinc-900/80 p-4 rounded-xl border border-red-900/50">
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Wallets Bundled</p>
            <p className="text-3xl font-mono text-white">{data.bundleCount}</p>
          </div>
          <div className="bg-zinc-900/80 p-4 rounded-xl border border-red-900/50">
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Threat Level</p>
            <p className={`text-xl font-black ${data.bundleCount > 5 ? 'text-red-600' : 'text-green-500'}`}>
              {data.bundleCount > 8 ? 'CRITICAL' : data.bundleCount > 4 ? 'WARNING' : 'STABLE'}
            </p>
          </div>
        </div>

        <div className="bg-red-950/20 p-4 rounded-xl border-l-4 border-red-600 mb-6 backdrop-blur-sm">
          <p className="text-red-100 text-sm italic font-medium leading-relaxed">
            "{aiResponse || "Scanning the blockchain for sins..."}"
          </p>
        </div>

        <button 
          onClick={shareOnX}
          className="w-full bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 rounded-xl transition-all duration-300 uppercase tracking-tighter"
        >
          Roast this Dev on X
        </button>
      </div>
    </div>
  );
}
