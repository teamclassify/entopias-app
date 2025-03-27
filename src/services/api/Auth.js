import axios from "axios";
import { URL, handleAxiosError } from ".";

import { auth } from "@/config/firebase";

async function getToken() {
  const t = (await auth.currentUser?.getIdToken()) || null;

  if (!t) throw new Error("Token not found");

  return t;
}

async function login(user) {
  try {
    const token = await getToken();

    if (!token) throw new Error("Token not found");

    const res = await axios({
      url: `${URL}/auth/login`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: user,
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function register({ name, email, password, phone }) {
  try {
    const res = await axios({
      url: `${URL}/auth/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        email,
        password,
        phone,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function getUserById(id) {
  try {
    const token = await getToken();

    const res = await axios({
      url: `${URL}/auth/id/${id}`,
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

export { getToken, getUserById, login, register };
