import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import UsersService from "../../../services/api/Users";
import ProductsService from "../../../services/api/Products";

function CheckboxProduct({ productId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return ProductsService.update(data.id, data.data);
    },
    onSuccess: (data) => {
      setStatus(data.data.error ? false : !data.data.error);
    },
  });

  const handleChange = (checked) => {
    mutate({
      id: productId,
      data: { status: checked },
    });
  };

  return <Checkbox defaultChecked={status} onCheckedChange={handleChange} />;
}

export default CheckboxProduct;
