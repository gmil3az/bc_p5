var RealEstateERC721Token = artifacts.require('RealEstateERC721Token');
var util = require('util');
require('truffle-test-utils').init();

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    accounts.forEach((account, index) => console.log(`account[${index}] = ${account}`));

    describe('Ownable', function() {
	beforeEach(async function () { 
            this.contract = await RealEstateERC721Token.new({from: account_one});
        })

        it('should be able to set the first owner upon deployment', async function () { 
            let owner = await this.contract.owner.call();
	    assert.equal(owner, account_one, "Owner must be the first account passed when deploy the contract");
        })

	it('[onlyOwner] should not allow non-owner to transfer the ownership', async function () {
	    try{
		await this.contract.transferOwnership(account_three, {from: account_two});
		assert.fail("transferOwnership should fail with the reason 'only owner can perform this operation'");
	    }catch(err){
	    }
	    let owner = await this.contract.owner.call();
	    assert.equal(owner, account_one, "Owner must still be the first account");
        })

	it('should be able to transfer the ownership to another address', async function () { 
            let result = await this.contract.transferOwnership(account_two, {from: account_one});
	    let owner = await this.contract.owner.call();
	    assert.equal(owner, account_two, "Owner must be transfered to the second account");

	    assert.web3Event(result, {
		event: 'OwnershipTransfered',
		args: {
		    "0": account_one,
		    "1": account_two,
		    "__length__": 2,
		    from: account_one,
		    to: account_two
		}
	    }, 'No OwnershipTransfered event emitted');
        })
	
    });

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await RealEstateERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () { 
            
        })

        it('should get token balance', async function () { 
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await RealEstateERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})
