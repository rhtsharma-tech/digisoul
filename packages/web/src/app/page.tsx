"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#06070A] text-[#F8FAFC]">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#1A1B2E] bg-[#06070A]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A68A3E]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#FFCC1A] to-[#C9A84C] bg-clip-text text-transparent">
              DigiSoul
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/features" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC]">
              Features
            </Link>
            <Link href="/how-it-works" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC]">
              How It Works
            </Link>
            <Link href="/security" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC]">
              Security
            </Link>
            <Link href="/docs" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC]">
              Docs
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] px-6 py-2 text-sm font-semibold text-[#06070A] hover:from-[#FFCC1A] hover:to-[#C9A84C]"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/5 via-transparent to-transparent" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C9A84C]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Secure Your{" "}
            <span className="bg-gradient-to-r from-[#FFCC1A] to-[#C9A84C] bg-clip-text text-transparent">
              Digital Legacy
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#94A3B8]">
            Your assets, your rules, your forever. Store digital assets, set
            nominees, and create smart wills — all secured by blockchain.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] px-8 py-3 text-base font-semibold text-[#06070A] hover:from-[#FFCC1A] hover:to-[#C9A84C]"
            >
              Get Started →
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-[#1A1B2E] bg-white/5 px-8 py-3 text-base font-medium text-[#F8FAFC] backdrop-blur-xl hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="text-[#C9A84C]">🛡️</span>
              <span>Built on Polygon</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#C9A84C]">🔒</span>
              <span>Non-Custodial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#C9A84C]">👁️</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#1A1B2E] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[
            { value: "$2.5M+", label: "Assets Secured" },
            { value: "1,200+", label: "Active Wills" },
            { value: "5,000+", label: "Users Protected" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FFCC1A] to-[#C9A84C] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Everything You Need</h2>
            <p className="mt-4 text-[#94A3B8]">
              A complete platform for securing your digital inheritance
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🔐",
                title: "Digital Vault",
                description:
                  "Store all your digital assets in one secure, blockchain-based vault. Tokens, NFTs, documents — everything protected.",
              },
              {
                icon: "👥",
                title: "Nominee System",
                description:
                  "Designate who inherits your digital wealth. Set percentages, relationships, and contact information for each beneficiary.",
              },
              {
                icon: "📜",
                title: "Smart Wills",
                description:
                  "Create legally-binding digital wills with personal messages, video instructions, and document attachments.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-[#C9A84C]/5"
              >
                <div className="mb-4 inline-flex rounded-lg bg-[#C9A84C]/10 p-3 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-[#94A3B8]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-[#1A1B2E] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-[#94A3B8]">
              Four simple steps to secure your digital legacy
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Connect Wallet",
                description: "Link your Ethereum wallet to DigiSoul in one click.",
              },
              {
                number: "02",
                title: "Add Assets",
                description: "Register your tokens, NFTs, and important documents.",
              },
              {
                number: "03",
                title: "Set Nominees",
                description: "Choose who inherits your digital legacy.",
              },
              {
                number: "04",
                title: "Create Will",
                description: "Build your smart will with allocations and messages.",
              },
            ].map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C]/10 text-2xl font-bold bg-gradient-to-r from-[#FFCC1A] to-[#C9A84C] bg-clip-text text-transparent">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-[#94A3B8]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
            <h2 className="text-3xl font-bold">Ready to Secure Your Legacy?</h2>
            <p className="mt-4 text-[#94A3B8]">
              Join thousands of users who trust DigiSoul with their digital
              inheritance.
            </p>
            <div className="mt-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#A68A3E] px-8 py-3 text-base font-semibold text-[#06070A] hover:from-[#FFCC1A] hover:to-[#C9A84C]"
              >
                Launch App →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1B2E] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A68A3E]" />
                <span className="text-lg font-bold bg-gradient-to-r from-[#FFCC1A] to-[#C9A84C] bg-clip-text text-transparent">
                  DigiSoul
                </span>
              </div>
              <p className="mt-4 text-sm text-[#94A3B8]">
                Secure your digital legacy with blockchain technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-[#94A3B8]">
                <li><Link href="/features" className="hover:text-[#F8FAFC]">Features</Link></li>
                <li><Link href="/security" className="hover:text-[#F8FAFC]">Security</Link></li>
                <li><Link href="/pricing" className="hover:text-[#F8FAFC]">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Resources</h4>
              <ul className="mt-4 space-y-2 text-sm text-[#94A3B8]">
                <li><Link href="/docs" className="hover:text-[#F8FAFC]">Documentation</Link></li>
                <li><Link href="/docs/api" className="hover:text-[#F8FAFC]">API Reference</Link></li>
                <li><Link href="/status" className="hover:text-[#F8FAFC]">System Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-[#94A3B8]">
                <li><Link href="/terms" className="hover:text-[#F8FAFC]">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-[#F8FAFC]">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-[#1A1B2E] pt-8 text-center text-sm text-[#94A3B8]">
            © {new Date().getFullYear()} DigiSoul. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
