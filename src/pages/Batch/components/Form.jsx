import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormUI,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ComboBoxResponsive } from "./ComboBoxProducer";
import { ComboBoxProducts } from "./ComboBoxProducts";

const formSchema = z.object({
  initialWeight: z
    .string({ required_error: "El peso inicial es requerido" })
    .min(1, "Debe contener al menos un carácter")
    .max(255, "Debe tener como máximo 255 caracteres"),

  finalWeight: z
    .string({ required_error: "El peso final es requerido" })
    .min(1, "Debe contener al menos un carácter")
    .max(255, "Debe tener como máximo 255 caracteres"),

  roastedDate: z.date({
    required_error: "La fecha del tostado es requerida",
    invalid_type_error: "Debe ser una fecha válida",
  }),

  roastedType: z
    .string({ required_error: "El tipo de tostado es requerido" })
    .min(1, "Debe contener al menos un carácter")
    .max(255, "Debe tener como máximo 255 caracteres"),

  aromaticNotes: z
    .string({ required_error: "Las notas aromáticas son requeridas" })
    .min(1, "Debe contener al menos un carácter")
    .max(255, "Debe tener como máximo 255 caracteres"),

  expirationDate: z.date({
    required_error: "La fecha de vencimiento es requerida",
    invalid_type_error: "Debe ser una fecha válida",
  }),
  producer: z.object(
    {
      id: z.number(),
      name: z.string(),
    },
    {
      required_error: "El productor es requerido",
      invalid_type_error: "Debe ser un productor válido",
    }
  ),
  product: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
});

function Form({ onSubmit, isLoading }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialWeight: "",
      finalWeight: "",
      roastedDate: null,
      roastedType: "",
      aromaticNotes: "",
      expirationDate: null,
      producer: null,
      product: null,
    },
  });

  const handleSubmit = (data) => {
    onSubmit({
      ...data,
    });
  };

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="md:bg-sidebar-accent md:p-10 md:rounded-md">
          <div className="">
            <div className="w-full grid gap-4 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="initialWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso Inicial(gr)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        El peso inicial del lote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="finalWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso Final(gr)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>El peso final del lote</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="roastedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha del tostado</FormLabel>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            variant="outline"
                            type="button"
                            className={cn(
                              "w-full flex justify-start items-center font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Elige una fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        La fecha del tostado del lote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roastedType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de tostado</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        El tipo de tostado del lote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="aromaticNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas aromáticas</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        El tipo de notas aromáticas del lote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de vencimiento</FormLabel>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            variant="outline"
                            type="button"
                            className={cn(
                              "w-full flex justify-start items-center font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Elige una fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Fecha de vencimiento del lote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="producer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Productor</FormLabel>
                      <FormControl>
                        <ComboBoxResponsive field={field} />
                      </FormControl>
                      <FormDescription>
                        El nombre del productor asociado el lote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Producto</FormLabel>
                      <FormControl>
                        <ComboBoxProducts field={field} />
                      </FormControl>
                      <FormDescription>
                        El nombre del producto asociado el lote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="mt-4" type="submit" disable={isLoading}>
                {isLoading ? "Creando lote...." : "Crear lote"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormUI>
  );
}

export default Form;
