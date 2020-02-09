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

    describe('Pausable', function() {
	beforeEach(async function () { 
            this.contract = await RealEstateERC721Token.new({from: account_one});
        })

        it('should not be paused after deployment', async function () { 
            let paused = await this.contract.getPaused.call();
	    assert.equal(paused, false, "paused must be set to false after deployment");
        })

	it('should be able to pause the contract', async function () {
	    let result = await this.contract.pause(true, {from: account_one});
            let paused = await this.contract.getPaused.call();
	    assert.equal(paused, true, "paused must be set to true by account one");
	    assert.web3Event(result, {
		event: 'Paused',
		args: {
		    "0": account_one,
		    "__length__": 1,
		    actor: account_one
		}
	    }, 'No Paused event emitted');
        })

	it('should not be able to pause the contract if not the owner', async function () {
	    let beforeResult = await this.contract.pause(false, {from: account_one});
            let beforePaused = await this.contract.getPaused.call();
	    assert.equal(beforePaused, false, "paused must be set to false by account one");
	    assert.web3Event(beforeResult, {
		event: 'Unpaused',
		args: {
		    "0": account_one,
		    "__length__": 1,
		    actor: account_one
		}
	    }, 'No Unpaused event emitted');
	    
	    try{
		afterResult = await this.contract.pause(true, {from: account_two});
		assert.fail("pause setter should fail with the reason 'only owner can perform this operation'");
	    }catch(err){
	    }	    
            let afterPaused = await this.contract.getPaused.call();
	    assert.equal(afterPaused, false, "paused must still be set to false, becuase account two is not the owner");
        })
    });

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await RealEstateERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
        })

	it('should be able to mint new token', async function () { 

        })

	it('should get initial balance of any address as zero', async function () { 
            let result = await this.contract.balanceOf(account_one);
	    assert.equal(result, 0 , "initial balance of the owner account should be zero");
        })

	it('should get token balance', async function () { 
            
        })

        it('should return total supply', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            // use ownerOf
        })

	it('should be able to approve another address to transfer the given token id', async function () { 
            // use getApproved
        })
    });

    describe('match erc721 metadata spec', function () {
	it('should return proper name, symbol, baseTokenURI', async function () { 

        })

	// token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
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
