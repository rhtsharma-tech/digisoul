export interface Nominee {
  id: number;
  walletAddress: string;
  name: string;
  relationship: string;
  percentage: number;
  contactInfo: string;
  active: boolean;
  addedAt: number;
}

export interface NomineeFormData {
  walletAddress: string;
  name: string;
  relationship: string;
  percentage: number;
  contactInfo?: string;
}

export const RELATIONSHIP_OPTIONS = [
  'Spouse',
  'Daughter',
  'Son',
  'Father',
  'Mother',
  'Sister',
  'Brother',
  'Granddaughter',
  'Grandson',
  'Friend',
  'Trustee',
  'Other',
] as const;

export type Relationship = (typeof RELATIONSHIP_OPTIONS)[number];
