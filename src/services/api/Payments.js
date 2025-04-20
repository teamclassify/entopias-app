import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function createPaymentIntent({ products, currency = "usd" }) {
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
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const paymentsService = {
  createPaymentIntent,
};

export default paymentsService;
