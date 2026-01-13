import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.ENTITY_SECRET
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    // New SDK v9 syntax: data is nested in the response
    const setResp = await client.createWalletSet({ name: 'Arc AI Project Set' });
    
    const wallets = await client.createWallets({
      blockchains: ['ARC-TESTNET'],
      count: 2,
      walletSetId: setResp.data.walletSet.id
    });

    res.status(200).json({
      treasury: wallets.data.wallets[0],
      user: wallets.data.wallets[1]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}