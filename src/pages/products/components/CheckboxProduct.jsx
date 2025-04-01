import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import UsersService from "../../../services/api/Users";

function CheckboxProduct({ productId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return UsersService.updateRole(data);
    },
    onSuccess: (data) => {
      console.log(data);
      setStatus(data.data.error ? false : !data.data.error);
    },
  });

  const handleChange = (checked) => {
    mutate({
      id: productId,
      status: checked,
    });
  };

  return <Checkbox defaultChecked={status} onCheckedChange={handleChange} />;
}

export default CheckboxProduct;
