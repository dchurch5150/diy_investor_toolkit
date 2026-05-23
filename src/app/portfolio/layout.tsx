import { TopBar } from "@/components/portfolio/TopBar";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <aside className="w-56 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="px-6 py-4 border-b border-border">
          <span className="text-sm font-semibold">DIY Investor</span>
        </div>
        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold text-muted-foreground">Sidebar</h2>
        </div>
      </aside>
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
