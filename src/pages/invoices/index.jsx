import { Button } from "@/components/ui/button";
import InvoicesService from "../../services/api/Invoices";
import AdminLayout from "../../components/layouts/AdminLayout";
import ListOfSales from "./components/ListOfSales";
import { useState } from "react";

function InvoicesManagment() {
  // const [searchByName, setSearchByName] = useState("");
  // const [text] = useDebounce(searchByName, 500);

  const [showModal, setShowModal] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [limit, setLimit] = useState("100");

  const handleDownloadPdf = async () => {
    try {
      const query = {};
      if (from) query.from = from;
      if (to) query.to = to;
      if (limit) query.limit = limit;

      const blob = await InvoicesService.generatePdf(query);

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_facturas.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // liberar memoria
      setShowModal(false); // cerrar modal después
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  const handleDownloadCsv = async () => {
    try {
      const query = {};
      if (from) query.from = from;
      if (to) query.to = to;
      if (limit) query.limit = limit;

      const blob = await InvoicesService.generateCsv(query);

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_facturas.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // liberar memoria
      //setShowModal(false); // cerrar modal después
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };


  return (
    <AdminLayout>
      <main>
        <h1 className="font-bold">Ver Facturas</h1>
        <div className="flex flex-row justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowModal(true)}
            className="mb-2"
          >
            Descargar Reporte
          </Button>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-[600px]">
              <h2 className="text-xl font-bold mb-4 text-center">Filtrar Reporte</h2>

              <label className="block mb-2">
                Desde:
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full border px-2 py-1 rounded mt-1"
                />
              </label>

              <label className="block mb-2">
                Hasta:
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full border px-2 py-1 rounded mt-1"
                />
              </label>

              <label className="block mb-4">
                Límite de facturas:
                <input
                  type="number"
                  min="1"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full border px-2 py-1 rounded mt-1"
                />
              </label>

              <div className="flex justify-between">
                <button
                  onClick={handleDownloadPdf}
                  className="bg-[#B76E49] text-white px-4 py-2 rounded hover:bg-[#daa084] cursor-pointer"
                >
                  Descargar PDF
                </button>
                <button
                  onClick={handleDownloadCsv}
                  className="bg-[#B76E49] text-white px-4 py-2 rounded hover:bg-[#daa084] cursor-pointer"
                >
                  Descargar CSV
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
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
