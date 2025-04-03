import { useRoute } from "wouter";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "../../services/api/Products";
import { Button } from "@/components/ui/button";
import { Loading } from "../../components/ui/loading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProductQuantity } from "@/hooks/useProductQuantity";

function ProductDetail() {
  const [, params] = useRoute("/producto/:id");

  const id = params?.id ? parseInt(params.id) : null;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => id ? ProductsService.getById(id) : null,
    enabled: !!id,
  });

  const stockValue = data?.data?.stock || 0;
  const { quantity, increment, decrement } = useProductQuantity(stockValue);

  //console.log(data);

  if (isError || data?.error) {
    return <Error message={data?.msg || "An unexpected error occurred"} />;
  }

  const handleBuy = () => {
    console.log(`Compraste ${quantity} unidades de ${data.data.name}`);
  };

  const bgCoffee = "bg-[rgba(183,110,73,0.42)]";
  const url = "/cafe.webp";

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-row gap-10 p-10 flex-wrap max-w-6xl mx-auto justify-center">
          <div className="w-[30%] flex items-center justify-center min-w-[250px] bg-[#F4F4F4] overflow-hidden">
            <img
              src={data.data.photos.length > 0 ? data.data.photos[0].url : url}
              alt={data.data.name}
              className="max-w-[300px] w-full h-auto transition-transform duration-300 hover:scale-110"
            />
          </div>

          <Card className="w-full md:w-[40%] max-w-[400px] border-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">
                {data.data.name}
              </CardTitle>
              <div className="text-gray-700 text-base font-bold italic">
                {data.data.descripcion}
              </div>
              <div className="text-3xl text-[#FF0004] font-bold">
                ${data.data.precio.toLocaleString("es-CO")}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className={`${bgCoffee} text-center py-2 rounded`}>
                Disponible:{" "}
                <span className="font-semibold">
                  {data.data.stock} unidades
                </span>
              </div>

              <div className="text-gray-700 text-sm space-y-1">
                <p>
                  <span className="font-semibold">Sabor:</span>{" "}
                  {data.data.sabor ? "" : "Amargo"}
                </p>
                <p>
                  <span className="font-semibold">Tostado:</span>{" "}
                  {data.data.lote.tostado ? "" : "Normal"}
                </p>
                {/*}
              <p>
                <span className="font-semibold">Presentación:</span>{" "}
                {data.presentacion}
              </p>
              {*/}
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
              <Button
                className="bg-black text-white w-full"
                onClick={handleBuy}
              >
                Comprar producto
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </DefaultLayout>
  );
}

export default ProductDetail;
