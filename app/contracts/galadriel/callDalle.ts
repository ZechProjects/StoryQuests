// Import ethers from Hardhat package
import express from "express";
import cors from "cors"; // Import the 'cors' package

const app = express();
const port = process.env.PORT || 3000;

const { ethers } = require("hardhat");

async function main(message: string) {
  const contractABI = [
    "function initializeDalleCall(string memory message) public returns (uint)",
    "function lastResponse() public view returns (string)",
  ];

  if (!process.env.QUICKSTART_CONTRACT_ADDRESS) {
    throw new Error("QUICKSTART_CONTRACT_ADDRESS env variable is not set.");
  }

  const contractAddress = process.env.QUICKSTART_CONTRACT_ADDRESS;
  const [signer] = await ethers.getSigners();

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // The content of the image you want to generate
  //const message = await getUserInput();

  // Call the startChat function
  const transactionResponse = await contract.initializeDalleCall(message);
  const receipt = await transactionResponse.wait();
  console.log(
    `Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`
  );
  console.log(`Image generation started with message: "${message}"`);

  // loop and sleep by 1000ms, and keep printing `lastResponse` in the contract.
  let lastResponse = await contract.lastResponse();
  let newResponse = lastResponse;

  // print w/o newline
  console.log("Waiting for response: ");
  while (newResponse === lastResponse) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    newResponse = await contract.lastResponse();
    console.log(".");
  }

  console.log(`Image generation completed, image URL: ${newResponse}`);
  return { url: newResponse };
}

// Enable CORS with wildcard origin for development purposes
app.use(cors({ origin: "*" })); // Adjust origin for production

app.get("/generate_image", async (req, res) => {
  try {
    const message = req.query.message as string; // Access the 'message' parameter
    if (!message) {
      // Handle the case where 'message' is missing
      return res.status(400).send('Missing required parameter "message"');
    }

    const result = await main(message);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
