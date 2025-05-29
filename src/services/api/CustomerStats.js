import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getStats(path, params = {}) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/customer-stats/${path}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return res.data?.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const CustomerStatsService = {
  getTotalCustomers: () => getStats("total-customers"),
  getRegisteredMonthly: (months = 12) => getStats("registered-monthly", { months }),
  getCustomersWithOrders: () => getStats("with-orders"),
  getTopSpenders: (limit = 5) => getStats("top-spenders", { limit }),
  getCustomersByCity: () => getStats("by-city"),
  getCustomersByCountry: () => getStats("by-country"),
  getCustomersWithPendingInvoices: () => getStats("unpaid-invoices"),
};

export default CustomerStatsService;
