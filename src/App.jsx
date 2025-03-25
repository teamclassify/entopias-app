import { Toaster } from "@/components/ui/sonner";
import { Route, Switch } from "wouter";

import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import ProductsCreatePage from "./pages/products/create";
import RecoveryPasswordPage from "./pages/recovery-password";
import RecoveryPasswordCompletedPage from "./pages/recovery-password/completed";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={SignInPage} path="/iniciar-sesion" />
        <Route component={SignUpPage} path="/registrarse" />
        <Route component={RecoveryPasswordPage} path="/recuperar" />
        <Route
          component={RecoveryPasswordCompletedPage}
          path="/recuperar-enviado"
        />

        <Route component={AdminPage} path="/admin" />

        <Route component={ProductsCreatePage} path="/admin/productos/agregar" />

        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
