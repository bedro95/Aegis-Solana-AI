import { Connection, PublicKey } from '@solana/web3.js';

// استخدم RPC سريع لضمان عدم التأخير
const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getRogueData(mintAddress: string) {
    const mint = new PublicKey(mintAddress);
    
    // 1. جلب أول 20 معاملة عند إطلاق العملة
    const signatures = await connection.getSignaturesForAddress(mint, { limit: 20 });
    
    // 2. تحليل توقيت المعاملات (Detecting Bundles)
    const firstTxTime = signatures[signatures.length - 1].blockTime;
    let bundleCount = 0;

    const txDetails = await connection.getParsedTransactions(
        signatures.map(s => s.signature), 
        { maxSupportedTransactionVersion: 0 }
    );

    txDetails.forEach(tx => {
        // إذا تمت المعاملة في نفس الثانية أو أول 5 ثوانٍ من الإطلاق
        if (tx && tx.blockTime && firstTxTime && (tx.blockTime - firstTxTime) < 5) {
            bundleCount++;
        }
    });

    return {
        bundleCount,
        isSuspicious: bundleCount > 5, // تجميع أكثر من 5 محافظ يعتبر حركة مشبوهة
        launchTimestamp: firstTxTime
    };
}
