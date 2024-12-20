import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/getToken";

const useOrdersApi = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/orders");
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single order by ID
  const fetchOrderById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${BASE_URL}/${id}`);
      setOrder(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  // Create a new order
  const createOrder = async (newOrder) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(`/orders`, newOrder);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
      
    } finally {
      setLoading(false);
    }
  };

  

  // Fetch orders for the logged-in user
  const fetchUserOrders = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/orders/${userId}/my_orders`);
      setOrders(response.data.data);
      return response.data.data;
    } catch (err) {
   
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    order,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,  
    fetchUserOrders,
 
  };
};

export default useOrdersApi;
