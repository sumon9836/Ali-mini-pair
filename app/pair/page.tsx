'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, ArrowLeft, Phone } from "lucide-react";
import PairingCodeDisplay from "@/components/PairingCodeDisplay";
import { useMutation } from "@tanstack/react-query";

interface PairResponse {
  code?: string;
  status?: string;
  message?: string;
}

export default function PairPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pairMutation = useMutation<PairResponse, Error, string>({
    mutationFn: async (number: string) => {
      const response = await fetch(`/api/pair?code=${number}`);
      const data = await response.json();

      if (data.status === "error") {
        throw new Error(data.message || 'Failed to pair number');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to pair number');
      }

      return data;
    },
    onSuccess: (data) => {
      if (data.code) {
        setPairingCode(data.code);
        setError(null);
      }
    },
    onError: (error: Error) => {
      setError(error.message || "Failed to pair number");
      setPairingCode(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setError(null);
    setPairingCode(null);
    pairMutation.mutate(phoneNumber);
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-purple-700 to-blue-800">
      <div className="mx-auto max-w-md">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-6 text-white hover:bg-white/10 smooth-transition"
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center backdrop-blur-lg shadow-lg shadow-red-500/20 animate-fade-in-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white" data-testid="text-error-title">
              {error.toLowerCase().includes("blocked") ? "You are blocked" : "Error"}
            </h3>
            <p className="text-white/70" data-testid="text-error-message">
              {error.toLowerCase().includes("blocked") ? "Please contact developer" : error}
            </p>
            <Button
              onClick={() => {
                setError(null);
                setPhoneNumber("");
              }}
              variant="outline"
              className="mt-4 border-red-500/50 text-red-400 hover:bg-red-500/10 smooth-transition"
              data-testid="button-try-again"
            >
              Try Again
            </Button>
          </div>
        ) : pairingCode ? (
          <PairingCodeDisplay code={pairingCode} />
        ) : (
          <div className="glass-effect rounded-2xl p-6 sm:p-8 smooth-transition shadow-2xl shadow-purple-500/20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Pair New Number</h2>
              <p className="mt-2 text-sm sm:text-base text-white/70">Enter phone number to generate pairing code</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/70">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="919876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/50 smooth-transition text-base sm:text-sm"
                  data-testid="input-phone"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/50 smooth-transition hover:scale-105"
                size="lg"
                disabled={pairMutation.isPending}
                data-testid="button-submit"
              >
                {pairMutation.isPending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  "Generate Pairing Code"
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
