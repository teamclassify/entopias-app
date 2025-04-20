import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAll({ page = 1, search }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/producers`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        page,
        search,
      },
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function getById(id) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");
  
  try {
    const res = await axios({
      url: `${URL}/producers/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

async function create(data) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/producers`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const ProducersServices = { getAll, getById, create };

export default ProducersServices;
