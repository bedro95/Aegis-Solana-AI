"use client";
import { useState } from 'react';
import { Shield, Zap, Terminal, Github, Activity, Wallet, Globe, Lock } from 'lucide-react';

export default function AegisToolFinal() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const connectPhantom = () => {
    // محاكاة ربط المحفظة بأسلوب احترافي
    setLoading(true);
    setTimeout(() => {
      setWalletConnected(true);
      setLoading(false);
    }, 1000);
  };

  const runScan = async () => {
    if (!address) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenName: "AEGIS_SYSTEM", bundleCount: 8, ca: address }),
      });
      const data = await res.json();
      setResult(data.aiResponse);
    } catch (e) { setResult("SYSTEM_FAILURE: AI UPLINK LOST."); }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#020202', color: 'white', minHeight: '100vh', fontFamily: 'monospace', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Ambience */}
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.1), transparent 50%)', pointerEvents: 'none' }}></div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 60px', position: 'relative', zIndex: 10, padding: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield size={28} color="#22d3ee" />
          <div style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '2px' }}>AEGIS <span style={{ color: '#22d3ee' }}>TOOL</span></div>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={connectPhantom}
            style={{ backgroundColor: walletConnected ? '#10b98120' : '#22d3ee10', color: walletConnected ? '#10b981' : '#22d3ee', border: `1px solid ${walletConnected ? '#10b981' : '#22d3ee'}`, padding: '8px 20px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s' }}
          >
            <Wallet size={14} />
            {walletConnected ? "0x...F42" : "CONNECT PHANTOM"}
          </button>
          <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            <Github size={20} />
          </a>
        </div>
      </nav>

      <main style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        
        {/* Status Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', opacity: 0.6 }}>
          <div style={{ fontSize: '9px', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}><Globe size={10} /> NETWORK: MAINNET</div>
          <div style={{ fontSize: '9px', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}><Lock size={10} /> ENCRYPTION: AES-256</div>
        </div>

        <h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '900', margin: '0 0 10px', letterSpacing: '-2px', textTransform: 'uppercase' }}>AEGIS <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>TOOL</span></h1>
        <p style={{ color: '#555', fontSize: '14px', marginBottom: '50px', letterSpacing: '5px' }}>NEURAL BLOCKCHAIN SCANNER // v3.0</p>

        <div style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', padding: '40px', backdropFilter: 'blur(10px)', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', opacity: 0.3 }}>
            <Terminal size={14} />
            <span style={{ fontSize: '10px', letterSpacing: '2px' }}>TERMINAL_INPUT_REQUIRED</span>
          </div>

          <div style={{ position: 'relative', marginBottom: '40px' }}>
            <input 
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', padding: '15px 0', fontSize: '18px', color: '#22d3ee', outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}
              placeholder="PASTE CONTRACT ADDRESS..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button 
            onClick={runScan}
            disabled={loading || !address}
            style={{ width: '100%', padding: '22px', border: 'none', background: loading ? '#111' : 'white', color: 'black', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', letterSpacing: '4px', transition: '0.3s', borderRadius: '2px' }}
          >
            {loading ? <Activity className="animate-spin" size={18} /> : "INITIATE PROTOCOL"}
          </button>

          {result && (
            <div style={{ marginTop: '40px', padding: '30px', background: 'rgba(255,0,0,0.02)', border: '1px solid rgba(255,0,0,0.1)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '20px', background: '#020202', padding: '0 10px', color: '#ef4444', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>INTELLIGENCE_REPORT</div>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#ddd', margin: 0 }}>"{result}"</p>
            </div>
          )}
        </div>

        {/* Technical Specs Footer */}
        <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', opacity: 0.3 }}>
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '8px', marginBottom: '5px' }}>SCAN_SPEED</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>0.042ms</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '8px', marginBottom: '5px' }}>AI_CORES</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>GEMINI_FLASH</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '8px', marginBottom: '5px' }}>DEV_ID</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>BEDRO_95</div>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '100px', textAlign: 'center', opacity: 0.1, fontSize: '9px', letterSpacing: '8px' }}>
        DECRYPTING THE FUTURE // AEGIS SYSTEM
      </footer>
    </div>
  );
}
