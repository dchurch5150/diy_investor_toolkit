import { HoldingsTable } from "@/components/portfolio/HoldingsTable";
import { PerformanceChart } from "@/components/portfolio/PerformanceChart";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { WatchlistCard } from "@/components/portfolio/WatchlistCard";

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Row 1 — summary stats */}
      <PortfolioStats />

      {/* Row 2 — chart + watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <WatchlistCard />
      </div>

      {/* Row 3 — holdings table */}
      <HoldingsTable />
    </div>
  );
}
