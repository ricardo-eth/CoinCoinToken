const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoinCoin Token", function () {
  let CoinCoin, coincoin, dev, owner, alice, bob, charlie, dan, eve;
  const NAME = "CoinCoin";
  const SYMBOL = "COIN";
  const INITIAL_SUPPLY = ethers.utils.parseEther("8000000000");

  beforeEach(async function () {
    [dev, owner, alice, bob, charlie, dan, eve] = await ethers.getSigners();
    CoinCoin = await ethers.getContractFactory("CoinCoin");
    coincoin = await CoinCoin.connect(dev).deploy(
      owner.address,
      INITIAL_SUPPLY
    );
    await coincoin.deployed();
    /*
    Il faudra transférer des tokens à nos utilisateurs de tests lorsque la fonction transfer sera implementé
    await coincoin
      .connect(owner)
      .transfer(alice.address, ethers.utils.parseEther('100000000'))
      */
  });

  describe("Deployement", function () {
    it("Has name CoinCoin", async function () {
      expect(await coincoin.name()).to.equal(NAME);
    });
    it("Has symbol Coin", async function () {
      expect(await coincoin.symbol()).to.equal(SYMBOL);
    });
    it("mints initial Supply to owner", async function () {
      let coincoin = await CoinCoin.connect(dev).deploy(
        owner.address,
        INITIAL_SUPPLY
      );
      expect(await coincoin.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("emits event Transfer when mint initial supply to owner at deployement", async function () {
      /*
        On peut tester si un event a été emit depuis une transaction particulière.
        Le problème c'est qu'une transaction de déploiement ne nous retourne pas la transaction
        mais l'instance du smart contract déployé.
        Pour récupérer la transaction qui déployé le smart contract il faut utilisé un l'attribut
        ".deployTransaction" sur l'instance du smart contract
      */
      let receipt = await coincoin.deployTransaction.wait();
      let txHash = receipt.transactionHash;
      await expect(txHash)
        .to.emit(coincoin, "Transfer")
        .withArgs(ethers.constants.AddressZero, owner.address, INITIAL_SUPPLY);
    });
  });

  describe("Allowance system", function () {
    // Tester le système d'allowance ici
  });
  describe("Token transfers", function () {
    it("transfers tokens from sender to receipient", async function () {});
    it("transferFrom tokens from sender to receipient", async function () {});
    it("emits event Transfer when transfer token", async function () {});
    it("emits event Transfer when transferFrom token", async function () {});
  });
});
