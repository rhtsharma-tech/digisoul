#!/bin/bash

set -e

echo "🔍 Verifying smart contracts on Polygonscan..."

if [ -z "$POLYGONSCAN_API_KEY" ]; then
  echo "❌ POLYGONSCAN_API_KEY environment variable is not set"
  exit 1
fi

cd packages/contracts

# Get contract addresses from deployment
CONTRACTS_DIR="out"

if [ ! -d "$CONTRACTS_DIR" ]; then
  echo "❌ Contract artifacts not found. Run deploy first."
  exit 1
fi

echo "📋 Verifying contracts..."
echo "Please run the following commands manually with your contract addresses:"
echo ""
echo "forge verify-contract <ADDRESS> DigiSoulFactory \\"
echo "  --chain-id 80002 \\"
echo "  --etherscan-api-key $POLYGONSCAN_API_KEY"
echo ""
echo "forge verify-contract <ADDRESS> AssetVault \\"
echo "  --chain-id 80002 \\"
echo "  --etherscan-api-key $POLYGONSCAN_API_KEY"
echo ""

echo "✅ Verification instructions displayed"
