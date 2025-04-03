import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import { z } from "zod";

import SignLayout from "@/components/layouts/SignLayout";
import useUser from "@/hooks/useUser";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  birthdate: z.string().optional(),
});

function SignUp() {
  const [, setLocation] = useLocation();
  const { loginWithGoogle, registerWithEmail } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthdate: "",
    },
  });

  async function onSubmit({ name, email, password, birthdate }) {
    const res = await registerWithEmail(email, password, name, birthdate);

    if (res.status === 200) {
      setLocation("/iniciar-sesion");
      toast.success("Cuenta creada correctamente");
    } else {
      toast.error("Error al crear la cuenta");
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SignLayout orientation="left">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg mx-4 grid gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre completo
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Alex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Correo electronico
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="ejemplo@correo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contraseña
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 
          <div>
            <Label htmlFor="email" className="mb-2 font-bold">
              Direccion
            </Label>
            <Input id="address" placeholder="Tu direccion" />
          </div> */}

          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showpasswd"
                checked={showPassword}
                onCheckedChange={toggleShowPassword}
              />
              <label
                htmlFor="showpasswd"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mostrar Contraseña
              </label>
            </div>
          </div>

          <Button className="px-12 w-full cursor-pointer" type="submit">
            Registrarse
          </Button>

          <div className="flex justify-start items-center">
            <label
              htmlFor="newuser"
              className="text-sm font-medium leading-none text-gray-400 mr-1"
            >
              ¿Ya tienes una cuenta?
            </label>
            <Link to="/iniciar-sesion">
              <Button variant="link" className="p-0">
                Ingresar
              </Button>
            </Link>
          </div>

          <Button
            variant="secondary"
            onClick={loginWithGoogle}
            className="p-2 w-full cursor-pointer"
          >
            Registrarse con Google
            <FcGoogle className="text-2xl" />
          </Button>
        </form>
      </Form>
    </SignLayout>
  );
}

export default SignUp;
