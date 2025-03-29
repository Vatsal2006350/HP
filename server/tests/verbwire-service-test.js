require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// quick mint an NFT
async function testQuickMintNFT() {
  try {
    const apiKey = process.env.VERBWIRE_API_KEY;
    
    if (!apiKey) {
      console.error('❌ VERBWIRE_API_KEY not found in environment variables');
      return;
    }

    console.log('🔑 API Key found, attempting to quick mint an NFT...');
    
    // create form data
    const formData = new FormData();
    formData.append('chain', 'sepolia');
    formData.append('name', 'Achievement Badge');
    formData.append('description', 'Perfect Lesson - Completed without mistakes');
    formData.append('recipientAddress', process.env.TEST_WALLET_ADDRESS);
    
    // use the local image file
    const filePath = path.join(__dirname, 'mofusand.jpg');
    
    console.log('📁 Using image file:', filePath);
    
    // check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('❌ Image file not found:', filePath);
      return;
    }
    
    // read and append the file
    const fileStream = fs.createReadStream(filePath);
    formData.append('filePath', fileStream);
    
    // attributes in the correct format for OpenSea
    const attributes = [
      {
        trait_type: "Achievement Type",
        value: "Perfect Lesson"
      },
      {
        trait_type: "Value",
        value: "100"
      }
    ];
    formData.append('data', JSON.stringify(attributes));

    console.log('🔄 Sending request to Verbwire API with Sepolia testnet...');
    
    // make the API call to Verbwire's quick mint endpoint
    const response = await axios.post(
      'https://api.verbwire.com/v1/nft/mint/quickMintFromFile',
      formData,
      {
        headers: {
          'X-API-Key': apiKey,
          ...formData.getHeaders()
        }
      }
    );

    console.log('✅ NFT minted successfully on Sepolia!');
    console.log('Transaction details:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error minting NFT:', error.response?.data || error.message);
  }
}

testQuickMintNFT(); 