import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { z } from "zod";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import { resetPassword } from "@/services/firebase";

const formSchema = z.object({
  email: z.string().email(),
});

function RecoveryPasswordPage() {
  const [, setLocation] = useLocation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    const { email } = values;

    const data = await resetPassword(email);

    if (data.status === 200) {
      toast.success(
        "Correo enviado correctamente, revisa tu bandeja de entrada."
      );
      setLocation("/recuperar-enviado");
    } else {
      toast.error(data.error);
    }
  }

  return (
    <DefaultLayout className="flex items-center justify-center h-[calc(100vh-20rem)]">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Recuperar contraseña</h1>
        <p className="text-gray-600 mb-4">
          Introduce tu correo electrónico para recibir un enlace de recuperación
          de contraseña
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Correo electrónico <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Enviar enlace de recuperación de contraseña
            </Button>
          </form>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default RecoveryPasswordPage;
