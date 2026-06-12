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
  Check,
  Wallet,
  User,
  Users,
  Percent,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const relationships = [
  "Spouse",
  "Child",
  "Parent",
  "Sibling",
  "Friend",
  "Trust",
  "Other",
];

export default function AddNomineePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [relationship, setRelationship] = useState("");
  const [percentage, setPercentage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!walletAddress.trim()) {
      newErrors.walletAddress = "Wallet address is required";
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      newErrors.walletAddress = "Invalid Ethereum address format";
    }
    if (!relationship) newErrors.relationship = "Relationship is required";
    if (!percentage) {
      newErrors.percentage = "Allocation percentage is required";
    } else {
      const pct = parseFloat(percentage);
      if (isNaN(pct) || pct <= 0 || pct > 100) {
        newErrors.percentage = "Must be between 1 and 100";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-lg space-y-6">
          <Card className="glass border-white/10">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="mt-6 text-xl font-bold text-foreground">
                Nominee Added
              </h2>
              <p className="mt-2 text-muted-foreground">
                {name} has been added as a nominee with {percentage}% allocation.
              </p>
              <div className="mt-8 flex gap-4">
                <Link href="/dashboard/nominees">
                  <Button variant="glass">View All Nominees</Button>
                </Link>
                <Button
                  variant="gold"
                  onClick={() => {
                    setName("");
                    setWalletAddress("");
                    setRelationship("");
                    setPercentage("");
                    setIsComplete(false);
                  }}
                >
                  Add Another
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-lg space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/nominees">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add Nominee</h1>
            <p className="text-muted-foreground">
              Designate a beneficiary for your digital assets.
            </p>
          </div>
        </div>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-gold-500" />
              Nominee Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="e.g. Alice Johnson"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet Address</Label>
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="wallet"
                  placeholder="0x..."
                  className="pl-9 font-mono"
                  value={walletAddress}
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                    if (errors.walletAddress)
                      setErrors({ ...errors, walletAddress: "" });
                  }}
                />
              </div>
              {errors.walletAddress && (
                <p className="text-xs text-destructive">
                  {errors.walletAddress}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <div className="grid grid-cols-4 gap-2">
                {relationships.map((rel) => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => {
                      setRelationship(rel);
                      if (errors.relationship)
                        setErrors({ ...errors, relationship: "" });
                    }}
                    className={`rounded-lg border p-2 text-sm font-medium transition-all ${
                      relationship === rel
                        ? "border-gold-500/50 bg-gold-500/10 text-gold-500"
                        : "border-border text-muted-foreground hover:border-gold-500/30 hover:text-foreground"
                    }`}
                  >
                    {rel}
                  </button>
                ))}
              </div>
              {errors.relationship && (
                <p className="text-xs text-destructive">
                  {errors.relationship}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="percentage">Allocation Percentage</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="percentage"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="e.g. 25"
                  className="pl-9"
                  value={percentage}
                  onChange={(e) => {
                    setPercentage(e.target.value);
                    if (errors.percentage)
                      setErrors({ ...errors, percentage: "" });
                  }}
                />
              </div>
              {errors.percentage && (
                <p className="text-xs text-destructive">{errors.percentage}</p>
              )}
              {percentage && parseFloat(percentage) > 100 && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <p className="text-xs text-destructive">
                    Allocation cannot exceed 100%
                  </p>
                </div>
              )}
            </div>

            {percentage && parseFloat(percentage) > 0 && (
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">
                  Preview: {name || "Nominee"} will receive{" "}
                  <span className="font-bold text-gold-500">{percentage}%</span>{" "}
                  of your digital assets.
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gold-500 transition-all"
                  style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
                />
              </div>
            </div>

            <Button
              variant="gold"
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Adding Nominee..."
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Add Nominee
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
