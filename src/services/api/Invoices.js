import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAllInvoices({ page = 1, search }) {
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
        const invoice = datos.data.invoices.find(inv => inv.id === Number(id));

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
      responseType: "blob", 
    });

    return res.data; 
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function generateCsv({ from, to, limit }) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `http://localhost:8080/api/invoices/report/csv`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
      params: {
        from,
        to,
        limit,
      },
      responseType: "blob", 
    });

    return res.data; 
  } catch (error) {
    return handleAxiosError(error);
  }
}


const InvoicesService = {
    getAllInvoices,
    getInvoiceByID,
    generatePdf,
    generateCsv,

};

export default InvoicesService;