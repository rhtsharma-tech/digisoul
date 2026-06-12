#!/bin/bash

set -e

echo "🚀 Deploying smart contracts to Polygon Amoy..."

# Check if private key is set
if [ -z "$PRIVATE_KEY" ]; then
  echo "❌ PRIVATE_KEY environment variable is not set"
  exit 1
fi

# Check if Polygonscan API key is set
if [ -z "$POLYGONSCAN_API_KEY" ]; then
  echo "⚠️  POLYGONSCAN_API_KEY not set, skipping verification"
fi

cd packages/contracts

# Build contracts
echo "🔨 Building contracts..."
forge build

# Run tests
echo "🧪 Running tests..."
forge test

# Deploy
echo "📤 Deploying to Polygon Amoy..."
forge script script/Deploy.s.sol \
  --rpc-url https://rpc-amoy.polygon.technology \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify 2>/dev/null || forge script script/Deploy.s.sol \
  --rpc-url https://rpc-amoy.polygon.technology \
  --private-key $PRIVATE_KEY \
  --broadcast

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Copy the deployed contract addresses"
echo "  2. Update packages/web/src/lib/constants.ts"
echo "  3. Update packages/mobile/src/constants/addresses.ts"
echo ""
