import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogDisableProduct } from "./DialogDisableProduct";
import ProductCartInfo from "./ProductCartInfo";
import { formatPrice } from "../../../utils/formatPrice";


export default function ProductCart({ product, isChecked }) {
  const [openDialog, setOpenDialog] = useState(false);

  //const queryClient = useQueryClient();

  /*
  const { mutate, isLoading } = useMutation(
    (data) => {
      return CartService.remove({
        id: data.id,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products-cart");
        toast.success("Se ha eliminado el producto del carrito de compras");
      },
    }
  );
  */

  const handleDeleteProduct = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    // if (isLoading) return;

    //mutate({ id: product.id });
    toast.success("Eliminado..");
  };

  return (
    <main>
      <div className="flex flex-row justify-between">
        <ProductCartInfo product={product} isChecked={isChecked} />
        <div className="flex flex-col items-end">
          <Button variant="ghost" className="p-1" onClick={handleDeleteProduct}>
            <Trash />
          </Button>
          <p>
           {formatPrice(product?.variety.price)}
          </p>
        </div>
      </div>

      {/* <DialogDisableProduct
        product={product}
        setOpen={setOpenDialog}
        open={openDialog}
        handleConfirm={handleConfirmDelete}
      /> */}
    </main>
  );
}
