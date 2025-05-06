import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function useUser() {
  const context = useContext(UserContext);
  //console.log("Datos que se reciben:", context);

  return {
    ...context,
  };
}

export default useUser;
