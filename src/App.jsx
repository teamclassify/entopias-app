import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";

import HomePage from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import AdminPage from "./pages/admin";
import ProductsCreatePage from "./pages/products/create";
import ProductCatalog from "./pages/catalog"

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={SignInPage} path="/iniciar-sesion" />
        <Route component={SignUpPage} path="/registrarse" />

        <Route component={AdminPage} path="/admin" />

        <Route component={ProductsCreatePage} path="/admin/productos/agregar" />
        <Route component={ProductCatalog} path="/catalogo-productos" />


        <Route>
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
