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
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(10).optional(),
  country: z.string().max(255),
  state: z.string().max(255),
  farm: z.string().max(255),
});

function Form({ onSubmit }) {
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
        <div className="bg-[#ECECEC] p-10">
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
                      Teléfono <span className="text-gray-400">(opcional)</span>
                    </FormLabel>
                    <Input type="number" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormDescription>Nombre de la finca del café</FormDescription>
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