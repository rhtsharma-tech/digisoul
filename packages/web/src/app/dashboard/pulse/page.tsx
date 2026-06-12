"use client";

import Link from "next/link";

export default function PulsePage() {
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Inactivity Pulse</h1>
          <p className="text-[#94A3B8]">Check in to prove you're still active</p>
        </div>

        <div className="mx-auto max-w-md">
          {/* Countdown Ring */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
            <div className="relative mx-auto mb-6">
              <svg className="h-48 w-48 -rotate-90">
                <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" className="text-[#1A1B2E]" />
                <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="553" strokeDashoffset="276" className="text-[#C9A84C]" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold">45</span>
                <span className="text-lg text-[#94A3B8]">days remaining</span>
              </div>
            </div>

            <p className="mb-2 text-[#94A3B8]">Last pulse: March 15, 2025</p>
            <p className="mb-6 text-[#94A3B8]">Next deadline: June 13, 2025</p>

            <button className="w-full rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] py-3 text-lg font-semibold text-[#06070A] hover:from-[#FFCC1A] hover:to-[#C9A84C]">
              ⏰ Check In Now
            </button>

            <div className="mt-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-500">
              ⚠️ If you don't check in within 45 days, your nominees may begin the claim process.
            </div>
          </div>

          {/* History */}
          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold">Pulse History</h2>
            <div className="space-y-3">
              {[
                { date: "Mar 15, 2025", status: "Checked in" },
                { date: "Dec 15, 2024", status: "Checked in" },
                { date: "Sep 15, 2024", status: "Checked in" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-[#94A3B8]">{item.date}</span>
                  <span>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
