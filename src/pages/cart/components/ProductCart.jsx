import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogDisableProduct } from "./DialogDisableProduct";
import ProductCartInfo from "./ProductCartInfo";
import { formatPrice } from "../../../utils/formatPrice";
import useCart from "../../../hooks/useCart";
import { Loading } from "../../../components/ui/loading";
import { ShoppingCart } from "lucide-react";

export default function ProductCart() {
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [quantities, setQuantities] = useState({});

  const { data, isLoading, isError, handleConfirmDelete } = useCart();

  const products = data?.data.items || [];

  useEffect(() => {
    if (products.length > 0) {
      const initialQuantities = {};
      products.forEach((product) => {
        initialQuantities[product.variety.id] = product.quantity || 0;
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  if (isLoading) return <Loading />;
  if (isError) return <h1>Ocurrió un error al cargar el carrito.</h1>;

  if (products.length === 0)
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 max-w-md">
          ¡Empieza a llenar tu carrito con productos increíbles! Explora
          nuestras colecciones y encuentra algo que te encante.
        </p>
      </div>
    );

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      handleConfirmDelete(productToDelete.variety.id);
      setOpenDialog(false);
    }
  };

  return (
    <main className="md:w-1/2">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p className="text-red-500">Error al cargar el carrito.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.variety.id}
              className="flex flex-row justify-between"
            >
              <ProductCartInfo
                product={product}
                quantity={quantities[product.variety.id] || 0}
                setQuantity={(value) =>
                  setQuantities((prev) => ({
                    ...prev,
                    [product.variety.id]: value,
                  }))
                }
              />
              <div className="flex flex-col items-end">
                <Button
                  variant="ghost"
                  className="p-1"
                  onClick={() => handleDeleteProduct(product)}
                >
                  <Trash />
                </Button>
                <p>
                  {formatPrice(
                    product.variety.price *
                      (quantities[product.variety.id] || 0)
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <DialogDisableProduct
        product={productToDelete}
        setOpen={setOpenDialog}
        open={openDialog}
        handleConfirm={confirmDelete}
      />
    </main>
  );
}
