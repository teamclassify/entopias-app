import { useState } from "react";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import ListOfSales from "./ListOfSales";
import AdminLayout from "../../components/layouts/AdminLayout";

function InvoicesManagment() {
    const [searchByName, setSearchByName] = useState("");
    const [text] = useDebounce(searchByName, 500);

    return (
        <AdminLayout>
            <main>
                <h1 className="font-bold">Ver Facturas</h1>
                <section className="flex flex-row gap-3 pt-4 pb-4">
                    <Input
                        placeholder="Buscar"
                        value={searchByName}
                        onChange={(e) => setSearchByName(e.target.value)}
                    />
                    <Button variant="outline">Buscar</Button>
                </section>
                <ListOfSales searchByName={text} />
            </main>
        </AdminLayout>
    );
}
export default InvoicesManagment;
