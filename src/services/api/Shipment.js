import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getCities(city) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/shipments/cities`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        city,
      },
    });
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

async function add({ ciudadDestinoId }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/shipments`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        ciudadOrigenId: 22,
        ciudadDestinoId,
        valorDeclarado: 50000,
      },
    });
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

const ShipmentServices = { getCities, add };

export default ShipmentServices;
