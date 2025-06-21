const crypto = require("crypto");
class Block {
  constructor(transactions, previousHash) {
    // Your implementation here
    // Should include: timestamp, transactions, previousHash, nonce, hash
    this.timeStamp = Date.now();
    this.nonce = 0;
    this.hash = this.calculateHash();
    this.transactions = transactions;
    this.previousHash = previousHash;
  }
  calculateHash() {
    // Your implementation here
    const hash =
      this.timeStamp +
      JSON.stringify(this.transactions) +
      this.previousHash +
      this.nonce;
    return crypto.createHash("sha256").update(hash).digest("hex");
  }
}
class Blockchain {
  constructor() {
    // Your implementation here
    // Initialize with genesis block
  }
  mineBlock(transactions, difficulty = 4) {
    // Your implementation here
    // Implement PoW mining
    const newBlock = new Block(transactions, this.getLastBlock().hash);
    return newBlock;
  }
  isValidChain() {
    // Your implementation here
    // Validate entire chain
  }
}
module.exports = { Block, Blockchain };
