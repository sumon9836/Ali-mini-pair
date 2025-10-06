interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 smooth-hover smooth-transition shadow-xl shadow-purple-500/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="mt-2 text-3xl sm:text-4xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{value}</p>
        </div>
        <div className="rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 p-3 sm:p-4 smooth-transition hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );
}