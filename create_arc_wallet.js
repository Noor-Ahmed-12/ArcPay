const { initiateDeveloperControlledWalletsClient } = require('@circle-fin/developer-controlled-wallets');

// 1. Initialize the client
const client = initiateDeveloperControlledWalletsClient({
  apiKey: 'TEST_API_KEY:da50c3a7f6a38a202a77eda8146a3629:ced6e02ec83fe2feaa9e2d98a1a62ae7',
  entitySecret: '56bd92001f1e52ce2cd39e73d8c0b2e75f75099ba7d162fd8d0048942f7a87f9'
});

async function createWallet() {
  try {
    // 2. Create a Wallet Set (This generates the underlying key)
    const walletSetResponse = await client.createWalletSet({
      name: 'My Arc Hackathon Set'
    });
    const walletSetId = walletSetResponse.data.walletSet.id;
    console.log("Wallet Set Created! ID:", walletSetId);

    // 3. Create a Wallet specifically on the ARC-TESTNET
    const walletsResponse = await client.createWallets({
      blockchains: ['ARC-TESTNET'],
      count: 1,
      walletSetId: walletSetId
    });

    const wallet = walletsResponse.data.wallets[0];
    console.log("\n--- ARC WALLET CREATED ---");
    console.log("Address:", wallet.address);
    console.log("Wallet ID:", wallet.id);
    console.log("--------------------------\n");

  } catch (error) {
    console.error("Creation failed:", error.response ? error.response.data : error.message);
  }
}

createWallet();