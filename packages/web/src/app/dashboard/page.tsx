"use client";

import Link from "next/link";

const stats = [
  { title: "Total Value", value: "$124,500", change: "+12.5%", color: "text-green-500" },
  { title: "Assets", value: "12", subtitle: "5 tokens, 4 NFTs, 3 docs", color: "text-[#C9A84C]" },
  { title: "Nominees", value: "3", subtitle: "100% allocated", color: "text-[#6C63FF]" },
  { title: "Active Wills", value: "2", subtitle: "Last updated 3 days ago", color: "text-blue-500" },
];

const recentActivity = [
  { type: "Asset Added", description: "Added 2.45 ETH to vault", time: "2 hours ago" },
  { type: "Nominee Added", description: "Added Alice Johnson as nominee", time: "1 day ago" },
  { type: "Will Created", description: "Created 'Family Legacy Will'", time: "3 days ago" },
  { type: "Pulse", description: "Checked in to reset countdown", time: "5 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#06070A] text-[#F8FAFC]">
      {/* Simple Header */}
      <header className="border-b border-[#1A1B2E] bg-[#06070A] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A68A3E]" />
            <span className="text-lg font-bold bg-gradient-to-r from-[#FFCC1A] to-[#C9A84C] bg-clip-text text-transparent">
              DigiSoul
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#94A3B8]">0x1234...5678</span>
            <div className="h-8 w-8 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-sm font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-[#94A3B8]">Welcome back. Here&apos;s your digital legacy overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.title} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm text-[#94A3B8]">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-xs text-[#94A3B8]">{stat.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Asset Allocation */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Asset Allocation</h2>
              <Link href="/dashboard/assets" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC]">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { name: "ETH", amount: "2.45 ETH", value: "$8,234.50", percent: 66, color: "bg-[#C9A84C]" },
                { name: "USDC", amount: "5,000 USDC", value: "$5,000.00", percent: 40, color: "bg-green-500" },
                { name: "NFTs", amount: "4 items", value: "$11,265.50", percent: 9, color: "bg-[#6C63FF]" },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-[#94A3B8]">{item.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.value}</p>
                      <p className="text-xs text-[#94A3B8]">{item.percent}%</p>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#1A1B2E]">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pulse Status */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
              ⏰ Pulse Status
            </h2>
            <div className="flex flex-col items-center py-4">
              <div className="relative">
                <svg className="h-32 w-32 -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-[#1A1B2E]" />
                  <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="352" strokeDashoffset="176" className="text-[#C9A84C]" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">45</span>
                  <span className="text-xs text-[#94A3B8]">days</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#94A3B8]">Remaining until claim eligible</p>
            </div>
            <button className="w-full rounded-md bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] py-2 text-sm font-semibold text-[#06070A] hover:from-[#FFCC1A] hover:to-[#C9A84C]">
              Check In Now
            </button>
            <p className="mt-2 text-center text-xs text-[#94A3B8]">Last pulse: March 15, 2025</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Link href="/dashboard/activity" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC]">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-[#1A1B2E] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A84C]/10">
                    <span className="text-[#C9A84C]">→</span>
                  </div>
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-[#94A3B8]">{activity.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 text-xs text-green-500">
                    success
                  </span>
                  <p className="mt-1 text-xs text-[#94A3B8]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { title: "Add Asset", href: "/dashboard/assets", icon: "💎" },
            { title: "Add Nominee", href: "/dashboard/nominees", icon: "👥" },
            { title: "Create Will", href: "/dashboard/wills", icon: "📜" },
            { title: "Check In", href: "/dashboard/pulse", icon: "⏰" },
          ].map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition-all hover:border-[#C9A84C]/30 hover:bg-white/10"
            >
              <span className="text-3xl">{action.icon}</span>
              <span className="font-medium">{action.title}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
