import "./verifier.sol" as Zokrates;

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
