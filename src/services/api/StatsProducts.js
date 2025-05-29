import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

/**
 * Top Sales Varieties
 */
async function getTopSalesVarieties({
  startDate,
  endDate,
  limit = 10,
  order = "desc",
}) {
  const token = await getToken();
  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/stats/top-sales-varieties`,
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        startDate,
        endDate,
        limit, 
        order,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

/**Top Profitable Varieties */
async function getTopProfitableVarieties({
  startDate,
  endDate,
  limit = 10,
  order = "desc",
}) {
  const token = await getToken();
  if (!token) throw new Error("Token not found");
  try {
    const res = await axios({
      url: `${URL}/stats/top-profitable-varieties`,
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        startDate,
        endDate,
        limit,
        order,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

/**
 * Total Sales Over Time
 */
async function getTotalSales({ startDate, endDate, granularity = "day" }) {
  const token = await getToken();
  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/stats/top-sales-product`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: { startDate, endDate, granularity },
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const StatsProductsService = {
  getTopSalesVarieties,
  getTopProfitableVarieties,
  getTotalSales,
};

export default StatsProductsService;
