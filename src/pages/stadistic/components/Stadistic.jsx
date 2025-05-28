import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#43A5BE",
  },
};

export default function Stadistic({ data, dataKey }) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKey[0]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={0}
          tickCount={10}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey={dataKey[1]}
          type="linear"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
