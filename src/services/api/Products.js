import axios from "axios";
import { URL, handleAxiosError } from ".";
// import { getToken } from "./Auth";

async function getAll() {
  // const token = await getToken();

  // if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/products`,
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const ProductsService = {
  getAll,
};

export default ProductsService;
