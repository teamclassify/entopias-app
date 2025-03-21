import { Link, useLocation } from "wouter";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import useUser from "@/hooks/useUser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

function SignIn() {
  const [, setLocation] = useLocation();
  const { loginWithGoogle, loginWithEmail } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const res = await loginWithEmail(email, password);

    if (res.status === 200) {
      setLocation("/");
    }
  };

  return (
    <DefaultLayout>
      <h1>Iniciar Sesion</h1>

      <form onSubmit={handleSignUp} className="grid w-full items-center gap-4">
        <div className="flex flex-row space-x-5 space-y-1.5 gap-5 items-center">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            placeholder="Ejemplo@correo.com"
            autoComplete="email"
          />
        </div>
        <div className="flex flex-row gap-3 items-center justify-space-between">
          <Label htmlFor="passwd">Contraseña</Label>
          <Input
            id="passwd"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
          />
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
          <Link to="/recuperar">
            <Button variant="link">¿Olvidaste tu contraseña?</Button>
          </Link>
        </div>
        <div className="flex justify-between">
          <Button className="px-12" type="submit">
            Ingresar
          </Button>
          <div className="flex gap-2">
            <Button
              variant="Link"
              onClick={loginWithGoogle}
              className="text-lg p-2"
            >
              <FcGoogle className="text-2xl" />
            </Button>
          </div>
        </div>
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
      </form>
    </DefaultLayout>
  );
}

export default SignIn;
