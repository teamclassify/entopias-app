import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getPercentage from "@/data/getPercentage.js";
import StadisticTopVarieties from "./StadisticTopVarieties";

export default function Graphic({ title, data, total, value }) {
  const { percentageChange, padding } = getPercentage({ data, value });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          <CardTitle className="text-4xl">{total}</CardTitle>
        </div>
        <CardDescription>
          {percentageChange !== 0
            ? `+${percentageChange.toFixed(2)}% respecto al mes pasado`
            : "Sin variación respecto al mes pasado"}
        </CardDescription>
      </CardHeader>
      <CardContent className={padding}>
       <StadisticTopVarieties data={data} dataKey={["month", value]} />
      </CardContent>
    </Card>
  );
}
