const Migrations = artifacts.require("GreenToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations,100,5,"public\images\leaf image.png");
};