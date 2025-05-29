import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  genericKey: {
    label: "Dato",
    color: "hsl(var(--chart-1))",
  },
};

const COLORS = [
  "#4f46e5", // Indigo
  "#22c55e", // Green
  "#BB0E22", // Pink
  "#f97316", // Orange
  "#0ea5e9", // Sky Blue
  "#eab308", // Yellow
  "#a855f7", // Purple
];

export default function Stadistic({ data, dataKey, title }) {
  const formatData = data.data.map((item) => ({
    [dataKey[0]]: item[dataKey[0]],
    [dataKey[1]]: item.name
      ? item.name
      : item[dataKey[1]]?.name
      ? `${item[dataKey[1]].name} ${item.weight}gr`
      : item[dataKey[1]],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={formatData}
            layout="vertical"
            margin={{ left: 20 }}
          >
            <YAxis
              dataKey={dataKey[1]}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis dataKey={dataKey[0]} type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={dataKey[0]} layout="vertical" radius={5}>
              {formatData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendencia al alza <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando datos recientes
        </div>
      </CardFooter>
    </Card>
  );
}
