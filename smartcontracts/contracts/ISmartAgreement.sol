// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC721/extensions/IERC721Enumerable.sol)

pragma solidity ^0.8.0;

/**
 * @title ActionItem standard for action items triggered by smart agreement being signed.
 */
interface ISmartAgreement {
    /**
     * @dev Creates a new agreement
     */
    function createAgreement(
        address party1,
        address party2
    ) external;

    /**
     * @dev Signs the agreement
     */
    function signAgreement(uint256 _agreementId, 
                    string memory _metadataContent1,
                    string memory _metadataContent2,
                    uint256 _salt) external;
}