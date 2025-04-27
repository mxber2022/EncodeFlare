# Game of Raffle

A beautiful Web3-powered raffle and prize spinner platform with flare RNG.

## Features

### 🎫 Raffle System

- Create secure, blockchain-verified raffles

### 🎡 Prize Spinner

- Interactive spinning wheel
- Add up to 8 custom prizes

### 🔒 Security Features

- Blockchain-verified randomness flare RNG
- Secure wallet integration
- Transparent winner selection
- Smart contract-powered operations

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Blockchain**: Flare Testnet
- **Wallet Integration**: Reown AppKit
- **Smart Contracts**: Solidity
- **Styling**: Custom Tailwind components
- **Icons**: Lucide React

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mxber2022/EncodeFlare
cd EncodeFlare
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_REOWN_PROJECT_ID=your_project_id
```

4. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Smart Contracts

The project uses two main smart contract functions:

### Random Number Generation

```solidity
function getSecureRandomNumber()
    public
    view
    returns (uint256 randomNumber, bool isSecure, uint256 timestamp)
```

### Winner Selection

```solidity
function pickRandomWinner(string[] calldata names)
    external
    returns (string memory)
```

Contract Address: `0xe1A1CFc4fAb40BFfc8E9372cBc8056F90D11F122`

## Usage

1. **Creating a Raffle**:

   - Connect your wallet
   - Enter the Twitter/X post link
   - Select winner selection method
   - Choose number of winners
   - Confirm and wait for blockchain confirmation

2. **Using Prize Spinner**:
   - Add prizes (up to 8)
   - Click "Spin" to start
   - Wait for the wheel to stop
   - View the winner announcement

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
