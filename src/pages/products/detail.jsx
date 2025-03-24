import { useRoute } from "wouter";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import productsData from "@/data/products.json";
import cafeImage from "@/assets/cafe.png";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProductDetail() {
  const [match, params] = useRoute("/producto/:id");

  if (!match) return <DefaultLayout><h1>Ruta no válida</h1></DefaultLayout>;

  const productId = parseInt(params.id);
  const product = productsData.find((p) => p.id === productId);

  if (!product) return <DefaultLayout><h1>Producto no encontrado</h1></DefaultLayout>;

  return (
    <DefaultLayout>
      <div className="flex flex-row gap-10 p-10 flex-wrap max-w-6xl mx-auto justify-center">
        
        {/* Imagen */}
        <div className="w-[30%] flex items-center justify-center min-w-[250px]">
          <img
            src={cafeImage}
            alt={product.name}
            className="max-w-[300px] w-full h-auto"
          />
        </div>

        {/* Card del producto */}
        <Card className="w-full md:w-[40%] max-w-[400px] outline-0">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">{product.name}</CardTitle>
            <CardDescription className="text-3xl text-red-600 font-bold">
              {product.price}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Disponibilidad */}
            <div className="bg-[#D9C3B6] text-center py-2 rounded">
              Disponible: <span className="font-semibold">{product.cantidad} unidades</span>
            </div>

            {/* Detalles del producto */}
            <div className="text-gray-700 text-sm space-y-1">
              <p><span className="font-semibold">Sabor:</span> {product.sabor}</p>
              <p><span className="font-semibold">Tostado:</span> {product.tostado}</p>
              <p><span className="font-semibold">Presentación:</span> {product.presentacion}</p>
              <p><span className="font-semibold">Cantidad disponible:</span> {product.cantidad}</p>
            </div>

            {/* Controles de cantidad y carrito */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border py-0 bg-[#D9C3B6] rounded">
                <Button variant="ghost" className="px-2 hover:bg-transparent">-</Button>
                <span className="px-4">1</span>
                <Button variant="ghost" className="px-2 hover:bg-transparent">+</Button>
              </div>
              <Button variant="outline">Añadir al carrito</Button>
            </div>
          </CardContent>

          <CardFooter className="flex">
            <Button className="bg-black text-white w-[100%]">Comprar producto</Button>
          </CardFooter>
        </Card>
      </div>
    </DefaultLayout>
  );
}

export default ProductDetail;
