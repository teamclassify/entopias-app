import { Button } from "@/components/ui/button.tsx";

function QuantityFilter() {
  return (
    <div className="bg-[#F2E4DC] p-3">
      <div className="flex items-center justify-center pb-4">
        <h1 className="font-bold">Filtrar cantidad</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-3 w-full">
        <Button className="bg-[#B76E49]">250g</Button>
        <Button className="bg-[#B76E49]">500g</Button>
        <Button className="bg-[#B76E49]">1kg</Button>
        <Button className="bg-[#B76E49]">5kg</Button>
        <Button className="bg-[#B76E49]">10kg</Button>
      </div>
    </div>
  );
}

export default QuantityFilter