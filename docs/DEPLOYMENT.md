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

## CI/CD Pipeline

### GitHub Actions Workflows

#### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push to `main` and pull requests:

1. **Lint** - Runs TypeScript checks across all packages
2. **Test Contracts** - Runs Foundry tests for smart contracts
3. **Typecheck Shared** - Validates shared package types
4. **Build Web** - Builds Next.js application and verifies output

#### Deploy Workflow (`.github/workflows/deploy.yml`)

Triggers on pushes to `main` when these paths change:
- `packages/web/**`
- `packages/shared/**`
- `turbo.json`
- `.github/workflows/deploy.yml`

**Steps:**
1. Install dependencies with `--legacy-peer-deps`
2. Build shared package
3. Build web package
4. Verify build output exists
5. Deploy to Vercel production
6. Report deployment status

### Required GitHub Secrets

Configure these in GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel authentication token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID for web app |

### Vercel Configuration

The `vercel.json` in the repo root configures:
- Framework: Next.js
- Install command: `npm install --legacy-peer-deps`
- Build command: Builds shared package first, then web
- Output directory: `.next`
- Ignore command: Uses `turbo-ignore` for smart change detection

### Troubleshooting CI/CD

**Build fails with peer dependency errors:**
- Ensure `--legacy-peer-deps` is used in install commands

**Shared package types not found:**
- Ensure `npm run build --workspace=packages/shared` runs before web build

**Vercel deployment fails:**
- Check that all three secrets are configured correctly
- Verify the Vercel project is linked to the correct repository
- Ensure the rootDirectory setting in Vercel matches `packages/web`

**Deploy doesn't trigger:**
- Verify the push includes changes to `packages/web/**` or `packages/shared/**`
- Check that the workflow file hasn't been modified to break the trigger

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
