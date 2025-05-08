import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfSales from "./components/ListOfSales";

function InvoicesManagment() {
  // const [searchByName, setSearchByName] = useState("");
  // const [text] = useDebounce(searchByName, 500);

  return (
    <AdminLayout>
      <main>
        <h1 className="font-bold">Ver Facturas</h1>
        {/* <section className="flex flex-row gap-3 pt-4 pb-4">
          <Input
            placeholder="Buscar"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
          />
          <Button variant="outline">Buscar</Button>
        </section> */}
        <ListOfSales />
      </main>
    </AdminLayout>
  );
}
export default InvoicesManagment;
