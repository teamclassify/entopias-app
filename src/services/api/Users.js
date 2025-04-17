import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAll({ page = 0, role, search }) {
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
        role,
        search,
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

async function updateRole({ id, role }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/users/${id}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        role,
      },
    });

    if (res.status !== 200) {
      throw new Error("Error actualizando el usuario");
    }

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function updateUser({ id, data }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  console.log("Datos que se enviarán al backend:", data);

  try {
    const res = await axios({
      url: `${URL}/users/${id}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    });

    if (res.status !== 200) {
      throw new Error("Error actualizando el usuario");
    }

    return res.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return handleAxiosError(error);
  }
}


const UsersService = {
  getAll,
  updateRole,
  updateUser,
};

export default UsersService;
