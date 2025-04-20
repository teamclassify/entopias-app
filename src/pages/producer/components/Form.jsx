import { Button } from "@/components/ui/button";
import {
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
import LocationSelector from "@/components/ui/location-input";

const formSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(255, { message: "El nombre no puede exceder los 255 caracteres" }),
  email: z
    .string({ required_error: "El correo electrónico es obligatorio" })
    .email({ message: "Debe ser un correo electrónico válido" }),
  phone: z
    .string()
    .min(10, { message: "El teléfono debe tener al menos 10 dígitos" })
    .optional(),
  country: z
    .string({ required_error: "El país es obligatorio" })
    .min(1, "El nombre del pais es obligatorio")
    .max(255, { message: "El país no puede exceder los 255 caracteres" }),
  state: z
    .string({ required_error: "El estado es obligatorio" })
    .min(1, "El nombre del pais y estado es obligatorio")
    .max(255, { message: "El estado no puede exceder los 255 caracteres" }),
  farm: z
    .string({
      required_error: "El nombre de la finca es obligatorio",
      invalid_type_error: "El nombre de la finca debe ser una cadena de texto",
    })
    .min(1, "El nombre de la finca es obligatorio"),
});

function Form({ onSubmit, isLoading}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      farm: "",
    },
  });

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="md:bg-sidebar-accent md:p-10 md:rounded-md">
          <div className="">
            <div className="w-full grid gap-4 h-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <Input {...field} />
                    <FormDescription>
                      El nombre de la persona de la cuenta.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Teléfono{" "}
                        <span className="text-gray-400">(opcional)</span>
                      </FormLabel>
                      <Input type="number" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="country"
                render={({ field: countryField }) => (
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field: stateField }) => (
                      <FormItem>
                        <FormLabel>País y Estado</FormLabel>
                        <div>
                          <LocationSelector
                            value={{
                              country: countryField.value,
                              state: stateField.value,
                            }}
                            onCountryChange={(country) => {
                              countryField.onChange(country?.name || "");
                              stateField.onChange("");
                            }}
                            onStateChange={(state) => {
                              stateField.onChange(state?.name || "");
                            }}
                          />
                        </div>
                        <FormDescription>
                          El país y estado de la finca del productor
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="farm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finca</FormLabel>
                    <Input {...field} />
                    <FormDescription>
                      Nombre de la finca del productor
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-4" type="submit">
              {isLoading ? "Creando..." : "Crear Productor"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormUI>
  );
}

export default Form;
