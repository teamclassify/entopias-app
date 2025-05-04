import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAll() {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/cart`,
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
      url: `${URL}/cart`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

async function add(varietyId, quantity) {
  try {
    const token = await getToken();

    if (!token) throw new Error("Token not found");

    const res = await axios({
      url: `${URL}/cart`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        varietyId: varietyId,
        quantity: quantity,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function remove(varietyId) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/cart`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        varietyId: varietyId,
      },
    });
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
const CartServices = { getAll, create, add, remove };

export default CartServices;
