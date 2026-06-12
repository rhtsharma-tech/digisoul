#!/bin/bash

set -e

echo "🚀 Setting up DigiSoul..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js 20 or higher is required"
  exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env.local ]; then
  echo "📝 Creating .env.local from .env.example..."
  cp .env.example .env.local
  echo "⚠️  Please edit .env.local with your API keys"
fi

# Install Foundry (if not installed)
if ! command -v forge &> /dev/null; then
  echo "🔨 Installing Foundry..."
  curl -L https://foundry.paradigm.xyz | bash
  source ~/.bashrc
  foundryup
fi

echo "✅ Foundry version: $(forge --version)"

# Build shared package
echo "📦 Building shared package..."
cd packages/shared && npm run build && cd ../..

# Build contracts
echo "🔨 Building smart contracts..."
cd packages/contracts && npm run build && cd ../..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "To deploy contracts:"
echo "  cd packages/contracts && npm run deploy:amoy"
echo ""
