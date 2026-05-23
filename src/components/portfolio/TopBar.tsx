import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface IndexTicker {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

const INDEX_TICKERS: IndexTicker[] = [
  { label: "DOW", value: "42,124.35", change: "+0.42%", positive: true },
  { label: "S&P 500", value: "5,864.67", change: "+0.51%", positive: true },
  { label: "NDX 100", value: "20,412.89", change: "+0.63%", positive: true },
];

export function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3 bg-background">
      <div className="flex items-center gap-6">
        {INDEX_TICKERS.map((ticker, i) => (
          <div key={ticker.label} className="flex items-center gap-4">
            {i > 0 && <Separator orientation="vertical" className="h-8" />}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium">
                {ticker.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold">{ticker.value}</span>
                <span
                  className={`text-xs font-medium ${
                    ticker.positive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {ticker.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button size="sm">New Portfolio</Button>
    </header>
  );
}
