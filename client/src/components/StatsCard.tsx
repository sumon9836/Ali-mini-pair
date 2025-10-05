interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="mt-2 text-4xl font-bold text-white" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
          {icon}
        </div>
      </div>
    </div>
  );
}
