pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract CrowdFunding{
    mapping(address => uint) public contributors;
    address public admin;
    uint public numOfContributors;
    uint public minimumContribution;
    uint public deadline;  //timestamp
    uint public goal;
    uint public raisedAmount = 0;


    struct Request{
        string description;
        address recipient;
        uint value;
        bool completed;
        uint noOfVoters;
        mapping(address => bool) voters;
    }

    Request [] public requests;

    constructor(uint _goal, uint _deadline) public{
        goal = _goal;
        deadline = block.timestamp + _deadline;

        admin = msg.sender;
        minimumContribution = 10;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin);
        _;
    }

    function contribute() public payable{
        require(block.timestamp< deadline);
        require(msg.value >= minimumContribution);
        if(contributors[msg.sender] == 0){
            numOfContributors += 1;
        }

        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function getRefund() public {
        require(block.timestamp > deadline);
        require(raisedAmount < goal);
        require(contributors[msg.sender]> 0);
        address recipient = msg.sender;
        uint value  = contributors[msg.sender];

        recipient.transfer(value);
        contributors[msg.sender] = 0;
    }

    function createRequest(string _description, address _recipient, uint _value) public onlyAdmin{
        Request memory newRequest = Request({
            description: _description,
            recipient: _recipient,
            value: _value,
            completed: false,
            noOfVoters: 0
        });
        requests.push(newRequest);
    }

}