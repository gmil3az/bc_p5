# My Project

## My versions

- Truffle v5.1.10
- Node v10.18.0
- Canache CLI v6.8.1
- Web3 v1.2.4

## How to run the tests

Run `npm install`

Run ganache cli:

`ganache-cli -a 30 -l 8000000`

Compile and deploy contracts on the local environment:

`truffle test`

## Where is my deployed contract on Rinkeby?



## Where to see my OpenSea listing?



## How to install Zokrates

for Linux, MacOS and FreeBSD:

`curl -LSfs get.zokrat.es | sh`

I've committed my Zokrates resources to this Git repo, please go to `./zokrates/code/square/*`. If you want to generate a new proof, you can run the following commands:

`./zokrates compute-witness -a 10 100`

`./zokrates generate-proof`

It will generate a new proof.json which can be used in `./eth-contracts/test/TestSquareVerifier.js` or `./eth-contracts/test/TestSolnSquareVerifier.js`


# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
