// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IActionItems.sol";
import "./ISmartAgreement.sol";
import "./IVestingScheduler.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";


contract SAFTActionItem is IActionItems {

    ISmartAgreement smartAgreement;
    IVestingScheduler vestingScheduler;
    ISuperfluid private host;
    IERC20 private token;
    ISuperToken private superToken;
    address private treasury;

    // tokenId to signer address mapping
    mapping(uint256 => address[]) private _tokenIdToSigner;
    // signer address to signed status mapping
    mapping(address => bool) private _signerToStatus;


    /**
    Vesting Scheduler Addresses:
        Polygon: `0xcFE6382B33F2AdaFbE46e6A26A88E0182ae32b0c`

        Optimism: `0x65377d4dfE9c01639A41952B5083D58964782892`

        Arbitrum: `0x55c8fc400833eEa791087cF343Ff2409A39DeBcC`

        Avalanche: `0x3fA8B653F9abf91428800C0ba0F8D145a71F97A1`

        Gnosis Chain: `0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D`

        Binance Smart Chain: `0x9B91c27f78376383003C6A12Ad12B341d016C5b9`

        Ethereum Mainnet: `0x39D5cBBa9adEBc25085a3918d36D5325546C001B`
     */
    constructor(
        ISmartAgreement _smartAgreement,
        IVestingScheduler _vestingScheduler,
        ISuperfluid _host,
        IERC20 _token,
        ISuperToken _superToken,
        address _treasury
    ) {
        smartAgreement = _smartAgreement;
        vestingScheduler = _vestingScheduler;
        host = _host;
        token = _token;
        superToken = _superToken;
        treasury = _treasury;
    }

    function getSigners(uint256 _tokenId) external view returns (address[] memory) {
        return _tokenIdToSigner[_tokenId];
    }

    function hasSigned(address _signer) external view returns (bool) {
        return _signerToStatus[_signer];
    }

    function docSigned(uint256 _tokenId) external view returns (bool) {
        address[] memory signers = _tokenIdToSigner[_tokenId];

        for (uint256 i = 0; i < signers.length; i++) {
            if (!_signerToStatus[signers[i]]) {
                return false;
            }
        }

        return true;
    }

    function triggerActionItemsUponSigning(uint256 _tokenId) external {

        // 1. Authorize control for flow operator for vesting
        authorizeFlowOperatorWithFullControl(
            superToken,
            vestingScheduler.address,
            ""
        );

        // 2. Approve ERC20 token to be wrapped into super token
        token.approve(
		vestingScheduler.address, // address of Vesting Scheduler contract
		2**256 - 1
        );

        // 3. Set up a Keeper to trigger necessary actions
        executeCliffAndFlow(
            superToken,
            treasury,
            _msgSender()
        );

        // 4. End vesting once everything is complete
        executeEndVesting(
            superToken,
            treasury,
            _msgSender()
        );
    }
}