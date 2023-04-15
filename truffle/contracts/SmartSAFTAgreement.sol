// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IActionItems.sol";
import "./SmartAgreement.sol";
import "./IVestingScheduler.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";


contract SmartSAFTAgreement is SmartAgreement, IActionItems {
    IVestingScheduler vestingScheduler;
    address private treasury;

    struct SAFTActionItemMetadata {
        ISuperToken superToken;
        address receiver;
        uint32 startDate;
        uint32 cliffDate;
        int96 flowRate;
        uint256 cliffAmount;
        uint32 endDate;
        bytes ctx;
    }

    // tokenId to signer address mapping
    mapping(uint256 => address[]) private _signers;
    mapping(uint256 => SAFTActionItemMetadata) private _SAFTs;
    mapping(uint256 => bool) private actionItemSet;
    // signer address to signed status mapping
    mapping(address => bool) private _signerToStatus;


    /**
    Vesting Scheduler Addresses:
        Mumbai Testnet: `0x3962EE56c9f7176215D149938BA685F91aBB633B`

        Polygon: `0xcFE6382B33F2AdaFbE46e6A26A88E0182ae32b0c`

        Optimism: `0x65377d4dfE9c01639A41952B5083D58964782892`

        Arbitrum: `0x55c8fc400833eEa791087cF343Ff2409A39DeBcC`

        Avalanche: `0x3fA8B653F9abf91428800C0ba0F8D145a71F97A1`

        Gnosis Chain: `0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D`

        Binance Smart Chain: `0x9B91c27f78376383003C6A12Ad12B341d016C5b9`

        Ethereum Mainnet: `0x39D5cBBa9adEBc25085a3918d36D5325546C001B`
    
    Super Token Addresses:
        USDCx Mumbai: `0x42bb40bF79730451B11f6De1CbA222F17b87Afd7`
     */
    constructor(
        IVestingScheduler _vestingScheduler,
        address _treasury,
        address _forwarder, 
        string memory _uri
    ) SmartAgreement(_forwarder, _uri) {
        vestingScheduler = _vestingScheduler;
        treasury = _treasury;
    }

    function getSigners(uint256 _tokenId) external view returns (address[] memory) {
        return _signers[_tokenId];
    }

    function hasSigned(address _signer) external view returns (bool) {
        return _signerToStatus[_signer];
    }

    function docSigned(uint256 _tokenId) external view returns (bool) {
        address[] memory signers = _signers[_tokenId];

        for (uint256 i = 0; i < signers.length; i++) {
            if (!_signerToStatus[signers[i]]) {
                return false;
            }
        }

        return true;
    }

    function createActionItem(uint256 _tokenId, 
        ISuperToken _superToken,
        address _receiver,
        uint32 _startDate,
        uint32 _cliffDate,
        int96 _flowRate,
        uint256 _cliffAmount,
        uint32 _endDate,
        bytes memory _ctx) external {
            SAFTActionItemMetadata storage actionItem = _SAFTs[_tokenId];

            actionItem.superToken = _superToken;
            actionItem.receiver = _receiver;
            actionItem.startDate = _startDate;
            actionItem.cliffDate = _cliffDate;
            actionItem.flowRate = _flowRate;
            actionItem.cliffAmount = _cliffAmount;
            actionItem.endDate = _endDate;
            actionItem.ctx = _ctx;

            actionItemSet[_tokenId] = true;
    }

    function triggerActionItemsUponSigning(uint256 _tokenId) internal {
        SAFTActionItemMetadata memory vestingInfo = _SAFTs[_tokenId];

        // 2. Approve ERC20 token to be wrapped into super token
        IERC20(vestingInfo.superToken.getUnderlyingToken()).approve(
		address(vestingScheduler), // address of Vesting Scheduler contract
		2**256 - 1
        );

        require(actionItemSet[_tokenId], "Action Item must be set before triggering action");

        vestingScheduler.createVestingSchedule(
            vestingInfo.superToken,
            vestingInfo.receiver,
            vestingInfo.startDate,
            vestingInfo.cliffDate,
            vestingInfo.flowRate,
            vestingInfo.cliffAmount,
            vestingInfo.endDate,
            vestingInfo.ctx
        );
    }

    function signWithTrigger(uint256 _tokenId) public {
        require(isInvolved(_tokenId, _msgSender()), "Signer must be involved in the contract");

        AContract storage tk = tokenContracts[_tokenId];

        tk.partySigned[_msgSender()] = true;

        if (allPartiesSigned(_tokenId)) {
            triggerActionItemsUponSigning(_tokenId);
        }
    }
}