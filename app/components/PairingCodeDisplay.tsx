'use client';

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
    <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center smooth-transition shadow-2xl shadow-purple-500/20 animate-scale-in">
      <div className="mb-6 animate-fade-in-up">
        <h3 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Your Pairing Code</h3>
        <p className="mt-2 text-sm sm:text-base text-white/70">Use this code to pair your device</p>
      </div>

      <div className="mb-6 rounded-xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-6 sm:p-8 animate-pulse smooth-transition hover:border-purple-400/70" style={{ animationDelay: '0.2s' }}>
        <div className="text-3xl sm:text-5xl font-mono font-bold tracking-widest text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          {code}
        </div>
      </div>

      <Button
        onClick={handleCopy}
        variant="outline"
        className="w-full border-2 border-white/30 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md hover:from-purple-600/30 hover:to-blue-600/30 smooth-transition hover:scale-105 shadow-lg"
        size="lg"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-5 w-5 text-green-400" />
            <span className="text-green-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="mr-2 h-5 w-5" />
            Copy Code
          </>
        )}
      </Button>
    </div>
  );
}