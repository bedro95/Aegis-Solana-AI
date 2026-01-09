// path: src/lib/AegisEngine.ts
import { Connection } from '@solana/web3.js';

export class AegisEngine {
    private connection: Connection;

    constructor() {
        // Using a public RPC for basic data
        this.connection = new Connection("https://api.mainnet-beta.solana.com");
    }

    // New Function to fetch real SOL price from CoinGecko
    async getLivePrice() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
            const data = await response.json();
            return data.solana.usd;
        } catch (error) {
            return "---";
        }
    }

    async interpretIntent(userPrompt: string) {
        const prompt = userPrompt.toLowerCase();
        
        // Smarter Logic instead of undefined
        let decision = "GENERAL_QUERY";
        let confidence = 0.85;

        if (prompt.includes("price") || prompt.includes("analyze")) {
            decision = "MARKET_ANALYSIS";
            confidence = 0.98;
        } else if (prompt.includes("buy") || prompt.includes("swap")) {
            decision = "TRADE_EXECUTION";
            confidence = 0.95;
        }

        return {
            status: "success",
            agentDecision: decision,
            confidence: confidence,
            network: "Solana Mainnet"
        };
    }
}