"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Coins,
  Image,
  FileText,
  Upload,
  Link as LinkIcon,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";

type AssetType = "ERC20" | "ERC721" | "Document";
type WizardStep = 0 | 1 | 2;

interface ERC20FormData {
  name: string;
  symbol: string;
  contractAddress: string;
  network: string;
  amount: string;
}

interface ERC721FormData {
  name: string;
  contractAddress: string;
  tokenId: string;
  network: string;
  imageUrl: string;
}

interface DocumentFormData {
  name: string;
  description: string;
  file: File | null;
  ipfsHash: string;
}

const networks = [
  "Ethereum Mainnet",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Base",
];

const assetTypeOptions = [
  {
    type: "ERC20" as AssetType,
    label: "ERC20 Token",
    description: "Fungible tokens like ETH, USDC, etc.",
    icon: Coins,
    color: "text-blue-500 bg-blue-500/20",
  },
  {
    type: "ERC721" as AssetType,
    label: "ERC721 NFT",
    description: "Non-fungible tokens and collectibles",
    icon: Image,
    color: "text-violet-500 bg-violet-500/20",
  },
  {
    type: "Document" as AssetType,
    label: "Document",
    description: "Legal documents, certificates, wills",
    icon: FileText,
    color: "text-green-500 bg-green-500/20",
  },
];

export default function AddAssetPage() {
  const [step, setStep] = useState<WizardStep>(0);
  const [assetType, setAssetType] = useState<AssetType | null>(null);
  const [erc20Data, setErc20Data] = useState<ERC20FormData>({
    name: "",
    symbol: "",
    contractAddress: "",
    network: "Ethereum Mainnet",
    amount: "",
  });
  const [erc721Data, setErc721Data] = useState<ERC721FormData>({
    name: "",
    contractAddress: "",
    tokenId: "",
    network: "Ethereum Mainnet",
    imageUrl: "",
  });
  const [docData, setDocData] = useState<DocumentFormData>({
    name: "",
    description: "",
    file: null,
    ipfsHash: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const canProceed = (): boolean => {
    if (step === 0) return assetType !== null;
    if (step === 1) {
      if (assetType === "ERC20")
        return !!(erc20Data.name && erc20Data.contractAddress && erc20Data.amount);
      if (assetType === "ERC721")
        return !!(erc721Data.name && erc721Data.contractAddress && erc721Data.tokenId);
      if (assetType === "Document") return !!(docData.name && (docData.file || docData.ipfsHash));
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const getStepTitle = () => {
    if (step === 0) return "Select Asset Type";
    if (step === 1) return "Enter Details";
    return "Review & Confirm";
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/assets">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add Asset</h1>
            <p className="text-muted-foreground">
              Add a new digital asset to your vault.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  s < step
                    ? "bg-gold-500 text-navy-900"
                    : s === step
                      ? "bg-gold-500/20 text-gold-500 border border-gold-500/50"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="h-4 w-4" /> : s + 1}
              </div>
              {s < 2 && (
                <div
                  className={`h-0.5 w-12 ${
                    s < step ? "bg-gold-500" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {isComplete ? (
          <Card className="glass border-white/10">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="mt-6 text-xl font-bold text-foreground">
                Asset Added Successfully
              </h2>
              <p className="mt-2 text-muted-foreground">
                Your {assetType} asset has been added to your vault.
              </p>
              <div className="mt-8 flex gap-4">
                <Link href="/dashboard/assets">
                  <Button variant="glass">View All Assets</Button>
                </Link>
                <Button
                  variant="gold"
                  onClick={() => {
                    setStep(0);
                    setAssetType(null);
                    setIsComplete(false);
                  }}
                >
                  Add Another Asset
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle>{getStepTitle()}</CardTitle>
            </CardHeader>
            <CardContent>
              {step === 0 && (
                <div className="grid gap-3">
                  {assetTypeOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setAssetType(option.type)}
                      className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                        assetType === option.type
                          ? "border-gold-500/50 bg-gold-500/10"
                          : "border-border hover:border-gold-500/30 hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${option.color}`}
                      >
                        <option.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {option.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {assetType === option.type && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500">
                          <Check className="h-3.5 w-3.5 text-navy-900" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && assetType === "ERC20" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="erc20-name">Token Name</Label>
                    <Input
                      id="erc20-name"
                      placeholder="e.g. Ethereum"
                      value={erc20Data.name}
                      onChange={(e) =>
                        setErc20Data({ ...erc20Data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="erc20-symbol">Symbol</Label>
                      <Input
                        id="erc20-symbol"
                        placeholder="e.g. ETH"
                        value={erc20Data.symbol}
                        onChange={(e) =>
                          setErc20Data({ ...erc20Data, symbol: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="erc20-amount">Amount</Label>
                      <Input
                        id="erc20-amount"
                        placeholder="e.g. 2.45"
                        value={erc20Data.amount}
                        onChange={(e) =>
                          setErc20Data({ ...erc20Data, amount: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="erc20-contract">Contract Address</Label>
                    <Input
                      id="erc20-contract"
                      placeholder="0x..."
                      className="font-mono"
                      value={erc20Data.contractAddress}
                      onChange={(e) =>
                        setErc20Data({
                          ...erc20Data,
                          contractAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="erc20-network">Network</Label>
                    <select
                      id="erc20-network"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={erc20Data.network}
                      onChange={(e) =>
                        setErc20Data({ ...erc20Data, network: e.target.value })
                      }
                    >
                      {networks.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 1 && assetType === "ERC721" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nft-name">NFT Name</Label>
                    <Input
                      id="nft-name"
                      placeholder="e.g. CryptoPunk #7804"
                      value={erc721Data.name}
                      onChange={(e) =>
                        setErc721Data({ ...erc721Data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nft-contract">Contract Address</Label>
                      <Input
                        id="nft-contract"
                        placeholder="0x..."
                        className="font-mono"
                        value={erc721Data.contractAddress}
                        onChange={(e) =>
                          setErc721Data({
                            ...erc721Data,
                            contractAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nft-token-id">Token ID</Label>
                      <Input
                        id="nft-token-id"
                        placeholder="e.g. 7804"
                        value={erc721Data.tokenId}
                        onChange={(e) =>
                          setErc721Data({
                            ...erc721Data,
                            tokenId: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nft-network">Network</Label>
                    <select
                      id="nft-network"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={erc721Data.network}
                      onChange={(e) =>
                        setErc721Data({ ...erc721Data, network: e.target.value })
                      }
                    >
                      {networks.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nft-image">Image URL (optional)</Label>
                    <Input
                      id="nft-image"
                      placeholder="https://..."
                      value={erc721Data.imageUrl}
                      onChange={(e) =>
                        setErc721Data({
                          ...erc721Data,
                          imageUrl: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {step === 1 && assetType === "Document" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-name">Document Name</Label>
                    <Input
                      id="doc-name"
                      placeholder="e.g. Last Will & Testament"
                      value={docData.name}
                      onChange={(e) =>
                        setDocData({ ...docData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-desc">Description (optional)</Label>
                    <Input
                      id="doc-desc"
                      placeholder="Brief description of the document"
                      value={docData.description}
                      onChange={(e) =>
                        setDocData({ ...docData, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload File</Label>
                    <div className="flex items-center gap-4">
                      <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-muted-foreground transition-colors hover:border-gold-500/50 hover:text-foreground">
                        <Upload className="h-5 w-5" />
                        <span className="text-sm">
                          {docData.file ? docData.file.name : "Choose file or drag & drop"}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) =>
                            setDocData({
                              ...docData,
                              file: e.target.files?.[0] || null,
                            })
                          }
                        />
                      </label>
                      {docData.file && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDocData({ ...docData, file: null })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        or
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-ipfs">IPFS Hash</Label>
                    <Input
                      id="doc-ipfs"
                      placeholder="Qm..."
                      className="font-mono"
                      value={docData.ipfsHash}
                      onChange={(e) =>
                        setDocData({ ...docData, ipfsHash: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">Asset Type</p>
                    <p className="font-medium text-foreground">{assetType}</p>
                  </div>
                  {assetType === "ERC20" && (
                    <>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Token</p>
                        <p className="font-medium text-foreground">
                          {erc20Data.name} ({erc20Data.symbol})
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">
                          {erc20Data.amount}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Contract</p>
                        <p className="font-mono text-sm text-foreground break-all">
                          {erc20Data.contractAddress}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Network</p>
                        <p className="font-medium text-foreground">
                          {erc20Data.network}
                        </p>
                      </div>
                    </>
                  )}
                  {assetType === "ERC721" && (
                    <>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">NFT</p>
                        <p className="font-medium text-foreground">
                          {erc721Data.name}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">
                          Contract / Token ID
                        </p>
                        <p className="font-mono text-sm text-foreground break-all">
                          {erc721Data.contractAddress} / #{erc721Data.tokenId}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Network</p>
                        <p className="font-medium text-foreground">
                          {erc721Data.network}
                        </p>
                      </div>
                    </>
                  )}
                  {assetType === "Document" && (
                    <>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">
                          Document Name
                        </p>
                        <p className="font-medium text-foreground">
                          {docData.name}
                        </p>
                      </div>
                      {docData.description && (
                        <div className="rounded-lg border border-border p-4">
                          <p className="text-sm text-muted-foreground">
                            Description
                          </p>
                          <p className="font-medium text-foreground">
                            {docData.description}
                          </p>
                        </div>
                      )}
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">Source</p>
                        <p className="font-medium text-foreground">
                          {docData.file
                            ? docData.file.name
                            : `IPFS: ${docData.ipfsHash}`}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button
                  variant="glass"
                  onClick={() => setStep((s) => Math.max(0, s - 1) as WizardStep)}
                  disabled={step === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                {step < 2 ? (
                  <Button
                    variant="gold"
                    onClick={() => setStep((s) => (s + 1) as WizardStep)}
                    disabled={!canProceed()}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="gold"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Adding Asset..."
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Add Asset
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
