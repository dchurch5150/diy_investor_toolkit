import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  subLabel?: string;
}

export function StatCard({ label, value, change, changePositive, subLabel }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-bold text-foreground">{value}</span>
      {change && (
        <div className={`flex items-center gap-1 text-sm font-medium ${changePositive ? "text-emerald-400" : "text-red-400"}`}>
          {changePositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      )}
      {subLabel && <span className="text-xs text-muted-foreground">{subLabel}</span>}
    </div>
  );
}
