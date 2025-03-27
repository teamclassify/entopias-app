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
import { Link, useLocation } from "wouter";
import { z } from "zod";

import SignLayout from "@/components/layouts/SignLayout";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function SignIn() {
  const [, setLocation] = useLocation();
  const { loginWithGoogle, loginWithEmail } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }) {
    const res = await loginWithEmail(email, password);

    if (res.status === 200) {
      setLocation("/");
    } else {
      toast.error("Credenciales incorrectas");
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SignLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-sm mx-4 grid gap-4"
        >
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

          <div className="flex justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showpasswd"
                checked={showPassword}
                onCheckedChange={toggleShowPassword}
              />
              <label
                htmlFor="showpasswd"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mostrar Contraseña
              </label>
            </div>
            <Link to="/recuperar" className="text-xs">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button className="px-12 w-full cursor-pointer" type="submit">
            Ingresar
          </Button>

          <div className="flex justify-start items-center">
            <label
              htmlFor="newuser"
              className="text-sm font-medium leading-none text-gray-400 mr-1"
            >
              ¿Eres nuevo?
            </label>
            <Link to="/registrarse">
              <Button variant="link" className="p-0">
                Crea tu cuenta
              </Button>
            </Link>
          </div>

          <Button
            variant="secondary"
            onClick={loginWithGoogle}
            className="p-2 w-full cursor-pointer"
          >
            Ingresar con Google
            <FcGoogle className="text-2xl" />
          </Button>
        </form>
      </Form>
    </SignLayout>
  );
}

export default SignIn;
