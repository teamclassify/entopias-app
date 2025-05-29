import { Button } from "@/components/ui/button";
import InvoicesService from "../../services/api/Invoices";
import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfSales from "./components/ListOfSales";

function InvoicesManagment() {
  // const [searchByName, setSearchByName] = useState("");
  // const [text] = useDebounce(searchByName, 500);

  const handleDownloadPdf = async () => {
  try {
    const blob = await InvoicesService.generatePdf({});

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reporte_facturas.pdf"); // 👈 nombre del archivo
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // liberar memoria
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};


  return (
    <AdminLayout>
      <main>
        <h1 className="text-2xl font-bold pt-6">Facturas</h1>
        <div className="flex flex-row gap-2 ">
          <Button
            type="button"
            variant="secondary"
            onClick={handleDownloadPdf}
            //onClick={() => {}}
            className="mb-2"
          >
            PDF
          </Button>
          <Button
            type="button"
            variant="secondary"
            //onClick={() => {}}
            className="mb-2"
          >
            CSV
          </Button>
        </div>
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
