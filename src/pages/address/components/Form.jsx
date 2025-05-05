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
import LocationSelector from "@/components/ui/location-input";


const formSchema = z.object({
  city: z.string().min(1, "La ciudad es requerida"),
  country: z.string().min(1, "El país es requerido"),
  state: z.string().min(1, "El estado es requerido"),
  postalCode: z.string().min(1, "El código postal es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
});


function Form({ onSubmit, isLoading }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      state: "",
      country: "",
      postalCode: "",
      address: "",
    },
  });

  const handleSubmit = (data) => {
    onSubmit(data); 
  };

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="md:bg-sidebar-accent md:p-10 md:rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      <FormDescription>El país y estado</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Bogotá" {...field} />
                  </FormControl>
                  <FormDescription>Ciudad</FormDescription>
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
                    <Input placeholder="Ej: 540001" {...field} />
                  </FormControl>
                  <FormDescription>Código postal de tu zona</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Calle 10 #15-20" {...field} />
                  </FormControl>
                  <FormDescription>Dirección exacta</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button className="mt-6" type="submit">
              {isLoading ? "Guardando dirección..." : "Guardar dirección"}
            </Button>
          </div>
        </div>
      </form>
    </FormUI>
  );
}

export default Form;
