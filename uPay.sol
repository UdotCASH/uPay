pragma solidity ^0.6.0;

abstract contract ERC20Basic {
  function totalSupply() public view virtual returns (uint256);
  function balanceOf(address who) public view virtual returns (uint256);
  function transfer(address to, uint256 value) public virtual returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

abstract contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view virtual returns (uint256);
  function transferFrom(address from, address to, uint256 value) public virtual returns (bool);
  function approve(address spender, uint256 value) public virtual returns (bool);
  function decimals() public view virtual returns (uint);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract uPay{

    address payable owner;

    event paymentReceived(address paymentAddress,uint amount);

    constructor() public {
        owner == msg.sender;
    }

    receive() external payable{
        emit paymentReceived(msg.sender,msg.value);
    }

    function withdraw() public {
        owner.transfer(address(this).balance);
    }

}
