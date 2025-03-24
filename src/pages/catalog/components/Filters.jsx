import { Button } from "@/components/ui/button.tsx";
import { Slider } from "@/components/ui/slider.tsx";

function Filters() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-[#F2E4DC] p-3">
        <div className="flex items-center justify-center pb-4">
          <h1 className="font-bold">Filtrar por precio</h1>
        </div>
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
    </div>
  );
}

export default Filters;
