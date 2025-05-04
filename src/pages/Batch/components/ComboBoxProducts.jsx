import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "../../../services/api/Products";
import { Loading } from "../../../components/ui/loading";

export function ComboBoxProducts({ field }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant="outline"
            className="flex justify-between w-full"
            type="button"
          >
            {field.value ? field.value.name : "Selecciona el producto"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2" align="start">
          <StatusList setOpen={setOpen} onChange={field.onChange} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button variant="outline" className="flex justify-between w-full" type="button">
          {field.value ? field.value.name : "Selecciona el producto"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} onChange={field.onChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({ setOpen, onChange }) {
  const { isPending, data, isLoading } = useQuery({
    queryKey: ["products", { page: 1, search: "", status: true }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return ProductsService.getAll(params);
    },
  });

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <p>No hay productores registrados en la base de datos</p>
      </div>
    );
  }

  return (
    <Command>
      <CommandInput placeholder="Filtrar por productos" />
      <CommandList>
        <CommandEmpty>No se encontró resultados</CommandEmpty>
        <CommandGroup>
          {data.data.products.map((product) => (
            <CommandItem
              key={product.id}
              value={product.name}
              onSelect={() => {
                onChange(product);
                setOpen(false);
              }}
            >
              {product.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
