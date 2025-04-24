import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAll({ page = 1, search }) {
  const token = await getToken();
  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/orders`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: { page, search },
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
      url: `${URL}/orders/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function countAll(params = {}) {
  const token = await getToken();
  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/orders/count`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params,
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const OrdersService = { getAll, getById, countAll };

export default OrdersService;
