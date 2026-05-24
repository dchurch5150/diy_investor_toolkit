"use client";

import { mockPerformanceChart } from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export function PerformanceChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 h-full">
      <div>
        <h3 className="font-semibold text-foreground">Portfolio Performance</h3>
        <p className="text-xs text-muted-foreground">12-month value history</p>
      </div>
      <div className="flex-1 min-h-0" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockPerformanceChart} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]}
              labelStyle={{ color: "var(--muted-foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#perfGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#3b82f6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
