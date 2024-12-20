import axios from "axios";
import { getToken } from "../utils/getToken";
import useLoadUser from "./useLoadUser";
import { useState } from "react";

const useAxios = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useLoadUser();
  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const getAllBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/books");
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  


  return {
    getAllBooks,
    books,
    loading,
    error,
  };
};

export default useAxios;
