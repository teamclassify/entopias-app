import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function createPaymentIntent({ products, currency = "usd", address }) {
  const token = await getToken();

  try {
    const res = await axios({
      url: `${URL}/payments/create-checkout-session`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        products,
        currency,
        address,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function getPayment(session_id) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/payments/get-payment/${session_id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const paymentsService = {
  createPaymentIntent,
  getPayment,
};

export default paymentsService;
