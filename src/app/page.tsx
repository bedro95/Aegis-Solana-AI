"use client";
import { useState } from 'react';
import { Shield, Zap, Terminal, Github, Activity } from 'lucide-react';

export default function AegisFinal() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runScan = async () => {
    if (!address) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenName: "SOL_ROGUE", bundleCount: 5 }),
      });
      const data = await res.json();
      setResult(data.aiResponse);
    } catch (e) { setResult("SYSTEM ERROR."); }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#020202', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow Effect */}
      <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'rgba(6, 182, 212, 0.15)', filter: 'blur(100px)', borderRadius: '50%', z-index: 0 }}></div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Shield size={32} color="#22d3ee" />
          <div style={{ fontWeight: '900', fontSize: '24px', letterSpacing: '-1px' }}>AEGIS <span style={{ color: '#22d3ee' }}>ROGUE</span></div>
        </div>
        <a href="https://github.com/bedro95" target="_blank" style={{ color: 'white', textDecoration: 'none', fontSize: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)' }}>
          <Github size={16} /> Dev: Bedro95
        </a>
      </nav>

      <main style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '80px', fontWeight: '900', margin: '0 0 20px', fontStyle: 'italic', letterSpacing: '-4px', lineHeight: '0.9' }}>GOD EYE</h1>
        <p style={{ color: '#666', fontSize: '18px', marginBottom: '60px' }}>Advanced AI Blockchain Intelligence Unit</p>

        <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px' }}>
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <Terminal style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} size={20} />
            <input 
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #222', padding: '15px 15px 15px 50px', fontSize: '20px', color: '#22d3ee', outline: 'none' }}
              placeholder="ENTER MINT ADDRESS..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button 
            onClick={runScan}
            disabled={loading || !address}
            style={{ width: '100%', padding: '20px', borderRadius: '12px', border: 'none', background: loading ? '#222' : 'white', color: 'black', fontWeight: '900', cursor: 'pointer', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            {loading ? <Activity className="animate-spin" size={20} /> : <Zap size={20} />}
            {loading ? "SCANNING..." : "EXECUTE SCAN"}
          </button>

          {result && (
            <div style={{ marginTop: '40px', padding: '25px', background: 'rgba(220, 38, 38, 0.05)', borderLeft: '4px solid #dc2626', textAlign: 'left', fontStyle: 'italic' }}>
              <div style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '12px', marginBottom: '10px', letterSpacing: '1px' }}>AI REPORT:</div>
              <div style={{ fontSize: '18px', lineHeight: '1.6', color: '#eee' }}>"{result}"</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
