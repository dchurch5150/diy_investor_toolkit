import { mockPortfolioSummary } from "@/lib/mock-data";
import { StatCard } from "./StatCard";

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function PortfolioStats() {
  const s = mockPortfolioSummary;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Portfolio Value"
        value={`$${fmt(s.totalValue)}`}
        change={`${s.totalDayChangePercent > 0 ? "+" : ""}${fmt(s.totalDayChangePercent)}% today`}
        changePositive={s.totalDayChangePercent >= 0}
        subLabel={`$${fmt(Math.abs(s.totalDayChange))} day change`}
      />
      <StatCard
        label="Total Gain / Loss"
        value={`$${fmt(s.totalGainLoss)}`}
        change={`${s.totalGainLoss >= 0 ? "+" : ""}${fmt(s.totalGainLossPercent)}%`}
        changePositive={s.totalGainLoss >= 0}
        subLabel={`vs cost basis $${fmt(s.totalCost)}`}
      />
      <StatCard
        label="Annual Dividend Income"
        value={`$${fmt(s.estimatedAnnualDividendIncome)}`}
        changePositive={true}
        subLabel="Estimated annual"
      />
      <StatCard
        label="Dividend Yield"
        value={`${fmt(s.totalDividendYield)}%`}
        changePositive={true}
        subLabel="Portfolio avg yield"
      />
    </div>
  );
}
