# Setup Guide

## Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Git**
- **Foundry** (for smart contract development)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/digisoul.git
cd digisoul
```

### 2. Run Setup Script

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

This will:
- Check Node.js version
- Install all dependencies
- Create `.env.local` from template
- Install Foundry (if not present)
- Build shared package
- Build smart contracts

### 3. Configure Environment

Edit `.env.local` with your API keys:

```env
# Smart Contracts
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
PRIVATE_KEY=your_private_key_here
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Web App
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_FILEBASE_API_KEY=your_filebase_api_key
```

### 4. Start Development

```bash
npm run dev
```

This will start:
- Web app at http://localhost:3000
- Mobile app (scan QR code with Expo Go)

## Manual Setup

### Install Dependencies

```bash
npm install
```

### Build Shared Package

```bash
cd packages/shared
npm run build
```

### Deploy Smart Contracts

```bash
cd packages/contracts
npm run build
npm run deploy:amoy
```

### Start Web App

```bash
cd packages/web
npm run dev
```

### Start Mobile App

```bash
cd packages/mobile
npm run dev
```

## API Keys

### WalletConnect
1. Go to https://cloud.walletconnect.com
2. Create a new project
3. Copy the Project ID

### Alchemy
1. Go to https://www.alchemy.com
2. Create a new app
3. Select Polygon Amoy network
4. Copy the API Key

### Filebase (IPFS)
1. Go to https://filebase.com
2. Create an account
3. Go to API Keys
4. Create a new key

### Polygonscan
1. Go to https://polygonscan.com
2. Create an account
3. Go to API Keys
4. Create a new key
