import { Connection, PublicKey } from '@solana/web3.js';

export async function getRogueData(mintAddress: string) {
    try {
        const connection = new Connection("https://api.mainnet-beta.solana.com");
        const mint = new PublicKey(mintAddress);
        const signatures = await connection.getSignaturesForAddress(mint, { limit: 20 });
        
        if (signatures.length === 0) return { bundleCount: 0, isSuspicious: false };

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

        return { bundleCount, isSuspicious: bundleCount > 5 };
    } catch (e) {
        return { bundleCount: 0, isSuspicious: false };
    }
}
