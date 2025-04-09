import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProductQuantity } from "@/hooks/useProductQuantity";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Loading } from "../../components/ui/loading";
import ProductsService from "../../services/api/Products";
import { useEffect, useState } from "react";

function ProductDetail() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products-page", id],
    queryFn: () => (id ? ProductsService.getById(id) : null),
    enabled: !!id,
  });

  const stockValue = data?.data?.stock || 0;
  const { quantity, increment, decrement } = useProductQuantity(stockValue);
  const [weightSelected, setWeightSelected] = useState(0);

  if (isError || data?.error) {
    return <Error message={data?.msg || "An unexpected error occurred"} />;
  }

  const handleBuy = () => {
    console.log(`Compraste ${quantity} unidades de ${data.data.name}`);
  };

  const bgCoffee = "bg-[rgba(183,110,73,0.42)]";
  const url = "/cafe.webp";

  const price =
    data?.data?.varieties
      .find((variety) => variety.id === weightSelected)
      ?.price.toLocaleString("es-CO") || "No aplica";

  useEffect(() => {
    setWeightSelected(data?.data?.varieties[0].id);
  }, [data]);

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.data ? (
            <div className="flex flex-row gap-10 p-10 flex-wrap max-w-6xl mx-auto justify-center">
              <div className="w-[30%] flex items-center justify-center min-w-[250px] bg-[#F4F4F4] overflow-hidden">
                <img
                  src={
                    data.data.photos.length > 0 ? data.data.photos[0].url : url
                  }
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
                    {data.data.description}
                  </div>
                  <div className="text-3xl text-[#FF0004] font-bold">
                    ${price}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* <div className={`${bgCoffee} text-center py-2 rounded`}>
                    Disponible:{" "}
                    <span className="font-semibold">
                      {data.data.stock} unidades
                    </span>
                  </div> */}

                  <div className="text-gray-700 text-sm space-y-4">
                    <p>
                      <span className="font-semibold">Notas olfativas:</span>{" "}
                      {data?.data?.batches[0]?.aromaticNotes ?? "No aplica"}
                    </p>
                    <p>
                      <span className="font-semibold">Tipo:</span>{" "}
                      {data?.data?.type ?? "No aplica"}
                    </p>

                    <h3 className="text-md font-semibold">
                      Selecciona el peso
                    </h3>
                    <div className="flex flex-row gap-2">
                      {data.data.varieties.map((variety) => (
                        <div
                          key={variety.id}
                          className={`rounded-md border p-2 cursor-pointer transition-all duration-300 ${
                            weightSelected === variety.id
                              ? "bg-secondary text-white border-secondary"
                              : ""
                          }`}
                          onClick={() => setWeightSelected(variety.id)}
                        >
                          <p>{variety.weight} gr</p>
                        </div>
                      ))}
                    </div>
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
          ) : (
            <div>No se encontró el producto</div>
          )}
        </>
      )}
    </DefaultLayout>
  );
}

export default ProductDetail;
