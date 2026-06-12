# Deployment Guide

## Overview

DigiSoul can be deployed to:
- **Polygon Amoy Testnet** (recommended for development)
- **Polygon Mainnet** (for production)

## Smart Contracts Deployment

### Prerequisites

- Private key with POL tokens
- Polygonscan API key (for verification)

### Deploy to Polygon Amoy

```bash
# Set environment variables
export PRIVATE_KEY="your_private_key"
export POLYGONSCAN_API_KEY="your_api_key"

# Run deployment script
./scripts/deploy-testnet.sh
```

### Deploy to Polygon Mainnet

```bash
# Update foundry.toml with mainnet RPC
# Deploy with mainnet private key
forge script script/Deploy.s.sol \
  --rpc-url https://polygon-rpc.com \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

## Web Application Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Configure:
   - Framework: Next.js
   - Root Directory: packages/web
   - Build Command: npm run build
   - Output Directory: .next
5. Add environment variables
6. Deploy

### Manual Deployment

```bash
cd packages/web
npm run build
npx vercel --prod
```

## Mobile Application Deployment

### iOS (TestFlight)

```bash
cd packages/mobile

# Build for iOS
eas build --platform ios

# Submit to TestFlight
eas submit --platform ios
```

### Android (Play Store)

```bash
cd packages/mobile

# Build for Android
eas build --platform android

# Submit to Play Store
eas submit --platform android
```

## Post-Deployment

### Update Contract Addresses

After deploying contracts, update the addresses in:

1. `packages/web/src/lib/constants.ts`
2. `packages/mobile/src/constants/addresses.ts`

### Verify Contracts

```bash
cd packages/contracts
./scripts/verify-contracts.sh
```

### Test the Deployment

1. Connect wallet to Polygon Amoy
2. Create a vault
3. Add assets and nominees
4. Create a will
5. Test pulse check-in
