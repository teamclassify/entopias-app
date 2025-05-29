import axios from "axios";
import { URL, handleAxiosError } from "."; // tu archivo de config base
import { getToken } from "./Auth";         // ya lo usas en otros servicios

async function sendOrderEmail({ invoiceId, email, subject, message }) {
  const token = await getToken();
  if (!token) throw new Error("Token not found");

  try {
    const res = await axios({
      url: `${URL}/emails/invoices/${invoiceId}/send-email`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        email,
        subject,
        message,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const EmailService = {
  sendOrderEmail,
};

export default EmailService;
