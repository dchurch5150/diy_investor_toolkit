import { mockHoldings } from "@/lib/mock-data";
import { Sparkline } from "./Sparkline";

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function HoldingsTable() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-foreground">Portfolio Holdings</h3>
        <p className="text-xs text-muted-foreground">{mockHoldings.length} positions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wide">
              <th className="text-left pb-3 pr-4 font-medium">Ticker</th>
              <th className="text-left pb-3 pr-4 font-medium">Company</th>
              <th className="text-right pb-3 pr-4 font-medium">Shares</th>
              <th className="text-right pb-3 pr-4 font-medium">Avg Cost</th>
              <th className="text-right pb-3 pr-4 font-medium">Total Cost</th>
              <th className="text-right pb-3 pr-4 font-medium">Current Price</th>
              <th className="text-right pb-3 pr-4 font-medium">Market Value</th>
              <th className="text-right pb-3 pr-4 font-medium">Day Change</th>
              <th className="text-right pb-3 pr-4 font-medium">Total Gain/Loss</th>
              <th className="text-center pb-3 pr-4 font-medium">1Y Trend</th>
              <th className="text-right pb-3 pr-4 font-medium">Div/Share</th>
              <th className="text-right pb-3 pr-4 font-medium">Div Yield</th>
              <th className="text-right pb-3 pr-4 font-medium">Annual Div</th>
              <th className="text-right pb-3 font-medium">5Y CAGR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockHoldings.map((h) => {
              const dayPos = h.dayChangePercent >= 0;
              const gainPos = h.gainLossPercent >= 0;
              const annualDivIncome = h.shares * h.annualDividendPerShare;
              const hasDividend = h.annualDividendPerShare > 0;

              return (
                <tr key={h.ticker} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-foreground">{h.ticker}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{h.companyName}</td>
                  <td className="py-3 pr-4 text-right text-foreground">{h.shares}</td>
                  <td className="py-3 pr-4 text-right text-muted-foreground">${fmt(h.averageCost)}</td>
                  <td className="py-3 pr-4 text-right text-foreground">${fmt(h.totalCost)}</td>
                  <td className="py-3 pr-4 text-right text-foreground">${fmt(h.currentPrice)}</td>
                  <td className="py-3 pr-4 text-right text-foreground">${fmt(h.totalValue)}</td>
                  <td className={`py-3 pr-4 text-right font-medium ${dayPos ? "text-emerald-400" : "text-red-400"}`}>
                    {dayPos ? "+" : ""}{fmt(h.dayChangePercent)}%
                  </td>
                  <td className={`py-3 pr-4 text-right font-medium ${gainPos ? "text-emerald-400" : "text-red-400"}`}>
                    {gainPos ? "+" : ""}${fmt(h.gainLossDollars)}{" "}
                    <span className="text-xs opacity-75">({gainPos ? "+" : ""}{fmt(h.gainLossPercent)}%)</span>
                  </td>
                  <td className="py-3 pr-4 text-center">
                    <Sparkline data={h.trend} />
                  </td>
                  <td className="py-3 pr-4 text-right text-foreground">
                    {hasDividend ? `$${fmt(h.annualDividendPerShare)}` : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="py-3 pr-4 text-right text-foreground">
                    {hasDividend ? `${fmt(h.annualDividendYield)}%` : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="py-3 pr-4 text-right text-foreground">
                    {hasDividend ? `$${fmt(annualDivIncome)}` : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="py-3 text-right text-foreground">
                    {h.dividendCagr5yr > 0 ? `${fmt(h.dividendCagr5yr)}%` : <span className="text-muted-foreground">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
