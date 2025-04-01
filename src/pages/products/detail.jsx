import { useRoute } from "wouter";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import productsData from "@/data/products.json";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProductQuantity } from "@/hooks/useProductQuantity";

function ProductDetail() {
  const [match, params] = useRoute("/producto/:id");

  const renderError = (message) => (
    <DefaultLayout>
      <h1>{message}</h1>
    </DefaultLayout>
  );

  if (!match) return renderError("Ruta no válida");

  const productId = parseInt(params.id);
  const product = productsData.find((p) => p.id === productId);
  if (!product) return renderError("Producto no encontrado");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { quantity, increment, decrement } = useProductQuantity(
    product.cantidad
  );

  const handleBuy = () => {
    console.log(`Compraste ${quantity} unidades de ${product.name}`);
  };

  const bgCoffee = "bg-[rgba(183,110,73,0.42)]";

  return (
    <DefaultLayout>
      <div className="flex flex-row gap-10 p-10 flex-wrap max-w-6xl mx-auto justify-center">
        <div className="w-[30%] flex items-center justify-center min-w-[250px] bg-[#F4F4F4] overflow-hidden">
          <img
            src={"/cafe.webp"}
            alt={product.name}
            className="max-w-[300px] w-full h-auto transition-transform duration-300 hover:scale-110"
          />
        </div>

        <Card className="w-full md:w-[40%] max-w-[400px] border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">{product.name}</CardTitle>
            <div className="text-gray-700 text-base font-bold italic">
              {product.description}
            </div>
            <div className="text-3xl text-[#FF0004] font-bold">
              {product.price}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className={`${bgCoffee} text-center py-2 rounded`}>
              Disponible:{" "}
              <span className="font-semibold">{product.cantidad} unidades</span>
            </div>

            <div className="text-gray-700 text-sm space-y-1">
              <p>
                <span className="font-semibold">Sabor:</span> {product.sabor}
              </p>
              <p>
                <span className="font-semibold">Tostado:</span>{" "}
                {product.tostado}
              </p>
              <p>
                <span className="font-semibold">Presentación:</span>{" "}
                {product.presentacion}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center border py-0 ${bgCoffee} rounded`}
              >
                <Button
                  variant="ghost"
                  className="px-2 hover:bg-transparent"
                  onClick={decrement}
                >
                  -
                </Button>
                <span className="px-4">{quantity}</span>
                <Button
                  variant="ghost"
                  className="px-2 hover:bg-transparent"
                  onClick={increment}
                >
                  +
                </Button>
              </div>
              <Button variant="outline">Añadir al carrito</Button>
            </div>
          </CardContent>

          <CardFooter className="flex">
            <Button className="bg-black text-white w-full" onClick={handleBuy}>
              Comprar producto
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DefaultLayout>
  );
}

export default ProductDetail;
