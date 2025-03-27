import { Toaster } from "@/components/ui/sonner";
import { Route, Switch } from "wouter";

import AdminPage from "./pages/admin";
import ClientManagment from "./pages/admin/client-management";
import ProductCatalog from "./pages/catalog";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import ProductsCreatePage from "./pages/products/create";
import ProductsEditPage from "./pages/products/edit";
import RecoveryPasswordPage from "./pages/recovery-password";
import RecoveryPasswordCompletedPage from "./pages/recovery-password/completed";
import CreateSalesPage from "./pages/sales/create";
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

        <Route component={ProductCatalog} path="/tienda" />

        <Route component={AdminPage} path="/admin" />
        <Route component={ProductsCreatePage} path="/admin/productos/agregar" />
        <Route component={ProductsEditPage} path="/admin/productos/:id" />
        <Route component={ClientManagment} path="/admin/clientes" />
        <Route component={CreateSalesPage} path="/admin/vendedores/agregar" />

        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
