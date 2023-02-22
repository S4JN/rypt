// https://eth-goerli.g.alchemy.com/v2/9cipd16ev02w3YF_2Mm3KNYZbDr18wuo

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/9cipd16ev02w3YF_2Mm3KNYZbDr18wuo',
      accounts: ["ef21a0db6935188e697848a5df15bf1430e38b6a669a59eab483da0868cb5520"],
    },
  },
};
