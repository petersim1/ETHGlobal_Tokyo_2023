// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC721/extensions/IERC721Enumerable.sol)

pragma solidity ^0.8.0;

/**
 * @title ActionItem standard for action items triggered by smart agreement being signed.
 */
interface IActionItems {
    /**
     * @dev Returns the total amount of tokens stored by the contract.
     */
    function getSigners(uint256 _tokenId) external view returns (address[] memory);

    /**
     * @dev Returns a token ID owned by `owner` at a given `index` of its token list.
     * Use along with {balanceOf} to enumerate all of ``owner``'s tokens.
     */
    function hasSigned(address _signer) external view returns (bool);

    /**
     * @dev Returns a token ID at a given `index` of all the tokens stored by the contract.
     * Use along with {totalSupply} to enumerate all tokens.
     */
    function docSigned(uint256 _tokenId) external view returns (bool);

    /**
     * @dev Returns a token ID at a given `index` of all the tokens stored by the contract.
     * Use along with {totalSupply} to enumerate all tokens.
     */
    //function triggerActionItemsUponSigning(uint256 _tokenId) external;
}