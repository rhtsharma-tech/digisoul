export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidPercentage(percentage: number): boolean {
  return Number.isInteger(percentage) && percentage > 0 && percentage <= 10000;
}

export function isValidIPFSHash(hash: string): boolean {
  return /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|bafy[a-z0-9]{50,})/.test(hash);
}

export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

export function validateWillAllocations(
  allocations: { nomineeId: number; allocation: number }[]
): { valid: boolean; error?: string } {
  const total = allocations.reduce((sum, a) => sum + a.allocation, 0);
  if (total > 10000) {
    return { valid: false, error: 'Total allocation exceeds 100%' };
  }

  const nomineeIds = allocations.map((a) => a.nomineeId);
  const uniqueIds = new Set(nomineeIds);
  if (nomineeIds.length !== uniqueIds.size) {
    return { valid: false, error: 'Duplicate nominee allocations' };
  }

  return { valid: true };
}
