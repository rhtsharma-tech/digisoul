"use client";

import Link from "next/link";

const nominees = [
  { id: "1", name: "Alice Johnson", relationship: "Daughter", percentage: 60, address: "0x1234...5678" },
  { id: "2", name: "Bob Smith", relationship: "Son", percentage: 30, address: "0xABCD...EFGH" },
  { id: "3", name: "Carol Williams", relationship: "Sister", percentage: 10, address: "0x9876...5432" },
];

export default function NomineesPage() {
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
            <h1 className="text-2xl font-bold">My Nominees</h1>
            <p className="text-[#94A3B8]">Manage your beneficiaries</p>
          </div>
          <Link href="/dashboard/nominees/add" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] px-4 py-2 text-sm font-semibold text-[#06070A]">
            + Add Nominee
          </Link>
        </div>

        {/* Allocation Bar */}
        <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold">Allocation Summary</h2>
          <div className="mb-4 flex h-4 overflow-hidden rounded-full">
            <div className="bg-[#C9A84C]" style={{ width: "60%" }} />
            <div className="bg-[#6C63FF]" style={{ width: "30%" }} />
            <div className="bg-green-500" style={{ width: "10%" }} />
          </div>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />
              <span>Alice: 60%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#6C63FF]" />
              <span>Bob: 30%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>Carol: 10%</span>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold">Total: 100% allocated</p>
        </div>

        {/* Nominee List */}
        <div className="space-y-3">
          {nominees.map((nominee) => (
            <div key={nominee.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-lg font-bold text-[#C9A84C]">
                  {nominee.name[0]}
                </div>
                <div>
                  <p className="font-semibold">{nominee.name}</p>
                  <p className="text-sm text-[#94A3B8]">{nominee.relationship}</p>
                  <p className="text-xs text-[#94A3B8] font-mono">{nominee.address}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#C9A84C]">{nominee.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
