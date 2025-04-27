import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { flareTestnet } from "@reown/appkit/networks";

// Get projectId from environment variables
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

if (!projectId) {
  throw new Error("VITE_REOWN_PROJECT_ID is not defined");
}

// Configure networks
export const networks = [flareTestnet];

// Configure metadata
const metadata = {
  name: "Gameof",
  description: "",
  url: window.location.origin,
  icons: [""],
};

// Create and export AppKit instance
export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});
