import { Button } from "@/components/ui/button.tsx";

function CategoryCoffe() {
  return (
    <div className="bg-[#F2E4DC] p-3">
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-xl">Filtrar por tipo de café</h1>
      </div>
      <hr className="border-1 border-[#B76E49] mb-4"/>
      <div className="flex flex-row flex-wrap gap-3 w-full">
        <Button disabled className="bg-[#B76E49]">Tostado</Button>
        <Button disabled className="bg-[#B76E49]">Tueste</Button>
        <Button disabled className="bg-[#B76E49]">Grano</Button>
      </div>
    </div>
  );
}

export default CategoryCoffe;
