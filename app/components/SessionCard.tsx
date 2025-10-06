interface SessionCardProps {
  phoneNumber: string;
  jid: string;
  connected: boolean;
}

export default function SessionCard({ phoneNumber, jid, connected }: SessionCardProps) {
  return (
    <div className="group glass-effect rounded-2xl p-6 smooth-hover smooth-transition shadow-xl shadow-purple-500/10">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 p-2 smooth-transition group-hover:scale-110">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
            </div>
            <span className="text-lg sm:text-xl font-mono font-semibold text-white break-all">
              {phoneNumber}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                connected
                  ? "animate-pulse bg-green-400 shadow-lg shadow-green-400/50"
                  : "bg-gray-400"
              }`}
            />
            <span className="text-sm text-white/70">
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
        <CheckCircle2
          className={`h-6 w-6 smooth-transition ${
            connected ? "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" : "text-gray-400"
          }`}
        />
      </div>
      <div className="space-y-2 rounded-lg bg-white/5 p-3 smooth-transition hover:bg-white/10">
        <div className="text-xs text-white/50 uppercase tracking-wider">JID</div>
        <div className="break-all text-xs sm:text-sm font-mono text-white/90">{jid}</div>
      </div>
    </div>
  );
}