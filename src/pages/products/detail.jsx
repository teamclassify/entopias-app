import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Loading } from "../../components/ui/loading";
import ProductsService from "../../services/api/Products";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useCart from "@/hooks/useCart.js";
import Quantity from "@/pages/cart/components/Quantity.jsx";
import { ShoppingCart } from "lucide-react";

function ProductDetail() {
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const [quantity, setQuantity] = useState(1);
  const { handleUpdateData, isPending } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ["products-page", id],
    queryFn: () => (id ? ProductsService.getById(id) : null),
    enabled: !!id,
  });

  const getStock = () => {
    const variety = data?.data.varieties.find((v) => v.id === varietyId);
    return variety ? variety.stock : 0;
  };

  const [varietyId, setVarietyId] = useState(0);
  const stockValue = getStock();

  const handleAddCart = () => {
    handleUpdateData(varietyId, quantity, false);
  };

  const url = "/cafe.webp"; //Cuando no hay foto disponible

  const price =
    data?.data?.varieties
      .find((variety) => variety.id === varietyId)
      ?.price.toLocaleString("es-CO") || "No aplica";

  useEffect(() => {
    setVarietyId(data?.data?.varieties[0].id);
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
                      <span className="font-semibold">
                        {t("products.olfactory_notes")}:
                      </span>{" "}
                      {data?.data?.batches[0]?.aromaNotes ?? "No aplica"}
                    </p>
                    <p>
                      <span className="font-semibold">
                        {t("products.type")}:
                      </span>{" "}
                      {data?.data?.type ?? "No aplica"}
                    </p>

                    <h3 className="text-md font-semibold">
                      {t("products.select_weight")}
                    </h3>
                    <div className="flex flex-row gap-2">
                      {data.data.varieties.map((variety) => (
                        <div
                          key={variety.id}
                          className={`rounded-md border p-2 cursor-pointer transition-all duration-300 ${
                            varietyId === variety.id
                              ? "bg-secondary text-white border-secondary"
                              : ""
                          }`}
                          onClick={() => setVarietyId(variety.id)}
                        >
                          <p>{variety.weight} gr</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Quantity
                      id={data.id}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      stock={stockValue}
                      varietyId={varietyId}
                      isCartPage={false}
                    />
                    <Button
                      variant="outline"
                      onClick={handleAddCart}
                      disabled={isPending}
                      className="p-6 border-1"
                    >
                      {isPending
                        ? t("products.adding_cart")
                         : t("products.add_cart")}
                         <ShoppingCart />
                    </Button>
                  </div>
                </CardContent>

                <CardFooter className="flex">
                  <Button
                    className="bg-black text-white w-full"
                    onClick={handleAddCart}
                  >
                    <Link href="/carrito">{t("products.buy_now")}</Link>
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
