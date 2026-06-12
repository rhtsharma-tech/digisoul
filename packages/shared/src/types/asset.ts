export type AssetType = 'ERC20' | 'ERC721' | 'ERC1155' | 'NATIVE' | 'DOCUMENT';

export interface Asset {
  id: number;
  tokenAddress: string;
  tokenId: number;
  amount: number;
  assetType: AssetType;
  name: string;
  symbol: string;
  metadataURI: string;
  active: boolean;
  registeredAt: number;
}

export interface AssetFormData {
  assetType: AssetType;
  tokenAddress?: string;
  tokenId?: number;
  amount?: number;
  name: string;
  symbol?: string;
  metadataURI?: string;
  file?: File;
}

export interface AssetWithUSD extends Asset {
  usdValue: number;
  pricePerUnit: number;
  icon?: string;
}
