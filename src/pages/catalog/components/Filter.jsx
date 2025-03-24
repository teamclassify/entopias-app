import { Button } from "@/components/ui/button.tsx";

function Filter() {
  return (
    <div className="bg-[#B76E49] p-3">
      <div className="flex items-center justify-center pb-4">
        <h1>Filtrar Cantidad</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-3 w-full">
        <Button>250g</Button>
        <Button>500g</Button>
        <Button>1kg</Button>
        <Button>5kg</Button>
        <Button>10kg</Button>
      </div>
    </div>
  );
}

export default Filter;