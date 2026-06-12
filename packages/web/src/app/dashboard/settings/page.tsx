"use client";

import Link from "next/link";

export default function SettingsPage() {
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
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-[#94A3B8]">Manage your account preferences</p>
        </div>

        <div className="space-y-6 max-w-2xl">
          {/* Profile */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-[#94A3B8]">Display Name</label>
                <input type="text" placeholder="Your name" className="w-full rounded-md border border-[#1A1B2E] bg-[#06070A] px-4 py-2 text-[#F8FAFC] focus:border-[#C9A84C] focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-[#94A3B8]">Email</label>
                <input type="email" placeholder="your@email.com" className="w-full rounded-md border border-[#1A1B2E] bg-[#06070A] px-4 py-2 text-[#F8FAFC] focus:border-[#C9A84C] focus:outline-none" />
              </div>
              <button className="rounded-md bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] px-4 py-2 text-sm font-semibold text-[#06070A]">Save</button>
            </div>
          </div>

          {/* Wallet */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold">Wallet</h2>
            <div className="space-y-2">
              <p className="text-sm"><span className="text-[#94A3B8]">Address:</span> 0x1234...5678</p>
              <p className="text-sm"><span className="text-[#94A3B8]">Network:</span> Polygon Amoy</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="rounded-md border border-[#1A1B2E] px-4 py-2 text-sm hover:bg-white/5">Disconnect</button>
              <button className="rounded-md border border-[#1A1B2E] px-4 py-2 text-sm hover:bg-white/5">Switch Network</button>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold">Notifications</h2>
            <div className="space-y-3">
              {["Email notifications", "Push notifications", "Pulse reminders"].map((item) => (
                <label key={item} className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#1A1B2E] bg-[#06070A] text-[#C9A84C] focus:ring-[#C9A84C]" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold text-red-500">Danger Zone</h2>
            <p className="mb-4 text-sm text-[#94A3B8]">⚠️ These actions are irreversible.</p>
            <div className="flex gap-2">
              <button className="rounded-md border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10">Delete Account</button>
              <button className="rounded-md border border-[#1A1B2E] px-4 py-2 text-sm hover:bg-white/5">Export Data</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
