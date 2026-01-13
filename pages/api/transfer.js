import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import { v4 as uuidv4 } from 'uuid';

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.ENTITY_SECRET
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Use the Wallet ID you confirmed has the 1 USDC balance
  const walletId = '39117e76-307c-5020-afcf-eb4345c63df2'; 
  const { destinationAddress } = req.body;

  try {
    /**
     * ARC NETWORK FIX: 
     * We call the native USDC system contract directly.
     * System Address: 0x3600000000000000000000000000000000000000
     * Amount: 0.1 USDC (100,000 units in 6-decimal format)
     */
    const response = await client.createContractExecutionTransaction({
      walletId: walletId,
      contractAddress: '0x3600000000000000000000000000000000000000',
      abiFunctionSignature: 'transfer(address,uint256)',
      abiParameters: [
        destinationAddress, 
        '100000' // 0.1 USDC. This leaves 0.9 USDC to cover gas fees.
      ],
      fee: {
        type: 'level',
        config: { feeLevel: 'MEDIUM' }
      },
      idempotencyKey: uuidv4()
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("CIRCLE ERROR:", JSON.stringify(error.response?.data, null, 2));
    res.status(500).json({ error: error.response?.data?.message || "Internal Server Error" });
  }
}