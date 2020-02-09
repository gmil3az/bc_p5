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

    const sol4416 = {
        proof: {
	    a: ["0x20d0a45d2747056c5cf98342adf05a0d816c1f444e7fa138dced95c6f6701209", "0x03c45a8120b49ed94cf22741a7147dde432f09145caf3cdfe809e20de62b82ab"],
	    b: [["0x04d0512619cd231793d9396d8b11df369424deb9b0c802a5f9f50520d5d2dc87", "0x2bf9f12a40b5d87d94240e3819af1928d2829f6425231b99adeba44b3127f994"], ["0x2d265364987a715328d5b5897fad83f9e45b2536fc047360041dba6cc6af52da", "0x2c20543e479c335733d301b57ec57346961a12e5766f472e2ac511a514344a0d"]],
	    c: ["0x0e957a1630bbd2d4427c3e352e4bfd551df42b874f72f7317535965006a676e3", "0x23ab2e11b235503abecfc282aaab877f711efee9a1aab977597495e7f031c53b"]
        },
        inputs: ["0x0000000000000000000000000000000000000000000000000000000000000010", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    };
    
    const sol5525 = {
        proof: {
	    a: ["0x2e83189d3c989d521bd3915be3d5d91f518c5895658af6af995f664b00c8ba78", "0x14e217e9cd2ebd535fe93b5fd91bd7d800a38f8155f83f86e2d4024f9018049f"],
	    b: [["0x10e2592dd3acbf65882effaec7174e9d09e5aa56bf4935561d8847eed2000c22", "0x2369ea3ea02d3cd285c2b3adeee3d8338d42e89173a67dfaea8e12638618096e"], ["0x293750c361d7f42bda94ddfc6446a665f7ed1a83f7e63cb2471f5d67262527ef", "0x28aa6dffe64755f191e21a7976dad364c4848cc86c9b029c4430ddcb096df815"]],
	    c: ["0x120ba8717d7ca9bfede379f72ae972b159d8751ab0fac42dffcf38d022039080", "0x2b97096571374f38219647333911730d9b51ba62b2bbe67f287ddcadd531e8da"]
        },
        inputs: ["0x0000000000000000000000000000000000000000000000000000000000000019", "0x0000000000000000000000000000000000000000000000000000000000000001"]
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

    it('Submitting existing solution should fail', async function () {
	let args = sol339;
	let tokenId = 201;
	let newTokenId = 202;
         await this.contract.mint(account_two, tokenId, args.proof.a, args.proof.b, args.proof.c, args.inputs);
	let owner = await this.contract.ownerOf(tokenId);
	assert.equal(owner, account_two);

	try{
	    await this.contract.mint(account_two, newTokenId, args.proof.a, args.proof.b, args.proof.c, args.inputs);
	    assert.fail("submitting existing solution should fail");
	}catch(err){
	}
	owner = await this.contract.ownerOf(newTokenId);
	assert.equal(owner, empty_address);
    })

    it('Submitting existing token id should fail', async function () {
	let tokenId = 301;
         await this.contract.mint(account_two, tokenId, sol339.proof.a, sol339.proof.b, sol339.proof.c, sol339.inputs);
	let owner = await this.contract.ownerOf(tokenId);
	assert.equal(owner, account_two);

	try{
	    await this.contract.mint(account_two, tokenId, sol4416.proof.a, sol4416.proof.b, sol4416.proof.c, sol4416.inputs);
	    assert.fail("submitting existing token id should fail");
	}catch(err){
	}
    })

    it('Submitting existing token id should fail', async function () {
	let tokenId = 301;
	await this.contract.mint(account_two, tokenId, sol339.proof.a, sol339.proof.b, sol339.proof.c, sol339.inputs);
	try{
	    await this.contract.mint(account_two, tokenId, sol5525.proof.a, sol5525.proof.b, sol5525.proof.c, sol5525.inputs);
	    assert.fail("Submitting existing token id should fail");
	}catch(err){
	}
    })

})

