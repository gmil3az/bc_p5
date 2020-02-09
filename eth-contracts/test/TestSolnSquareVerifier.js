// Test if a new solution can be added for contract - SolnSquareVerifier
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var util = require('util');
require('truffle-test-utils').init();
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
contract('SolnSquareVerifier', accounts => {

    const empty_address = "0x0000000000000000000000000000000000000000";
    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];
    accounts.forEach((account, index) => console.log(`${index + 1}.) account[${index}] = ${account}`));
    beforeEach(async function () { 
        this.contract = await SolnSquareVerifier.new({from: account_one});
    })

    const sol339 = {
        proof: {
	    a: ["0x21bd5a850ba1a1efeb611edc091303b79987c6a2e57532b40a6288d1d43a74c4", "0x0fe9b005b1af14d83ae2a77510a1dfa43641d4d92e9f82b050165e9b52e76ae7"],
	    b: [["0x139b032966799a55f12585b285e4af973a6f78263f8eb9c401c101a86edf3489", "0x13137b949100a59a4be3837b6b6c015afa81b233a1f44727a542cbb5b824fc55"], ["0x03a7e90ebbe9e7fb79f6903ab09ff46be491876678d3f880f6794b1d3da01131", "0x0e3443f19f1a5fbf767aa8e67fc29c4fe4f32ac4c7c9e099261d7a87873362fc"]],
	    c: ["0x2a5910164d762e38e3d73eddfaebb208b29e9f0d43f64ff1d5f7598a4504abb2", "0x0899841cee8ca2c32c610100869bd5ccd2fd44c8ca383cf51a35255367bc4a29"]
        },
        inputs: ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    };

    it('Submitting new solution (3*3=9) should mint a new token', async function () {
	let args = sol339;
	let tokenId = 201;
        let result = await this.contract.mint(account_two, tokenId, args.proof.a, args.proof.b, args.proof.c, args.inputs);
	let solnId = await this.contract.solnId.call(args.proof.a, args.proof.b, args.proof.c, args.inputs);

	let owner = await this.contract.ownerOf(tokenId);
	assert.equal(owner, account_two);

	assert.web3Event(result, {
	    event: 'Transfer',
	    args: {
		"0": empty_address,
		"1": account_two,
		"2": tokenId,
		"__length__": 3,
		"from": empty_address,
		"to": account_two,
		"tokenId": tokenId
	    }
	}, 'No Transfer event emitted');
		assert.web3Event(result, {
	    event: 'SolnAdded',
	    args: {
		"0": solnId,
		"1": 1,
		"2": account_one,
		"__length__": 3,
		"solnId": solnId,
		"index": 1,
		"author": account_one
	    }
	}, 'No SolnAdded event emitted');
    })

})

