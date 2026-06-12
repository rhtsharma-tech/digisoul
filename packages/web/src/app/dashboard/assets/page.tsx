"use client";

import Link from "next/link";

const assets = [
  { id: "1", type: "token", name: "ETH", amount: "2.45 ETH", value: "$8,234.50", icon: "⟠" },
  { id: "2", type: "token", name: "USDC", amount: "5,000 USDC", value: "$5,000.00", icon: "$" },
  { id: "3", type: "nft", name: "BAYC #1234", amount: "1 NFT", value: "$12,500", icon: "🖼️" },
  { id: "4", type: "nft", name: "Azuki #567", amount: "1 NFT", value: "$3,200", icon: "🎨" },
  { id: "5", type: "document", name: "Last Will 2025.pdf", amount: "2.4 MB", value: "IPFS", icon: "📄" },
];

export default function AssetsPage() {
  return (
    <div className="min-h-screen bg-[#06070A] text-[#F8FAFC]">
      <header className="border-b border-[#1A1B2E] bg-[#06070A] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A68A3E]" />
            <span className="text-lg font-bold bg-gradient-to-r from-[#FFCC1A] to-[#C9A84C] bg-clip-text text-transparent">DigiSoul</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Assets</h1>
            <p className="text-[#94A3B8]">Manage your digital assets</p>
          </div>
          <Link href="/dashboard/assets/add" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] px-4 py-2 text-sm font-semibold text-[#06070A]">
            + Add Asset
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          {["All", "Tokens", "NFTs", "Documents"].map((filter, i) => (
            <button
              key={filter}
              className={`rounded-full px-4 py-2 text-sm ${i === 0 ? "bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]" : "bg-[#1A1B2E] text-[#94A3B8] border border-[#1A1B2E]"}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Asset List */}
        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-[#C9A84C]/20 flex items-center justify-center text-xl">
                  {asset.icon}
                </div>
                <div>
                  <p className="font-semibold">{asset.name}</p>
                  <p className="text-sm text-[#94A3B8]">{asset.amount}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{asset.value}</p>
                <p className="text-xs text-[#94A3B8] capitalize">{asset.type}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
