interface SessionCardProps {
  phoneNumber: string;
  jid: string;
  connected: boolean;
}

export default function SessionCard({ phoneNumber, jid, connected }: SessionCardProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <p className="font-mono text-xl font-semibold text-white" data-testid={`text-session-${phoneNumber}`}>{phoneNumber}</p>
          </div>
          <p className="mt-2 text-sm text-white/70" data-testid={`text-jid-${phoneNumber}`}>{jid}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`rounded-lg px-3 py-1 text-xs font-medium ${connected ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`} data-testid={`status-${phoneNumber}`}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </div>
  );
}
