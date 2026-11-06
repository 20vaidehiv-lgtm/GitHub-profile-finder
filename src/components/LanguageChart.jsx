import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

const SLICES = 5;
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
];

function buildChartData(languages) {
  if (languages.length <= SLICES) return languages;
  const head = languages.slice(0, SLICES);
  const rest = languages.slice(SLICES);
  const restCount = rest.reduce((sum, item) => sum + item.count, 0);
  const restPercent = Math.round(rest.reduce((sum, item) => sum + item.percent, 0) * 10) / 10;
  return [...head, { name: "Other", count: restCount, percent: restPercent }];
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-md border bg-background px-3 py-2 text-sm shadow-md">
      <p className="font-medium">{item.name}</p>
      <p className="text-muted-foreground">
        {item.percent}% · {item.count.toLocaleString()} bytes
      </p>
    </div>
  );
}

export default function LanguageChart({ languages = [] }) {
  const chartData = buildChartData(languages);

  return (
    <section className="rounded-lg border p-4">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <PieIcon className="h-4 w-4" aria-hidden="true" />
        Languages
      </h2>
      {chartData.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No language data available.
        </p>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={2}
              >
                {chartData.map((item, index) => (
                  <Cell
                    key={`${item.name}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}