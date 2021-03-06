pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol" as ERC721Mintable;
import "./SquareVerifier.sol" as Zokrates;

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable.RealEstateERC721Token, Zokrates.SquareVerifier {
  // TODO define a solutions struct that can hold an index & an address
  struct Soln{
    bytes32 solnId;
    uint256 index;
    address author;
  }

  constructor() public {
    // add the genesis solution, so if index retrieved from _solnIdToIndex mapping is zero; it means solution not found.
    uint[2] memory a;
    uint[2][2] memory b;
    uint[2] memory c;
    uint[2] memory input;
    _addSoln(a, b, c, input);
  }

  // TODO define an array of the above struct
  Soln[] private _solutions;

  // TODO define a mapping to store unique solutions submitted
  // it's a mapping of solnId to index on the _solutions  
  mapping(bytes32 => uint256) private _solnIdToIndex;

  // TODO Create an event to emit when a solution is added
  event SolnAdded(bytes32 solnId, uint256 index, address author);

  // TODO Create a function to add the solutions to the array and emit the event
  function _addSoln(
		   uint[2] memory a,
		   uint[2][2] memory b,
		   uint[2] memory c,
		   uint[2] memory input
		    ) internal returns(bytes32) {
    bytes32 solutionId = solnId(a, b, c ,input);
    require(_solnIdToIndex[solutionId] == 0, 'solution already exists');
    uint256 index = _solutions.length;
    Soln memory soln = Soln({solnId: solutionId, index: index, author: msg.sender});
    _solutions.push(soln);
    _solnIdToIndex[solutionId] = index;
    emit SolnAdded(solutionId, index, msg.sender);
    return solutionId;
  }

  function solnId(
		  uint[2] memory a,
		  uint[2][2] memory b,
		  uint[2] memory c,
		  uint[2] memory input
		  ) public pure returns(bytes32) {
    return keccak256(abi.encodePacked(a, b ,c ,input));
  }

  /* function tokenId( */
  /* 		   uint[2] memory a, */
  /* 		   uint[2][2] memory b, */
  /* 		   uint[2] memory c, */
  /* 		   uint[2] memory input */
  /* 		   ) public pure returns(uint256) { */
  /*   return uint256(solnId(a,b,c,input)); */
  /* } */

  // TODO Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as tokenSuplly
  function mint(
		address to,
		uint256 tokenId,
		uint[2] memory a,
		uint[2][2] memory b,
		uint[2] memory c,
		uint[2] memory input
		) public onlyOwner whenNotPaused {
    require(to != address(0), "address cannot be empty");
    require(!_exists(tokenId), "token id already exist");
    require(super.verifySoln(a, b, c, input), "solution is not valid");
    _addSoln(a, b, c, input);
    super.mint(to, tokenId);
  }
  
}
