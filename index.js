const crypto = require("crypto");
function createMerkleTree(transactions) {
  if (transactions.length === 0) {
    return null;
  }
  while (transactions.length > 1) {
    const nextLevel = [];
    for (let i = 0; i < transactions.length; i += 2) {
      const left = transactions[i];
      const right = i + 1 < transactions.length ? transactions[i + 1] : left; // Bug 1: Index out of range solve
      const combined = left + right;
      const hashResult = crypto
        .createHash("sha256")
        .update(combined)
        .digest("hex"); // Bug 2: Missing - solve
      nextLevel.push(hashResult);
    }
    transactions = nextLevel;
  }
  return transactions[0];
}
console.log(createMerkleTree("a3adsf34qc44434vafv"));
