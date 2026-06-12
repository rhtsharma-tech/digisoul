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
  FileText,
  Users,
  Gem,
  Clock,
  Plus,
  X,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

type WizardStep = 0 | 1 | 2 | 3;

interface WillFormData {
  name: string;
  description: string;
  selectedNominees: string[];
  assetAllocations: Record<string, Record<string, number>>;
  pulseInterval: number;
}

interface Nominee {
  id: string;
  name: string;
  walletAddress: string;
  allocationPercentage: number;
}

interface Asset {
  id: string;
  name: string;
  type: string;
  value: string;
}

const mockNominees: Nominee[] = [
  {
    id: "1",
    name: "Alice Johnson",
    walletAddress: "0x1234...5678",
    allocationPercentage: 50,
  },
  {
    id: "2",
    name: "Bob Smith",
    walletAddress: "0xabcd...ef12",
    allocationPercentage: 30,
  },
  {
    id: "3",
    name: "Charlie Brown",
    walletAddress: "0x9876...5432",
    allocationPercentage: 20,
  },
];

const mockAssets: Asset[] = [
  { id: "1", name: "Ethereum (2.45 ETH)", type: "ERC20", value: "$8,234.50" },
  { id: "2", name: "USD Coin (5,000 USDC)", type: "ERC20", value: "$5,000.00" },
  { id: "3", name: "DigiSoul Genesis #142", type: "ERC721", value: "$3,200.00" },
  { id: "4", name: "CryptoPunk #7804", type: "ERC721", value: "$4,500.00" },
  { id: "5", name: "Last Will & Testament", type: "Document", value: "Legal" },
  { id: "6", name: "Trust Fund Certificate", type: "Document", value: "Legal" },
];

const pulseOptions = [
  { value: 30, label: "30 days", description: "Check in monthly" },
  { value: 60, label: "60 days", description: "Check in bimonthly" },
  { value: 90, label: "90 days", description: "Check in quarterly" },
  { value: 180, label: "180 days", description: "Check in semi-annually" },
  { value: 365, label: "365 days", description: "Check in annually" },
];

export default function CreateWillPage() {
  const [step, setStep] = useState<WizardStep>(0);
  const [formData, setFormData] = useState<WillFormData>({
    name: "",
    description: "",
    selectedNominees: [],
    assetAllocations: {},
    pulseInterval: 90,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const canProceed = (): boolean => {
    if (step === 0) return formData.name.trim().length > 0;
    if (step === 1) return formData.selectedNominees.length > 0;
    if (step === 2) return true;
    return true;
  };

  const toggleNominee = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedNominees: prev.selectedNominees.includes(id)
        ? prev.selectedNominees.filter((n) => n !== id)
        : [...prev.selectedNominees, id],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const steps = ["Details", "Nominees", "Assets", "Pulse"];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/wills">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create Will</h1>
            <p className="text-muted-foreground">
              Set up a new digital inheritance will.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    i < step
                      ? "bg-gold-500 text-navy-900"
                      : i === step
                        ? "bg-gold-500/20 text-gold-500 border border-gold-500/50"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs ${
                    i === step ? "text-gold-500" : "text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mb-5 h-0.5 w-12 ${
                    i < step ? "bg-gold-500" : "bg-muted"
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
                Will Created Successfully
              </h2>
              <p className="mt-2 text-muted-foreground">
                &ldquo;{formData.name}&rdquo; is now active. Remember to check in
                every {formData.pulseInterval} days.
              </p>
              <div className="mt-8 flex gap-4">
                <Link href="/dashboard/wills">
                  <Button variant="glass">View All Wills</Button>
                </Link>
                <Link href="/dashboard/pulse">
                  <Button variant="gold">Go to Pulse</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle>{steps[step]}</CardTitle>
            </CardHeader>
            <CardContent>
              {step === 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="will-name">Will Name</Label>
                    <Input
                      id="will-name"
                      placeholder="e.g. Family Legacy Will"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="will-desc">Description (optional)</Label>
                    <Input
                      id="will-desc"
                      placeholder="Brief description of this will's purpose"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Select which nominees should be included in this will.
                  </p>
                  <div className="space-y-2">
                    {mockNominees.map((nominee) => (
                      <button
                        key={nominee.id}
                        type="button"
                        onClick={() => toggleNominee(nominee.id)}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                          formData.selectedNominees.includes(nominee.id)
                            ? "border-gold-500/50 bg-gold-500/10"
                            : "border-border hover:border-gold-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 font-bold">
                            {nominee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {nominee.name}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {nominee.walletAddress}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gold-500">
                            {nominee.allocationPercentage}%
                          </span>
                          {formData.selectedNominees.includes(nominee.id) && (
                            <CheckCircle className="h-5 w-5 text-gold-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formData.selectedNominees.length} nominee(s) selected
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Assign assets to your selected nominees. You can customize
                    allocations per asset.
                  </p>
                  <div className="space-y-3">
                    {mockAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="rounded-xl border border-border p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {asset.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {asset.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {asset.value}
                              </span>
                            </div>
                          </div>
                          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
                            <option value="">Unassigned</option>
                            {formData.selectedNominees.map((nId) => {
                              const nominee = mockNominees.find(
                                (n) => n.id === nId
                              );
                              return (
                                <option key={nId} value={nId}>
                                  {nominee?.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Set how often you need to check in to keep your will active.
                    If you miss a check-in, nominees can begin the claiming
                    process.
                  </p>
                  <div className="grid gap-3">
                    {pulseOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, pulseInterval: option.value })
                        }
                        className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                          formData.pulseInterval === option.value
                            ? "border-gold-500/50 bg-gold-500/10"
                            : "border-border hover:border-gold-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Clock
                            className={`h-5 w-5 ${
                              formData.pulseInterval === option.value
                                ? "text-gold-500"
                                : "text-muted-foreground"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-foreground">
                              {option.label}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                        </div>
                        {formData.pulseInterval === option.value && (
                          <CheckCircle className="h-5 w-5 text-gold-500" />
                        )}
                      </button>
                    ))}
                  </div>
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
                {step < 3 ? (
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
                      "Creating Will..."
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Create Will
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
