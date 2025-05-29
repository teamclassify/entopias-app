import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAllInvoices({ page = 1, search, status }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/invoices`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        page,
        search,
        status,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function getInvoiceByID({ id }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/invoices`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        id,
      },
    });
    const datos = res.data;
    const invoice = datos.data.invoices.find((inv) => inv.id === Number(id));

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    return invoice;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function generatePdf({ from, to, limit }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/invoices/report`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        from,
        to,
        limit,
      },
      responseType: "blob", // 👈 esto es clave para obtener el archivo
    });

    return res.data; // Esto será un blob
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function getTopSelling({ limit = 5 }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/invoices/top-selling`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit,
      },
    });

    return res.data.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const InvoicesService = {
  getAllInvoices,
  getInvoiceByID,
  generatePdf,
  getTopSelling,
};

export default InvoicesService;
