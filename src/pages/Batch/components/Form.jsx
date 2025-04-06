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

const formSchema = z.object({
  initialWeight: z.string().min().max(255),
  finalWeight: z.string().min().max(255),
  roastedDate: z.string().min().max(255),
  roastedType: z.string().min().max(255),
  aromaticsNotes: z.string().min().max(255),
  expirationDate: z.string().min().max(255),
  producer: z.string().min().max(255),
});

function Form({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialWeight: "",
      finalWeight: "",
      roastedDate: "",
      roastedType: "",
      aromaticsNotes: "",
      expirationDate: "",
      producer: "",
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
        <div className="bg-[#ECECEC] p-10">
          <div className="">
            <div className="w-full grid gap-4 h-full">
              <div className="grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="initialWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso Inicial</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Peso final</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>El peso final del lote</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="roastedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha del tostado</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
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

              <div className="grid grid-cols-2 gap-8">
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
                    <FormItem>
                      <FormLabel>Fecha de vencimiento</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        La fecha de vencimiento del lote
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="producer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Productor</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      El nombre del productor asociado el lote
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-4" type="submit">
                Crear cuenta
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormUI>
  );
}

export default Form;
