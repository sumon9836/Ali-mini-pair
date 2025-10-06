import { Link } from "wouter";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import SessionCard from "@/components/SessionCard";
import { useQuery } from "@tanstack/react-query";

interface Session {
  connected: boolean;
  user: string;
  jid: string;
}

interface SessionsResponse {
  total: number;
  sessions: Record<string, Session>;
  server_uptime: number;
}

export default function Dashboard() {
  const { data, isLoading, error } = useQuery<SessionsResponse>({
    queryKey: ['/api/sessions'],
  });

  const sessionEntries = data?.sessions ? Object.entries(data.sessions) : [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center backdrop-blur-lg max-w-md">
          <p className="text-white">Failed to load sessions. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
          <div className="w-full sm:w-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"></h2>
            
          </div>
        
          <Link href="/pair" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/50 smooth-transition hover:scale-105"
              data-testid="button-new-pair"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Pair
            </Button>
          </Link>
        </div>

        <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <StatsCard
            title="Total Active Users"
            value={data?.total || 0}
            icon={<Users className="h-6 w-6 text-purple-400" />}
          />
        </div>

        <div className="mb-6 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xl sm:text-2xl font-semibold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Active Sessions</h3>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sessionEntries.map(([phoneNumber, session], index) => (
            <div
              key={phoneNumber}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <SessionCard
                phoneNumber={phoneNumber}
                jid={session.jid}
                connected={session.connected}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-effect rounded-2xl p-6 text-center border border-white/10">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/60">Developed with passion by</p>
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                𝘴น𝚖𝔞ꪦ_𝗿ǿⲩ 🍉
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-semibold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  𝐀ɭīī 𝐈𝐍𝐗īī𝐃𝐄
                </span>
                <span className="text-white/40">•</span>
                <span className="text-sm text-white/60">©2025</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
