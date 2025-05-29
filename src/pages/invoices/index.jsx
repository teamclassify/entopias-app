import { Button } from "@/components/ui/button";
import InvoicesService from "../../services/api/Invoices";
import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfSales from "./components/ListOfSales";
import { File } from "lucide-react";
import { toast } from "sonner";

function InvoicesManagment() {
  // const [searchByName, setSearchByName] = useState("");
  // const [text] = useDebounce(searchByName, 500);

  const handleDownloadPdf = async () => {
    try {
      const toastID = toast.loading("Generando PDF...", {
        duration: 0, // Indefinido hasta que se complete la acción
      });
      const blob = await InvoicesService.generatePdf({});
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_facturas.pdf"); // 👈 nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // liberar memoria
      toast.success("PDF generado exitosamente", {
        id: toastID,
      });
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <AdminLayout>
      <main>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold pt-6">Facturas</h1>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleDownloadPdf}
              className="mb-2"
            >
              PDF
              <File />
            </Button>
            {/* <Button type="button" className="mb-2">
              CSV
              <File />
            </Button> */}
          </div>
        </div>
        <ListOfSales />
      </main>
    </AdminLayout>
  );
}
export default InvoicesManagment;
