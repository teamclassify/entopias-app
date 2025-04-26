import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormUI,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import AddressService from "../../services/api/Address";

const formSchema = z.object({
  address: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
  country: z.string().min(3).max(255),
  postalCode: z.string().min(3).max(255),
});

function NewAddress({ onChange }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
  });

  const mutateCreateAddress = useMutation({
    mutationFn: ({ data }) => AddressService.createAddress(data),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Dirección creada");
      onChange("direcciones");
    },
    onError: (error) => {
      toast.error("Ocurrió un error al crear la dirección");
      console.log(error);
    },
  });

  const handleSubmit = (formValues) => {
    mutateCreateAddress.mutate({
      data: formValues,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="font-bold text-[20px] py-4">Editar Perfil</p>
      <div>
        <FormUI {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="w-full grid gap-4 h-full">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código Postal</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-row justify-between">
                <Button
                  type="submit"
                  className="w-[48%]"
                  disabled={mutateCreateAddress.isLoading}
                >
                  {mutateCreateAddress.isLoading ? "Guardando..." : "Guardar"}
                </Button>
                <Button
                  type="button"
                  className="w-[48%] px-4 py-2 bg-gray-200 text-gray-700  hover:bg-gray-300"
                  onClick={() => onChange("direcciones")}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </form>
        </FormUI>
      </div>
    </div>
  );
}

export default NewAddress;
