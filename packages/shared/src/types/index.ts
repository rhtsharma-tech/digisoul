export type { Asset, AssetFormData, AssetWithUSD, AssetType } from './asset';
export type {
  Nominee,
  NomineeFormData,
  Relationship,
} from './nominee';
export { RELATIONSHIP_OPTIONS } from './nominee';
export type {
  Will,
  WillFormData,
  WillStatus,
  WillAssetAllocation,
  WillWithDetails,
  MediaAttachment,
} from './will';
export type {
  Claim,
  ClaimStatus,
  PulseHistory,
  InheritanceSettings,
} from './inheritance';

export interface User {
  address: string;
  ensName?: string;
  avatar?: string;
  createdAt: number;
}

export interface Transaction {
  hash: string;
  type: 'ASSET_ADDED' | 'NOMINEE_ADDED' | 'WILL_CREATED' | 'PULSE' | 'CLAIM';
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  details: string;
}
