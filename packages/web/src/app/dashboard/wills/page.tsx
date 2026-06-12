"use client";

import Link from "next/link";

const wills = [
  { id: "1", title: "Family Legacy Will", status: "ACTIVE", assets: 5, nominees: 3, value: "$124,500", created: "Jan 15, 2025" },
  { id: "2", title: "Emergency Access", status: "DRAFT", assets: 2, nominees: 1, value: "$45,000", created: "Feb 10, 2025" },
];

export default function WillsPage() {
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
            <h1 className="text-2xl font-bold">My Wills</h1>
            <p className="text-[#94A3B8]">Manage your digital wills</p>
          </div>
          <Link href="/dashboard/wills/create" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] px-4 py-2 text-sm font-semibold text-[#06070A]">
            + Create Will
          </Link>
        </div>

        {/* Will List */}
        <div className="space-y-4">
          {wills.map((will) => (
            <div key={will.id} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{will.title}</h2>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${will.status === "ACTIVE" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}`}>
                  {will.status}
                </span>
              </div>
              <div className="mb-4 flex gap-6 text-sm text-[#94A3B8]">
                <span>💎 {will.assets} assets</span>
                <span>👥 {will.nominees} nominees</span>
                <span>💰 {will.value}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#1A1B2E] pt-4">
                <span className="text-sm text-[#94A3B8]">Created: {will.created}</span>
                <div className="flex gap-2">
                  <button className="rounded-md border border-[#1A1B2E] px-3 py-1 text-sm hover:bg-white/5">View</button>
                  <button className="rounded-md border border-[#1A1B2E] px-3 py-1 text-sm hover:bg-white/5">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
