import axios from "axios";
import { URL, handleAxiosError } from ".";
import { getToken } from "./Auth";

async function getAllOrders({ page = 1, search }) {
    const token = await getToken();

    if (!token) throw new Error("Token not found");
    try {
        const res = await axios({
            url: `${URL}/orders`,
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

async function getOrderByID({ id }) {
    const token = await getToken();

    if (!token) throw new Error("Token not found");

    try {
        const res = await axios({
            url: `${URL}/orders`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params: {
                id,
            },
        });
        console.log(res.data);

        const datos = res.data;
        console.log(datos);

        const order = datos.data.orders.find(inv => inv.id === Number(id));
        console.log(order);

        if (!order) {
            console.log("sapa no sirve");
            throw new Error(`Order with id ${id} not found`);
        }

        console.log(order);

        return order;
    } catch (error) {
        return handleAxiosError(error);
    }

}

async function getOrderByUserId({ page = 1, search, userId }) {
    const token = await getToken();

    if (!token) throw new Error("Token not found");
    
    try {
        const res = await axios({
            url: `${URL}/orders`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params: {
                page,
                search,
                userId,
            },
        });

        return res.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const OrdersService = {
    getAllOrders,
    getOrderByID,
    getOrderByUserId,
};

export default OrdersService;