export type ClaimStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED' | 'CANCELLED';

export interface Claim {
  willId: number;
  initiatedBy: string;
  status: ClaimStatus;
  approvals: number;
  requiredApprovals: number;
  createdAt: number;
  approvedAt: number;
  executedAt: number;
  rejectionReason: string;
}

export interface PulseHistory {
  timestamp: number;
  txHash: string;
}

export interface InheritanceSettings {
  inactivityPeriodDays: number;
  requiredApprovals: number;
  approvers: string[];
}
