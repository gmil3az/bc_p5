pragma solidity >=0.4.21 <0.6.0;

import "./verifier.sol" as Zokrates;
import "./ERC721Mintable.sol" as ERC721Mintable;
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Zokrates.Verifier {
  function verifySoln(
		      uint[2] memory a,
		      uint[2][2] memory b,
		      uint[2] memory c,
		      uint[2] memory input
		      ) public returns(bool isValid) {
    bool success = verifyTx(a, b, c, input);
    isValid = success;  
  }
}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable.RealEstateERC721Token, SquareVerifier {
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

  // TODO Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as tokenSuplly
  function mint(
		uint[2] memory a,
		uint[2][2] memory b,
		uint[2] memory c,
		uint[2] memory input
		) public onlyOwner {
    require(super.verifySoln(a, b, c, input), "solution is not valid");
    bytes32 solutionId = _addSoln(a, b, c, input);
    super.mint(msg.sender, uint256(solutionId));
  }
  
}
