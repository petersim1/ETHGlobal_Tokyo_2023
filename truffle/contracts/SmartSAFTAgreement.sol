// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IActionItems.sol";
import "./SmartAgreement.sol";
import "./IVestingScheduler.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract SmartSAFTAgreement is SmartAgreement {
    IVestingScheduler private vestingScheduler;
    ISwapRouter private uniswapV3Router;
    IERC20 private USDC;

    address private treasury;

    struct SAFTActionItemMetadata {
        uint96 usdcPool;
        uint96 discountMult;
        uint256 investmentUSDAmt;
        ISuperToken superToken;
        address receiver;
        address sender;
        uint32 startDate;
        uint32 cliffDate;
        uint256 cliffAmount;
        uint32 endDate;
        bytes ctx;
    }

    mapping(address => uint256) raiseTerminationThresholds;
    mapping(address => uint256) raiseTotals;

    mapping(uint256 => SAFTActionItemMetadata) private _SAFTs;
    mapping(uint256 => bool) private actionItemSet;


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

    ERC20 USDC Addresses:
        Mumbai Testnet: `0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747`

    Deployed SmartSAFTAgreement Contracts:
        Mumbai Testnet: 0x29c2860270aee9fd8f3087e2ca5d7e142cd3bcf1
     */
    constructor(
        IVestingScheduler _vestingScheduler,
        address _treasury,
        address _forwarder, 
        string memory _uri,
        ISwapRouter _uniswapV3Router,
        IERC20 _USDC
    ) SmartAgreement(_forwarder, _uri) {
        vestingScheduler = _vestingScheduler;
        treasury = _treasury;
        uniswapV3Router = _uniswapV3Router;
        USDC = _USDC;
    }

    function createActionItem(uint256 _tokenId, 
        uint96 _usdAmt, 
        uint96 _discountMult,
        ISuperToken _superToken,
        address _receiver,
        address _sender,
        uint32 _startDate,
        uint32 _cliffDate,
        uint96 _flowRate,
        uint256 _cliffAmount,
        uint32 _endDate,
        bytes memory _ctx) external {
            SAFTActionItemMetadata storage actionItem = _SAFTs[_tokenId];

            actionItem.usdcPool = 0;
            actionItem.discountMult = _discountMult;
            actionItem.superToken = _superToken;
            actionItem.receiver = _receiver;
            actionItem.sender = _sender;
            actionItem.startDate = _startDate;
            actionItem.cliffDate = _cliffDate;
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
            calcFlowRate(_tokenId),
            vestingInfo.cliffAmount,
            vestingInfo.endDate,
            vestingInfo.ctx
        );
    }

    function calcFlowRate(uint256 _tokenId) private view returns (int96) {
        SAFTActionItemMetadata memory vestingInfo = _SAFTs[_tokenId];

        uint96 flowRate = uint96((vestingInfo.usdcPool * vestingInfo.discountMult) / (vestingInfo.endDate - vestingInfo.startDate));

        return int96(flowRate);
    }

    function signWithTrigger(uint256 _tokenId) public {
        require(isInvolved(_tokenId, _msgSender()), "Signer must be involved in the contract");

        AContract storage tk = tokenContracts[_tokenId];

        tk.partySigned[_msgSender()] = true;

        if (allPartiesSigned(_tokenId)) {
            triggerActionItemsUponSigning(_tokenId);
        }
    }

    function depositUSDCToPool(uint256 _tokenId, uint96 _tokenAmount) public {
        SAFTActionItemMetadata storage vestingInfo = _SAFTs[_tokenId];

        USDC.approve(address(this), _tokenAmount);

        USDC.transferFrom(vestingInfo.receiver, vestingInfo.sender, _tokenAmount);

        vestingInfo.usdcPool += _tokenAmount;
    }

    function swapToUSDCAndDeposit(
        uint256 _tokenId,
        IERC20 tokenToSwap,
        uint96 _tokenAmount,
        uint256 minUSDCOut,
        uint256 deadline,
        address wethAddress,
        address usdcAddress,
        uint24 fee
    ) external {
        SAFTActionItemMetadata storage vestingInfo = _SAFTs[_tokenId];

        // Approve the router to spend tokens
        tokenToSwap.approve(address(uniswapV3Router), _tokenAmount);

        // Define the path to swap from the input token to USDC
        bytes memory path = abi.encodePacked(
            address(tokenToSwap),
            fee,
            wethAddress,
            fee,
            usdcAddress
        );

        // Perform the token swap
        uniswapV3Router.exactInput(
            ISwapRouter.ExactInputParams({
                path: path,
                recipient: vestingInfo.receiver,
                deadline: deadline,
                amountIn: _tokenAmount,
                amountOutMinimum: minUSDCOut
            })
        );

        depositUSDCToPool(_tokenId, _tokenAmount);
}
}