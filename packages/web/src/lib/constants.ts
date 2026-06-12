export const POLYGON_AMOY = {
  chainId: 80002,
  name: "Polygon Amoy",
  rpcUrl: "https://rpc-amoy.polygon.technology",
  blockExplorer: "https://amoy.polygonscan.com",
  nativeCurrency: {
    name: "POL",
    symbol: "POL",
    decimals: 18,
  },
} as const;

export const INACTIVITY_DEFAULTS = {
  PERIOD_DAYS: 90,
  REQUIRED_APPROVALS: 2,
  PULSE_WARNING_DAYS: 30,
} as const;

export const ASSET_TYPE_LABELS = {
  ERC20: "Token",
  ERC721: "NFT",
  ERC1155: "Multi-Token",
  NATIVE: "Native Currency",
  DOCUMENT: "Document",
} as const;

export const MAX_FILE_SIZE = 100 * 1024 * 1024;

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/quicktime",
  "audio/mpeg",
  "audio/mp4",
] as const;
