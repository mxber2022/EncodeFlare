import { Winner, SelectionBasis } from "../types";
import { selectWinner } from "./contract";

// Mock data for winners
const MOCK_USERS = [
  {
    id: "1",
    handle: "JoshRoomsburg",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1825988580386172929/kPkLWI00_400x400.jpg",
  },
  {
    id: "2",
    handle: "KrypMeta",
    avatarUrl:
      "	https://pbs.twimg.com/profile_images/1877701564342599680/QKbwZzj1_400x400.jpg",
  },
  {
    id: "3",
    handle: "XRP_GAMER",
    avatarUrl:
      "	https://pbs.twimg.com/profile_images/1511623688076115971/PhSj-YQ2_400x400.jpg",
  },
  {
    id: "4",
    handle: "Quicksh78283553",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    handle: "defi_expert",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1491478995807846403/mVgXtJkS_400x400.jpg",
  },
];

/**
 * This function calls the smart contract to select winners.
 */
export const mockWinnerSelection = async (
  twitterLink: string,
  selectionBasis: SelectionBasis,
  winnerCount: number
): Promise<Winner[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  let selectedWinners: Winner[] = [];

  try {
    // Get all usernames
    const usernames = MOCK_USERS.map((user) => user.handle);

    // Select winners one by one using the contract
    for (let i = 0; i < winnerCount; i++) {
      // Remove already selected winners from the pool
      const remainingUsers = usernames.filter(
        (username) =>
          !selectedWinners.find((winner) => winner.handle === username)
      );

      if (remainingUsers.length === 0) break;

      // Call contract to select winner
      const winnerUsername = await selectWinner(remainingUsers);

      // Find the corresponding user data
      const winner = MOCK_USERS.find((user) => user.handle === winnerUsername);
      if (winner) {
        selectedWinners.push(winner);
      }
    }
  } catch (error) {
    console.error("Error selecting winners:", error);
    throw error; // Re-throw to handle in the UI
  }

  return selectedWinners;
};
