import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AddressService from "../../../services/api/Address";
import { DialogDeleteAddress } from "./DialogDeleteAddress";

function AdressCard({ id, address, city, country, postalCode, onChange }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteAddress } = useMutation({
    mutationFn: () => AddressService.deleteAddress(id),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Dirección eliminada");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      toast.error("Ocurrió un error al eliminar la dirección");
      console.log(error);
    },
  });

  const handleDeleteAddress = () => {
    deleteAddress(id);
    setOpen(false);
  };

  return (
    <div className="border-1 border-[#C6CCD5] h-20 p-3">
      <div className="flex flex-row w-full h-full justify-between">
        <div className="w-[95%] flex flex-col justify-between">
          <div className="flex flex-row ">
            <p className="w-24 truncate capitalize">{address}</p>
          </div>
          <p className="text-sm text-[#737373] capitalize">
            {`${city}, ${country} ${postalCode}`}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <EditIcon
            className="cursor-pointer text-gray-400"
            size={16}
            onClick={() =>
              onChange("editar-direccion", {
                id,
                address,
                city,
                country,
                postalCode,
              })
            }
          />

          <TrashIcon
            className="cursor-pointer text-gray-400"
            size={16}
            onClick={() => setOpen(true)}
          />

          <DialogDeleteAddress
            open={open}
            setOpen={setOpen}
            address={{
              id,
              address,
              city,
              country,
              postalCode,
            }}
            handleConfirm={handleDeleteAddress}
          />
        </div>
      </div>
    </div>
  );
}

export default AdressCard;
