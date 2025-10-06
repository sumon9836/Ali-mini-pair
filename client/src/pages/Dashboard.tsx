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
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white"></h2>
            <p className="mt-2 text-white/70">Created by 𝘴น𝚖𝔞ꪦ_𝗿ǿⲩ 🍉 𝐀ɭīī 𝐈𝐍𝅦𝐗īī𝐃𝐄</p>
          </div>
        
          <Link href="/pair">
            <Button
              size="lg"
              data-testid="button-new-pair"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Pair
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <StatsCard
            title="Total Active Users"
            value={data?.total || 0}
            icon={<Users className="h-6 w-6 text-primary" />}
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">Active Sessions</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessionEntries.map(([phoneNumber, session]) => (
            <SessionCard
              key={phoneNumber}
              phoneNumber={phoneNumber}
              jid={session.jid}
              connected={session.connected}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
