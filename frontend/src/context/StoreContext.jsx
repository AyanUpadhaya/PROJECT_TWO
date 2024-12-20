import { createContext, useCallback, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState(null);
  const [userStores, setUserStores] = useState([]);
  const [myStore, setMystore] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Get token from localStorage
  const getToken = () => {
    const authData = localStorage.getItem("buchhandlung_auth");
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        return parsedAuth.token;
      } catch (e) {
        console.error("Failed to parse authentication token:", e);
        return null;
      }
    }
    return null;
  };

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Helper to handle errors
  const handleError = (err) => {
    setError(err?.response?.data?.message || "An unexpected error occurred");
    setLoading(false);
  };

  // Get all stores
  const getAllStores = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/stores`);
      setStores(data);
      const findStore = data.find((store) => store._id == user.store_id);
      if (findStore) {
        setMystore(findStore);
      } else {
        setMystore({});
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Get a store by ID
  const getStoreById = async (id) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/stores/${id}`);
      setStore(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update a store
  const updateStore = async (id, updatedData) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.put(`/stores/${id}`, updatedData);
      setStores((prev) =>
        prev.map((store) => (store._id === id ? data : store))
      );
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a store
  const deleteStore = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/stores/${id}`);
      setStores((prev) => prev.filter((store) => store._id !== id));
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Get all stores created by the user

  const getUserStores = useCallback(
    async (userId) => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/stores/user/${userid}`);
        setUserStores(data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [BASE_URL]
  );

  // Like or Unlike a store
  const toggleLikeStore = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/stores/${id}/toggle-like`
      );
      setStores((prev) =>
        prev.map((store) =>
          store._id === id ? { ...store, liked_by: data.liked_by } : store
        )
      );
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stores.length == 0) {
      getAllStores();
    }
  }, []);

  const libs = {
    loading,
    stores,
    error,
    myStore,
    setMystore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
    getUserStores,
  };

  return <StoreContext.Provider value={libs}>{children}</StoreContext.Provider>;
};
