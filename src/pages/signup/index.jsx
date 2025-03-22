import { Link, useLocation } from "wouter";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import SignLayout from "@/components/layouts/SignLayout";
import useUser from "@/hooks/useUser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

function SignUp() {
  const [, setLocation] = useLocation();
  const { loginWithGoogle, registerWithEmail } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const res = await registerWithEmail(email, password);

    if (res.status === 200) {
      setLocation("/");
    }
  };

  return (
    <SignLayout orientation="left">
      <form onSubmit={handleSignUp} className="w-full max-w-lg mx-4 grid gap-4">
        <div>
          <Label htmlFor="email" className="mb-2 font-bold">
            Nombre completo
          </Label>
          <Input id="name" placeholder="Tu nombre" />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2 font-bold">
            Correo electronico
          </Label>
          <Input
            id="email"
            placeholder="ejemplo@correo.com"
            autoComplete="email"
          />
        </div>

        <div>
          <Label htmlFor="passwd" className="mb-2 font-bold">
            Contraseña
          </Label>
          <Input
            id="passwd"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2 font-bold">
            Direccion
          </Label>
          <Input id="address" placeholder="Tu direccion" />
        </div>

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
    </SignLayout>
  );
}

export default SignUp;
