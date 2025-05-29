export default function getPercentage({ data, value }) {
  const padding = value === "ingresos" ? "pl-7" : "pl-0";

  const currentMonthData = data[data.length - 1];
  const previousMonthData = data[data.length - 2];

  let percentageChange = 0;
  if (previousMonthData) {
    const currentMonthValue = currentMonthData[value];
    const previousMonthValue = previousMonthData[value];

    if (previousMonthValue !== 0) {
      percentageChange =
        ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;
    }
  }
  return { padding, percentageChange };
}
