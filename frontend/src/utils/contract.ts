import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xfA15525D777b5dDf558B3C414f2F3042119eb370";

const ABI = [
  "function getSecureRandomNumber() public view returns (uint256 randomNumber, bool isSecure, uint256 timestamp)",
  "function pickRandomWinner(string[] calldata names) external returns (string memory)",
  "event WinnerSelected(string[] names, string winner, address sender, uint256 timestamp)",
];

const getProvider = async () => {
  if (!window.ethereum) {
    throw new Error(
      "No injected provider found. Please install a Web3 wallet."
    );
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const getRandomNumber = async (): Promise<number> => {
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const [randomNumber, isSecure] = await contract.getSecureRandomNumber();
    console.log("Random number from contract:", randomNumber);

    if (!isSecure) {
      throw new Error("Random number is not secure");
    }

    // Convert the big number to a regular number between 0 and 1
    return (Number(randomNumber) % 1000000) / 1000000;
  } catch (error) {
    console.error("Error getting random number:", error);
    // Fallback to Math.random() if contract call fails
    return Math.random();
  }
};

export const selectWinner = async (names: string[]): Promise<string> => {
  try {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const tx = await contract.pickRandomWinner(names);
    const receipt = await tx.wait();

    // Get winner from event logs
    const event = receipt.logs.find(
      (log) =>
        log.topics[0] === contract.interface.getEventTopic("WinnerSelected")
    );

    if (!event) {
      throw new Error("Winner selection event not found");
    }

    const decodedEvent = contract.interface.decodeEventLog(
      "WinnerSelected",
      event.data,
      event.topics
    );

    return decodedEvent.winner;
  } catch (error) {
    console.error("Error selecting winner:", error);
    throw error;
  }
};
