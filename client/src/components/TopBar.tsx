import { Smartphone } from "lucide-react";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 glass-effect smooth-transition">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 animate-fade-in-up">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 smooth-transition hover:scale-110">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          𝐀ɭīī 𝐌𝐃 𝐁❍𝐓 <span className="text-pink-400">❤️‍🩹</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
