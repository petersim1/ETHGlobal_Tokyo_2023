// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ISmartAgreement.sol";

contract SmartAgreement is ISmartAgreement, ERC721Enumerable, Ownable, ERC2771Recipient {

    using Counters for Counters.Counter;
    Counters.Counter private _ndaIds;
    mapping (address => bool) admins;
    address public trustedForwarder;

    // Optional mapping for token URIs
    mapping (uint256 => string) private _tokenURIs;

    // Base URI
    string private _baseURIextended;

    struct NDA {
        address party1;
        address party2;
        bool signed1;
        bool signed2;
    }

    event NewAgreement(uint256 ndaId, address party1, address party2);
    event SignAgreement(uint256 ndaId, address party1, address party2, bool party1Signing);

    mapping (uint256 => NDA) public ndas;
    mapping (address => uint256[]) private userNDAs;

    constructor(address _forwarder) ERC721("Example", "Ex") {
        trustedForwarder = _forwarder;
    }

    function setTrustedForwarder(address _forwarder) public onlyOwner() {
        trustedForwarder = _forwarder;

    }

    using Strings for uint256;

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    modifier onlyAdmin() {
        require(admins[_msgSender()] == true);
            _;
    }

    function _msgSender() internal view override(Context, ERC2771Recipient) returns (address sender) {
        sender = ERC2771Recipient._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Recipient) returns (bytes calldata) {
        return ERC2771Recipient._msgData();
    }

    function addAdmin(address _newAdmin) external onlyOwner() {
        admins[_newAdmin] = true;
    }

    function removeAdmin(address _newAdmin) external onlyOwner() {
        admins[_newAdmin] = false;
    }
    
    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) public virtual onlyAdmin() {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function getCurUserNDAs() public view virtual returns (uint256[] memory) {
        uint256[] memory _ndas = userNDAs[_msgSender()];
        
        return _ndas;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
        
        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function exists(uint256 _tokenId) public view returns (bool) {
        return _exists(_tokenId);
    }

    function ndaTotalSupply() public view returns (uint256) {
        uint256 numNdas = _ndaIds.current();
        return numNdas;
    }

    function createAgreement(
        address party1,
        address party2
    ) external {
        _ndaIds.increment();
        uint256 ndaId = _ndaIds.current();

        NDA memory newAgreement = NDA(party1, party2, false, false);

        ndas[ndaId] = newAgreement;
        userNDAs[party1].push(ndaId);
        userNDAs[party2].push(ndaId);

        emit NewAgreement(ndaId, party1, party2);
    }

    function signAgreement(uint256 _ndaId, 
                    string memory _metadataContent1,
                    string memory _metadataContent2,
                    uint256 _salt) external {
        require((ndas[_ndaId].party1 == _msgSender() 
        || ndas[_ndaId].party2 == _msgSender()), "NFT must be minted to one of the signers");

        if (ndas[_ndaId].party1 == _msgSender()) {
            ndas[_ndaId].signed1 = true;

            if (ndas[_ndaId].signed2) {
                mint(
                _msgSender(),
                _ndaId,
                _metadataContent1,
                _salt);

                mint(
                ndas[_ndaId].party2,
                _ndaId,
                _metadataContent2,
                _salt);
            }

            emit SignAgreement(_ndaId, ndas[_ndaId].party1, ndas[_ndaId].party2, true);
        }
        else if (ndas[_ndaId].party2 == _msgSender()) {
            ndas[_ndaId].signed2 = true;

            if (ndas[_ndaId].signed1) {
                mint(
                _msgSender(),
                _ndaId,
                _metadataContent2,
                _salt);

                mint(
                ndas[_ndaId].party1,
                _ndaId,
                _metadataContent1,
                _salt);
            }

            emit SignAgreement(_ndaId, ndas[_ndaId].party1, ndas[_ndaId].party2, false);
        }
    }

    //TODO: Figure out if salt is necessary
    function mint(
        address _to,
        uint256 _ndaId,
        string memory _metadataContent,
        uint256 _salt
    ) private {
        require((ndas[_ndaId].party1 == _msgSender() 
        || ndas[_ndaId].party2 == _msgSender()), "NFT must be minted to one of the signers");
        require((ndas[_ndaId].signed1 && ndas[_ndaId].signed2), "Contract must be signed by both parties to mint receipts for it");

        uint256 _tokenId = generateProof(_metadataContent, _salt);

        _safeMint(_to, _tokenId);
    }

    function burn(uint256 tokenId) public virtual {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not owner nor approved to burn");

        _burn(tokenId);
    }

    /**
     * @dev Generates a Proof Of Integrity as the keccak256 hash of a human readable {base} and a randomly pre-generated number {salt}.
     */
    function generateProof(string memory base, uint256 salt) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(base, salt)));
    }

    /**
     * @dev Verifies a Proof Of Integrity {proof} against a human readable {base} and a randomly pre-generated number {salt}.
     */
    function verifyProof(uint256 tokenId, string memory base, uint256 salt) public pure returns (bool) {
        return tokenId == generateProof(base, salt);
    }
}