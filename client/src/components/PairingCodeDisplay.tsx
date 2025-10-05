import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface PairingCodeDisplayProps {
  code: string;
}

export default function PairingCodeDisplay({ code }: PairingCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Clipboard copy failed, using fallback');
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      textArea.remove();
    }
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
