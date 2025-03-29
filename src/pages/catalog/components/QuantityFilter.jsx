import { Button } from "@/components/ui/button.tsx";

function QuantityFilter() {
  return (
    <div className="bg-[#F2E4DC] p-3">
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-xl">Filtrar cantidad</h1>
      </div>
      <hr className="border-1 border-[#B76E49] mb-4"/>
      <div className="flex flex-row flex-wrap gap-3 w-full">
        <Button className="bg-[#B76E49] w-[70px]">500 gr</Button>
        <Button className="bg-[#B76E49] w-[70px]">1 kg</Button>
        <Button className="bg-[#B76E49] w-[70px]">1.5 kg</Button>
        <Button className="bg-[#B76E49] w-[70px]">2 kg</Button>
        <Button className="bg-[#B76E49] w-[70px]">2.5 kg</Button>
      </div>
    </div>
  );
}

export default QuantityFilter