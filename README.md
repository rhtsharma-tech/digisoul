# DigiSoul

Secure Your Digital Legacy — Blockchain-based digital inheritance platform.

## Overview

DigiSoul is a decentralized platform that allows users to:
- Store digital assets (tokens, NFTs, documents) in a secure blockchain vault
- Designate nominees (beneficiaries) for their digital assets
- Create smart wills with personal messages and media attachments
- Set inheritance conditions with inactivity timers and multi-sig approval

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contracts | Solidity + Foundry |
| Web Frontend | Next.js 15 + shadcn/ui |
| Mobile App | Expo React Native |
| Shared Package | TypeScript |
| Blockchain | Polygon Amoy Testnet |
| File Storage | IPFS (Filebase) |
| Hosting | Vercel (Web) |

## Project Structure

```
DigiSoul/
├── packages/
│   ├── contracts/     # Foundry + Solidity smart contracts
│   ├── web/           # Next.js 15 web application
│   ├── mobile/        # Expo React Native mobile app
│   └── shared/        # Shared types and utilities
├── docs/              # Documentation
└── scripts/           # Deployment scripts
```

## Getting Started

### Prerequisites

- Node.js >= 20
- npm or yarn
- Foundry (for smart contracts)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/digisoul.git
cd digisoul

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Development

```bash
# Start all packages in development mode
npm run dev

# Start only the web app
cd packages/web && npm run dev

# Start only the mobile app
cd packages/mobile && npm run dev
```

### Smart Contracts

```bash
# Build contracts
cd packages/contracts && npm run build

# Run tests
npm run test

# Deploy to Polygon Amoy
npm run deploy:amoy
```

## Features

### Digital Vault
- Register ERC-20 tokens
- Register ERC-721 NFTs
- Register ERC-1155 multi-tokens
- Store documents on IPFS
- Track total portfolio value

### Nominee System
- Add multiple nominees
- Set allocation percentages
- Track relationships
- Encrypted contact information

### Smart Wills
- Create and manage wills
- Attach documents and media
- Set personal messages
- Allocate assets to nominees

### Inheritance Controller
- Inactivity-based trigger
- Multi-sig approval system
- Automated asset transfer
- Claim status tracking

## Security

- Non-custodial architecture
- OpenZeppelin contracts
- ReentrancyGuard protection
- Role-based access control
- IPFS decentralized storage

## Deployment

### Web (Vercel)

```bash
# Build and deploy
cd packages/web
npm run build
vercel --prod
```

### Smart Contracts (Polygon Amoy)

```bash
cd packages/contracts
forge script script/Deploy.s.sol \
  --rpc-url https://rpc-amoy.polygon.technology \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

### Mobile (Expo)

```bash
cd packages/mobile
eas build --platform ios
eas build --platform android
```

## License

MIT
