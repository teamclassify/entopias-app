import { Button } from "@/components/ui/button";
import { Link } from "wouter";

import DefaultLayout from "@/components/layouts/DefaultLayout";

function NotFoundPage() {
  return (
    <DefaultLayout className="text-center grid place-items-center h-[calc(100vh-10rem)]">
      <div className="space-y-4">
        <span className="font-bold text-8xl text-secondary">404</span>
        <h1 className="text-3xl">Pagina no encontrada</h1>
        <p className="text-gray-500">
          La pagina que estas buscando no existe. Por favor, verifica la URL e
          intenta de nuevo.
        </p>

        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </DefaultLayout>
  );
}

export default NotFoundPage;
