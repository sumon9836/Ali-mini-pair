import { Smartphone } from "lucide-react";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-sm">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-white">
          𝐀ɭīī 𝐌𝐃 𝐁❍𝐓 <span className="text-primary">❤️‍🩹</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
