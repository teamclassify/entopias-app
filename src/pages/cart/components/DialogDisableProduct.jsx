import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DialogDisableProduct({
  open,
  setOpen,
  product,
  handleConfirm,
}) {
  const onDisable = () => {
    handleConfirm(product);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Eliminar Producto</DialogTitle>
          <DialogDescription>
            ¿Estas seguro que quieres eliminar el articulo {product?.variety?.product?.name}?
          </DialogDescription>
          <DialogFooter className="sm:justify-end pt-4">
            <Button
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="button" variant="destructive" onClick={onDisable}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
