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
import ProducersServices from "../../../services/api/Producers";
import { Loading } from "../../../components/ui/loading";

export function ComboBoxResponsive({ field }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button variant="outline" className="flex justify-between w-full" type="button">
            {field.value ? field.value.name : "Selecciona el productor"}
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
        <Button
          variant="outline"
          className="flex justify-between w-full"
          type="button"
        >
          {field.value ? field.value.name : "Selecciona el productor"}
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
    queryKey: ["producers", { page: 1, search: "" }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return ProducersServices.getAll(params);
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
      <CommandInput placeholder="Filtrar por productores" />
      <CommandList>
        <CommandEmpty>No se encontró resultados</CommandEmpty>
        <CommandGroup>
          {data.data.producers.map((producer) => (
            <CommandItem
              key={producer.id}
              value={producer.name}
              onSelect={() => {
                onChange(producer);
                setOpen(false);
              }}
            >
              {producer.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
