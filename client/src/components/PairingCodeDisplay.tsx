import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface PairingCodeDisplayProps {
  code: string;
}

export default function PairingCodeDisplay({ code }: PairingCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center backdrop-blur-lg">
      <p className="mb-4 text-sm font-medium text-white/70">Your Pairing Code</p>
      <p className="font-mono text-5xl font-bold tracking-widest text-white" data-testid="text-pairing-code">{code}</p>
      <Button
        onClick={handleCopy}
        className="mt-6"
        variant="outline"
        data-testid="button-copy-code"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copy Code
          </>
        )}
      </Button>
    </div>
  );
}
