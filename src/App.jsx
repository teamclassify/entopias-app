import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";

import HomePage from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import AdminPage from "./pages/admin";

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={SignInPage} path="/iniciar-sesion" />
        <Route component={SignUpPage} path="/registrarse" />

        <Route component={AdminPage} path="/admin" />
      </Switch>
    </>
  );
}

export default App;
