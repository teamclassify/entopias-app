import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAll({ page = 1, search, status }) {
  try {
    const res = await axios({
      url: `${URL}/products`,
      method: "GET",
      headers: {
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

async function getById(id) {
  try {
    const res = await axios({
      url: `${URL}/products/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function update(id, data) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  const formData = new FormData();

  formData.append("name", data.name);

  formData.append("status", true);
  formData.append("description", data.description);
  formData.append("type", data.type);

  data.photos.forEach((photo) => {
    if (typeof photo !== "string") formData.append("newphotos", photo);
    else formData.append("photos", photo);
  });

  data.varieties.forEach((variety) => {
    formData.append("varieties", JSON.stringify(variety));
  });

  try {
    const res = await axios({
      url: `${URL}/products/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

async function create(data) {
  const token = await getToken();

  if (!token) throw new Error("Token not found");

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("precio", data.precio);
  formData.append("stock", data.stock);
  formData.append("descripcion", data.descripcion);
  formData.append("loteId", data.loteId);

  data.photos.forEach((photo) => {
    formData.append("photos", photo);
  });

  try {
    const res = await axios({
      url: `${URL}/products`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error);
  }
}

const ProductsService = {
  getAll,
  getById,
  update,
  create,
};

export default ProductsService;
