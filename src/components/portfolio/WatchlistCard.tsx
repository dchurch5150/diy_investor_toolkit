import { mockWatchlist } from "@/lib/mock-data";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function WatchlistCard() {
  const items = mockWatchlist.slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 h-full">
      <div>
        <h3 className="font-semibold text-foreground">Watchlist</h3>
        <p className="text-xs text-muted-foreground">Top positions</p>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {items.map((item) => {
          const positive = item.dayChangePercent >= 0;
          return (
            <div key={item.ticker} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{item.ticker}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">{item.companyName}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-foreground">${fmt(item.currentPrice)}</span>
                <span className={`text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
                  {positive ? "+" : ""}{fmt(item.dayChangePercent)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
