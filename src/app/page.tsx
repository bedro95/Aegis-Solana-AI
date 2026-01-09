"use client";
import { useEffect, useState } from "react";
import {
  Shield,
  Zap,
  Terminal,
  Github,
  Activity,
  Wallet,
  AlertTriangle,
  Lock,
} from "lucide-react";

declare global {
  interface Window {
    solana?: any;
  }
}

export default function AegisUltimate() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [walletAvailable, setWalletAvailable] = useState(false);

  /* =========================
     AEGIS SMART DETECTION
  ========================== */
  useEffect(() => {
    if (typeof window !== "undefined" && window.solana?.isPhantom) {
      setWalletAvailable(true);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const res = await window.solana.connect();
      setWallet(res.publicKey.toString());
    } catch {
      /* silent fail by design */
    }
  };

  /* =========================
     CORE SCAN
  ========================== */
  const runScan = async () => {
    if (!address || !wallet) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          wallet,
        }),
      });

      const data = await res.json();
      setResult(
        typeof data.aiResponse === "string"
          ? data.aiResponse
          : "UNIDENTIFIED THREAT VECTOR"
      );
    } catch {
      setResult("SCAN INTERRUPTED — SIGNAL LOST");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#020202",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* CORE GLOW */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "450px",
          background: "rgba(6,182,212,0.18)",
          filter: "blur(130px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      {/* NAV */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto 90px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Shield size={34} color="#22d3ee" />
          <div style={{ fontWeight: 900, fontSize: "24px" }}>
            AEGIS <span style={{ color: "#22d3ee" }}>ROGUE</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {!wallet ? (
            <button
              onClick={connectWallet}
              disabled={!walletAvailable}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: walletAvailable
                  ? "rgba(34,211,238,0.1)"
                  : "rgba(255,255,255,0.05)",
                color: walletAvailable ? "#22d3ee" : "#666",
                cursor: walletAvailable ? "pointer" : "not-allowed",
              }}
            >
              <Wallet size={14} />
              {walletAvailable ? "CONNECT WALLET" : "NO WALLET"}
            </button>
          ) : (
            <div
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "11px",
                border: "1px solid rgba(34,211,238,0.3)",
                color: "#22d3ee",
              }}
            >
              {wallet.slice(0, 4)}…{wallet.slice(-4)}
            </div>
          )}

          <a
            href="https://github.com/bedro95"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "8px 16px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <Github size={14} /> BEDRO95
          </a>
        </div>
      </nav>

      {/* MAIN */}
      <main
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "76px",
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: "-5px",
            lineHeight: "0.9",
            marginBottom: "18px",
          }}
        >
          AEGIS TOOL
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginBottom: "70px",
            letterSpacing: "4px",
            fontWeight: 700,
          }}
        >
          AI BLOCKCHAIN THREAT INTELLIGENCE
        </p>

        {/* PANEL */}
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "28px",
            padding: "44px",
            boxShadow: "0 25px 70px rgba(0,0,0,0.6)",
          }}
        >
          {!wallet && (
            <div
              style={{
                padding: "20px",
                border: "1px dashed rgba(255,255,255,0.15)",
                borderRadius: "16px",
                color: "#777",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "30px",
              }}
            >
              <Lock size={18} /> SYSTEM LOCKED — CONNECT WALLET
            </div>
          )}

          {/* INPUT */}
          <div style={{ position: "relative", marginBottom: "30px" }}>
            <Terminal
              size={20}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.35,
              }}
            />
            <input
              disabled={!wallet}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ENTER CONTRACT ADDRESS"
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "2px solid #222",
                padding: "16px 16px 16px 52px",
                fontSize: "18px",
                color: "#22d3ee",
                outline: "none",
                opacity: wallet ? 1 : 0.4,
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={runScan}
            disabled={!wallet || !address || loading}
            style={{
              width: "100%",
              padding: "22px",
              borderRadius: "14px",
              border: "none",
              background: loading
                ? "#222"
                : wallet
                ? "white"
                : "#111",
              color: wallet ? "black" : "#555",
              fontWeight: 900,
              letterSpacing: "3px",
              cursor:
                wallet && address && !loading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              transition: "0.3s",
            }}
          >
            {loading ? (
              <Activity className="animate-spin" size={20} />
            ) : (
              <Zap size={20} />
            )}
            {loading ? "ANALYZING…" : "EXECUTE DEEP SCAN"}
          </button>

          {/* RESULT */}
          {result && (
            <div
              style={{
                marginTop: "44px",
                padding: "28px",
                background: "rgba(220,38,38,0.06)",
                borderLeft: "4px solid #dc2626",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#dc2626",
                  fontWeight: 800,
                  fontSize: "11px",
                  letterSpacing: "3px",
                  marginBottom: "14px",
                }}
              >
                <AlertTriangle size={14} />
                CRITICAL INTEL
              </div>
              <div
                style={{
                  fontSize: "18px",
                  lineHeight: "1.7",
                  color: "#eee",
                  fontStyle: "italic",
                }}
              >
                “{result}”
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          position: "fixed",
          bottom: "20px",
          width: "100%",
          textAlign: "center",
          opacity: 0.25,
          fontSize: "10px",
          letterSpacing: "6px",
          left: 0,
        }}
      >
        AEGIS PROTOCOL //  2026
      </footer>
    </div>
  );
}
