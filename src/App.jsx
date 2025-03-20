import { Route, Switch } from "wouter";

import HomePage from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";

function App() {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={SignInPage} path="/iniciar-sesion" />
        <Route component={SignUpPage} path="/registrarse" />
      </Switch>
    </>
  );
}

export default App;
