const Migrations = artifacts.require("TransactionData");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};