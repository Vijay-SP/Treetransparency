// contracts/GreenToken.sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
contract GreenToken is ERC20Capped, ERC20Burnable {
    address payable public owner;
    uint256 public blockReward;
    string private _image;

    constructor(uint256 cap, uint256 reward ,string memory image) ERC20("LeafToken", "LFT") ERC20Capped(cap * (10 ** decimals())) {
        _image = image;
        owner = payable(msg.sender);
        blockReward = reward * (10 ** decimals());
    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override {
        if(from != address(0) && to != block.coinbase && block.coinbase != address(0)) {
            _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, value);
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward * (10 ** decimals());
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    mapping(address => bool) public registeredUsers;

    function register() external {
        require(!registeredUsers[msg.sender], "User already registered");
        registeredUsers[msg.sender] = true;
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function getImage() public view returns (string memory) {
        return _image;
    }


}