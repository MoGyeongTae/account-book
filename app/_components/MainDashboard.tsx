type Trend = "up" | "down";

type SummaryCardData = {
  title: string;
  value: string;
  change: string;
  trend: Trend;
};

type SummaryRow = {
  label: string;
  ytd: string;
  budget: string;
  ly: string;
  variance: string;
  trend: Trend | "neutral";
  comment?: string;
};

const summaryCards: SummaryCardData[] = [
  { title: "이번달 수입", value: "$222.3K", change: "13.8%", trend: "down" },
  { title: "이번달 지출", value: "32.9%", change: "15.8%", trend: "up" },
  { title: "이번달 수입 - 지출", value: "30.9%", change: "23.1%", trend: "down" },
];

const summaryRows: SummaryRow[] = [
  {
    label: "Revenue",
    ytd: "$222.3K",
    budget: "$257.7K",
    ly: "$257.7K",
    variance: "(13.8%)",
    trend: "down",
    comment: "Revenue is below budget due to delayed deals.",
  },
  {
    label: "COGS",
    ytd: "$149.1K",
    budget: "$149.1K",
    ly: "$149.1K",
    variance: "0.0%",
    trend: "neutral",
  },
  {
    label: "Gross Margin",
    ytd: "32.9%",
    budget: "42.1%",
    ly: "42.1%",
    variance: "(9.2%)",
    trend: "down",
    comment: "Margin pressure from higher input costs.",
  },
  {
    label: "Sales & marketing",
    ytd: "$45.2K",
    budget: "$38.5K",
    ly: "$38.5K",
    variance: "17.4%",
    trend: "up",
  },
  {
    label: "Research & development",
    ytd: "$28.4K",
    budget: "$25.0K",
    ly: "$25.0K",
    variance: "13.6%",
    trend: "up",
  },
  {
    label: "General & administrative",
    ytd: "$19.8K",
    budget: "$18.2K",
    ly: "$18.2K",
    variance: "8.8%",
    trend: "up",
  },
  {
    label: "Other",
    ytd: "$2.1K",
    budget: "$1.5K",
    ly: "$1.5K",
    variance: "40.0%",
    trend: "up",
  },
  {
    label: "EBITDA",
    ytd: "30.9%",
    budget: "40.2%",
    ly: "40.2%",
    variance: "(9.3%)",
    trend: "down",
    comment: "EBITDA below plan on weaker revenue.",
  },
];

function TrendIndicator({ trend, change }: { trend: Trend; change: string }) {
  const isUp = trend === "up";

  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-medium ${
        isUp ? "text-emerald-600" : "text-red-500"
      }`}
    >
      <span aria-hidden="true">{isUp ? "↑" : "↓"}</span>
      {change}
    </span>
  );
}

function TrendIcon({ trend }: { trend: Trend | "neutral" }) {
  if (trend === "neutral") {
    return <span className="text-zinc-400">—</span>;
  }

  const isUp = trend === "up";

  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
        isUp
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-600"
      }`}
      aria-hidden="true"
    >
      {isUp ? "↑" : "↓"}
    </span>
  );
}

function SummaryCard({ title, value, change, trend }: SummaryCardData) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </h3>
        <span className="h-8 w-8 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800" />
      </div>
      <p className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
      <div className="mt-3">
        <TrendIndicator trend={trend} change={change} />
      </div>
    </article>
  );
}

export default function MainDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 font-sans">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Summary
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="px-5 py-3 font-medium" />
                <th className="px-4 py-3 font-medium">YTD</th>
                <th className="px-4 py-3 font-medium">Budget</th>
                <th className="px-4 py-3 font-medium">LY</th>
                <th className="px-4 py-3 font-medium">Var</th>
                <th className="px-4 py-3 font-medium">Trend</th>
                <th className="px-5 py-3 font-medium">Comments</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => {
                const isNegativeVariance = row.variance.startsWith("(");

                return (
                  <tr
                    key={row.label}
                    className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800/80"
                  >
                    <td className="px-5 py-3 font-semibold text-zinc-950 dark:text-zinc-50">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {row.ytd}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {row.budget}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {row.ly}
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        isNegativeVariance
                          ? "text-red-500"
                          : row.variance === "0.0%"
                            ? "text-zinc-500"
                            : "text-emerald-600"
                      }`}
                    >
                      {row.variance}
                    </td>
                    <td className="px-4 py-3">
                      <TrendIcon trend={row.trend} />
                    </td>
                    <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                      {row.comment ?? ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
