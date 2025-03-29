import { Button } from "@/components/ui/button.tsx";
import { Slider } from "@/components/ui/slider.tsx";

function PriceFilter() {
  return (
    <div className="bg-[#F2E4DC] p-3">
      <div className="flex items-center justify-center ">
        <h1 className="font-bold text-xl">Filtrar por precio</h1>
      </div>
      <hr className="border-1 border-[#B76E49] mb-4"/>
      <Slider
        defaultValue={[33]}
        min={20}
        max={140}
        step={1}
        className="pb-3"
      />
      <p className="font-bold text-sm pb-2">Precio 20.000$ - 140.000$</p>

      <Button className="bg-[#B76E49]">Filtrar</Button>
    </div>
  );
}

export default PriceFilter