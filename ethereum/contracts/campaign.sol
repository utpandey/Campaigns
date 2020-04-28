 // solhint-disable-next-line
pragma solidity >=0.4.25;


contract CampaignFactory {
    Campaign[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
         // solhint-disable-next-line
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
        
    }
    
    function getDeployedCampaigns() public view returns ( Campaign[] memory) {
        return deployedCampaigns;
    }
}


contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping( address => bool ) approvals;   
        
    }
     
    Request[]  public requests;
    address public manager;
    uint public minimumContribution;
    mapping( address => bool) public approvers;
    uint public contributersCount;
    
    modifier restricted() {
        require(msg.sender == manager, "Sender not authorized.");
        _;
    }
  
  // constructor************************************************  
    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        
    }
    
    function contribute() public payable {

        require(msg.value > minimumContribution, "Sender not authorized.");

        approvers[msg.sender] = true;
        contributersCount++;

    }

    function createRequest(string memory description, uint value, address recipient ) public restricted() {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
            
        });
        
        requests.push(newRequest);
        
    }
    
    function approveRequest( uint index) public {
         // solhint-disable-next-line
        Request storage request_index = requests[index];
        
        require(approvers[msg.sender], "Sender not authorized.");
        
        require(!request_index.approvals[msg.sender], "Sender not authorized.");
        
        request_index.approvals[msg.sender] = true;
        
        request_index.approvalCount++;
        
    }
    
    function finalizeRequest(uint  index) public payable restricted {
        Request storage  request = requests[index];
        require(request.approvalCount > (contributersCount / 2), "Sender not authorized.");
        require(!request.complete, "Sender not authorized.");

        //address payable recipient = address(uint160(request.recipient));
         // solhint-disable-next-line
        (bool success,) = request.recipient.call.value(request.value)("");
        (success, "Transfer failed.");
        //recipient.transfer(request.value);
        
        // (bool success, ) = msg.sender.call.value(amount)("");
        
        
        request.complete = true;
        
    }

    function getSummary() public view returns(
        uint, uint, uint, uint, address ) {
        return(
            minimumContribution,
            address(this).balance,
            requests.length,
            contributersCount,
            manager
        );
    }
    
    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
    
}