// https://eth-goerli.g.alchemy.com/v2/9cipd16ev02w3YF_2Mm3KNYZbDr18wuo
//https://eth-sepolia.g.alchemy.com/v2/qU5HwMTPTDMIv6QPdn3GSpx06wxxrMB3
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/qU5HwMTPTDMIv6QPdn3GSpx06wxxrMB3',
      accounts: ["ef21a0db6935188e697848a5df15bf1430e38b6a669a59eab483da0868cb5520"],
    },
  },
};
