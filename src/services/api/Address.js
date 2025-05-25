import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAddress() {
  const token = await getToken();

  try {
    const res = await axios({
      url: `${URL}/addresses`,
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

async function createAddress({ city, country, postalCode, address }) {
  const token = await getToken();
  try {
    const res = await axios({
      url: `${URL}/addresses`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        city,
        country,
        postalCode,
        address,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function deleteAddress(id) {
  const token = await getToken();

  try {
    const res = await axios({
      url: `${URL}/addresses/${id}`,
      method: "DELETE",
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

async function updateAddress(id, { city, country, postalCode, address }) {
  const token = await getToken();

  try {
    const res = await axios({
      url: `${URL}/addresses/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        city,
        country,
        postalCode,
        address,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const AddressService = {
  createAddress,
  getAddress,
  deleteAddress,
  updateAddress,
};

export default AddressService;
