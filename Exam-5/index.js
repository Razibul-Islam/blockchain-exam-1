const { ethers } = require("ethers");
class PaymentChannel {
  constructor(channelAddress, signer) {
    this.channel = new ethers.Contract(channelAddress, abi, signer);
    this.signer = signer;
    this.nonce = 0;
  }
  async createPayment(amount) {
    // Bug: No nonce tracking - fixed
    this.nonce++;
    const message = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [this.channel.address, amount]
    );
    // Bug: Wrong signature method
    const messagesBytes = ethers.utils.arrayify(message);
    const signature = await this.signer.signMessage(messagesBytes);
    return { amount, signature };
  }
  async closeChannel(payment) {
    // Bug: No timeout check

    const tx = await this.channel.close(
      payment.amount,
      payment.nonce,
      payment.signature
    );
    return tx;
  }
}
