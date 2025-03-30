import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAll({ page = 0 }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/users`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        page,
      },
    });

    if (res.status !== 200) {
      throw new Error("Error obteniendo los usuarios");
    }

    if (!res.data || !res.data?.data) {
      throw new Error("No se encontraron usuarios");
    }

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const UsersService = {
  getAll,
};

export default UsersService;
