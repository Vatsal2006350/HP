const axios = require('axios');
require('dotenv').config();

// mint an NFT using Verbwire
async function testMintNFT() {
  try {
    const apiKey = process.env.VERBWIRE_API_KEY;
    
    if (!apiKey) {
      console.error('❌ VERBWIRE_API_KEY not found in environment variables');
      console.log('Please create a .env file with your VERBWIRE_API_KEY');
      return;
    }

    console.log('🔑 API Key found, attempting to mint an NFT...');
    
    // define test data for the NFT
    const testNFT = {
      name: "Test Achievement",
      description: "This is a test achievement NFT minted via Verbwire",
      recipientAddress: process.env.TEST_WALLET_ADDRESS, // The wallet to receive the NFT
      chain: "polygon", // Use polygon for testing (lower fees)
      data: {
        attributes: [
          {
            trait_type: "Achievement Type",
            value: "Test"
          },
          {
            trait_type: "Value",
            value: "100"
          },
          {
            display_type: "date",
            trait_type: "Earned On",
            value: Date.now()
          }
        ],
        image: "https://picsum.photos/200"
      }
    };

    // make the API call to Verbwire
    const response = await axios.post(
      'https://api.verbwire.com/v1/nft/mint/quickMintFromMetadata',
      testNFT,
      {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ NFT minted successfully!');
    console.log('Transaction details:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error minting NFT:', error.response?.data || error.message);
  }
}

// run the test
testMintNFT(); 