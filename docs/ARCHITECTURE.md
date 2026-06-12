# Architecture

## System Overview

DigiSoul is a decentralized digital inheritance platform built on Polygon Amoy testnet. The system consists of four main components:

1. **Smart Contracts** - On-chain logic for asset management, nominee system, will registry, and inheritance control
2. **Web Application** - Next.js 15 frontend for desktop users
3. **Mobile Application** - Expo React Native app for iOS and Android
4. **Shared Package** - Common types and utilities

## Smart Contract Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DigiSoulFactory                          │
│  (Entry point - creates user vaults)                        │
├─────────────────────────────────────────────────────────────┤
│         ┌──────────────────────────────────────┐           │
│         │         User Vault (per user)         │           │
│         │  ┌────────────┐  ┌────────────────┐  │           │
│         │  │AssetVault  │  │NomineeManager  │  │           │
│         │  └────────────┘  └────────────────┘  │           │
│         │  ┌────────────┐  ┌────────────────┐  │           │
│         │  │WillRegistry│  │InheritanceCtrl │  │           │
│         │  └────────────┘  └────────────────┘  │           │
│         └──────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### DigiSoulFactory
- Entry point for creating user vaults
- Deploys all contract instances per user
- Tracks vault ownership

### AssetVault
- Manages digital assets (ERC20, ERC721, ERC1155, Native, Document)
- Transfers assets to nominees on inheritance
- ReentrancyGuard protection

### NomineeManager
- Manages beneficiaries
- Tracks allocation percentages (basis points)
- Prevents duplicate nominees

### WillRegistry
- Creates and manages digital wills
- Stores personal messages and media attachments
- Allocates assets to nominees

### InheritanceController
- Orchestrates inheritance claims
- Manages inactivity pulse
- Multi-sig approval system
- Executes asset transfers

## Data Flow

1. User connects wallet
2. User creates vault via DigiSoulFactory
3. User registers assets in AssetVault
4. User adds nominees in NomineeManager
5. User creates will in WillRegistry
6. User periodically pulses to prove activity
7. If user becomes inactive, nominees can initiate claim
8. Approvers verify and approve claim
9. Assets are transferred to nominees

## Security Model

- **Non-custodial**: Users maintain full control of their keys
- **On-chain logic**: All inheritance rules enforced by smart contracts
- **Multi-sig**: Claims require multiple approvals
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Access Control**: Role-based permissions
