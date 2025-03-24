import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";

import HomePage from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import AdminPage from "./pages/admin";
import ProductsCreatePage from "./pages/products/create";
import ProductDetail from "./pages/products/detail";

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

        <Route component={ProductDetail} path="/producto/:id" />

        <Route>
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
