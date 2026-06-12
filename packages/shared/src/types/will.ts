export type WillStatus = 'DRAFT' | 'ACTIVE' | 'EXECUTED' | 'REVOKED';

export interface Will {
  id: number;
  title: string;
  documentHash: string;
  personalMessage: string;
  status: WillStatus;
  createdAt: number;
  updatedAt: number;
  executedAt: number;
}

export interface WillAssetAllocation {
  willId: number;
  assetId: number;
  nomineeId: number;
  allocation: number;
}

export interface MediaAttachment {
  id: number;
  willId: number;
  ipfsHash: string;
  mediaType: 'video' | 'audio' | 'image' | 'document';
  description: string;
  uploadedAt: number;
}

export interface WillFormData {
  title: string;
  personalMessage: string;
  documentHash?: string;
  allocations: WillAssetAllocation[];
  media: MediaAttachment[];
}

export interface WillWithDetails extends Will {
  allocations: WillAssetAllocation[];
  media: MediaAttachment[];
  totalAllocation: number;
}
