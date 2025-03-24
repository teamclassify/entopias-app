import { Button } from "@/components/ui/button.tsx";
function Filter() {
  return (
    <div className="bg-amber-200">
      <h1>Filtrar Cantidad</h1>
      <div className="flex gap-4">
        <Button>250g</Button>
        <Button>500g</Button>
        <Button>1kg</Button>
      </div>
    </div>
  );
}
export default Filter;
