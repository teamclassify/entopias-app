import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import UsersService from "../../../services/api/Users";

function CheckboxRole({ userId, roles }) {
  const [isSales, setIsSales] = useState(
    roles.some((role) => role.roleId === 1)
  );

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return UsersService.updateRole(data);
    },
    onSuccess: (data) => {
      setIsSales(!data.data.error);
    },
  });

  const handleChange = (checked) => {
    setIsSales(checked);

    mutate({
      id: userId,
      role: checked ? "sales" : null,
    });
  };

  return <Checkbox defaultChecked={isSales} onCheckedChange={handleChange} />;
}

export default CheckboxRole;
