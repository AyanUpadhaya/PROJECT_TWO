import axios from "axios";
import { createContext, useState } from "react";
import { getToken } from "../utils/getToken";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Update order status
  const updateOrderStatus = async (id, status) => {
    setStatusUpdating(true);
    setError(null);
    try {
      const response = await axiosInstance.patch(`/orders/status/${id}`, {
        status,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? { ...order, status: response.data.data?.status }
            : order
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
    } finally {
      setStatusUpdating(false);
    }
  };

  // Delete an order
  const deleteOrder = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/orders/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders by store
  const fetchOrdersByStore = async (storeId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/orders/store/${storeId}`);
      setOrders(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const libs = {
    fetchOrdersByStore,
    deleteOrder,
    updateOrderStatus,
    orders,
    error,
    loading,
    statusUpdating,
  };

  return <OrderContext.Provider value={libs}>{children}</OrderContext.Provider>;
};
