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

    // Get the event signature hash
    const eventSignature = "WinnerSelected(string[],string,address,uint256)";
    const eventTopic = ethers.id(eventSignature);

    // Find the event
    const event = receipt.logs.find((log: any) => log.topics[0] === eventTopic);
    console.log("event: ", event);

    if (!event) {
      throw new Error("Winner selection event not found");
    }

    // Decode the event data
    const decodedData = contract.interface.parseLog({
      topics: event.topics,
      data: event.data,
    });

    return (
      decodedData?.args?.winner ||
      names[Math.floor(Math.random() * names.length)]
    );
  } catch (error) {
    console.error("Error selecting winner:", error);
    // Fallback to random selection if contract call fails
    return names[Math.floor(Math.random() * names.length)];
  }
};
