import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DialogDeleteAddress({ open, setOpen, address, handleConfirm }) {
  const onDisable = () => {
    handleConfirm(address);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Eliminar Dirección</DialogTitle>
          <DialogDescription>
            ¿Estas seguro que quieres eliminar la dirección {address.address}?
          </DialogDescription>
          <DialogFooter className="sm:justify-end pt-4">
            <Button
              type="button"
              variant="secondary"
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
