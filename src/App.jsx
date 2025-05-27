import { Toaster } from "@/components/ui/sonner";
import { Route, Switch } from "wouter";

import Address from "./pages/address";
import AddAddress from "./pages/address/add";
import AdminPage from "./pages/admin";
import ClientManagment from "./pages/admin/client-management";
import CreateBatchPage from "./pages/Batch/create";
import Cart from "./pages/cart";
import ProductCatalog from "./pages/catalog";
import HomePage from "./pages/home";
import InvoicesManagment from "./pages/invoices";
import ViewDetails from "./pages/invoices/ViewDetails";
import NotFoundPage from "./pages/not-found";
import OrdersManagment from "./pages/orders";
import OrderDetails from "./pages/orders/OrderDetails";
import Payments from "./pages/payments";
import PaymentsSuccessPage from "./pages/payments/success";
import CreateProducerPage from "./pages/producer/create";
import ProducersListPage from "./pages/producer/list";
import ProductsBatchListPage from "./pages/products/batch";
import ProductsCreatePage from "./pages/products/create";
import ProductDetail from "./pages/products/detail";
import ProductsEditPage from "./pages/products/edit";
import ProductsListPage from "./pages/products/list";
import Profile from "./pages/profile";
import RecoveryPasswordPage from "./pages/recovery-password";
import RecoveryPasswordCompletedPage from "./pages/recovery-password/completed";
import CreateSalesPage from "./pages/sales/create";
import ListSalesPage from "./pages/sales/list";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import Traceability from "./pages/traceability";

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Switch>
        <Route component={HomePage} path="/" />
        <Route component={SignInPage} path="/iniciar-sesion" />
        <Route component={SignUpPage} path="/registrarse" />
        <Route component={RecoveryPasswordPage} path="/recuperar" />
        <Route path="/perfil/:page?" component={Profile} />

        <Route
          component={RecoveryPasswordCompletedPage}
          path="/recuperar-enviado"
        />

        <Route component={ProductCatalog} path="/tienda" />

        <Route component={Payments} path="/pagos" />
        <Route component={PaymentsSuccessPage} path="/pagos/exitoso" />

        <Route component={AdminPage} path="/admin" />
        <Route component={ProductsListPage} path="/admin/productos" />
        <Route component={ProductsBatchListPage} path="/admin/lotes" />
        <Route component={ProductsCreatePage} path="/admin/productos/agregar" />
        <Route component={ProductsEditPage} path="/admin/productos/:id" />
        <Route component={ClientManagment} path="/admin/clientes" />
        <Route component={ListSalesPage} path="/admin/asistentes" />
        <Route component={CreateSalesPage} path="/admin/asistentes/agregar" />
        <Route component={InvoicesManagment} path="/admin/facturas" />
        <Route component={ViewDetails} path="/admin/facturas/:id" />
        <Route component={OrdersManagment} path="/admin/pedidos" />
        <Route component={OrderDetails} path="/admin/pedidos/:id" />
        <Route
          component={CreateProducerPage}
          path="/admin/productores/agregar"
        />
        <Route component={ProducersListPage} path="/admin/productores" />
        <Route component={CreateBatchPage} path="/admin/lotes/agregar" />
        <Route component={ProductDetail} path="/producto/:id" />
        <Route component={Cart} path="/carrito" />
        <Route component={Address} path="/carrito/direccion" />
        <Route component={AddAddress} path="/carrito/direccion/nueva" />
        <Route component={Traceability} path="/origen/:id" />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
