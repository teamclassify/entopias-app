import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

// Este config puede ser dinámico si lo necesitas más adelante
const chartConfig = {
  genericKey: {
    label: "Dato",
    color: "hsl(var(--chart-1))",
  },
};

export default function Stadistic({ data, dataKey }) {
  const formatData = data.data.map((item) => ({
    [dataKey[0]]: item[dataKey[0]],
    [dataKey[1]]: item[dataKey[1]]?.name
      ? `${item[dataKey[1]].name} ${item.weight}gr`
      : item[dataKey[1]],
  }));

  console.log("Formatted Data:", formatData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variedades más vendidas</CardTitle>
        <CardDescription>Datos agregados</CardDescription>
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
            <Bar
              dataKey={dataKey[0]}
              layout="vertical"
              radius={5}
              fill="hsl(var(--chart-1))"
            />
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
