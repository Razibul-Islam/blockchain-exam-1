const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());

let blockchain = [{ index: 0, data: "Genesis Block", pendingTransactions: [] }];
let peers = [];

app.get("/blocks", (req, res) => {
  try {
    res.json(blockchain); // Bug: No error handling - fixed
  } catch (err) {
    console.error("error during getting blocks", err);
  }
});

app.post("/transaction", (req, res) => {
  const transaction = req.body; // Bug: No body parser
  // Bug: No validation - fixed
  if (
    !transaction ||
    !transaction.from ||
    !transaction.to ||
    !transaction.amount
  ) {
    return res.status(500).json({ message: "Invalid Transaction" });
  }
  blockchain.pendingTransactions.push(transaction);
  res.send("Transaction added");
});

app.post("/mine", async (req, res) => {
  // Bug: Synchronous mining blocks event loop -fixed
  try {
    const newBlock = {
      index: blockchain.length,
      timestamp: Date.now(),
      transactions: pendingTransactions,
      previousHash: blockchain[blockchain.length - 1].hash || "0",
      hash: Math.random().toString(64).substring(2),
    };
    blockchain.push(newBlock);
    res.json(newBlock);
  } catch (err) {
    console.error("Error during mining: ", err);
  }
});

// Bug: No peer synchronization-fixed
app.listen(3000, () => {
  console.log("This app is running at 3000");
});
