import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAdminSummary() {
  const token = await getToken();
  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/admin/summary`,
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

async function getRecentInvoices() {
  const token = await getToken();
  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/invoices/recent`,
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

async function getRecentUsers() {
  const token = await getToken();
  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/users/recent`,
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

const DashboardService = {
  getAdminSummary,
  getRecentInvoices,
  getRecentUsers,
};

export default DashboardService;
