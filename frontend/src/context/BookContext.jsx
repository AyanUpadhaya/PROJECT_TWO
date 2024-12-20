import axios from "axios";
import { createContext, useState, useCallback, useEffect } from "react";
import { getToken } from "../utils/getToken";
import useLoadUser from "../hooks/useLoadUser";
import { useLocation } from "react-router-dom";

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isBookPosting, setIsBookPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [deleteError, setdeleteError] = useState(null);
  const [books, setBooks] = useState([]);
  const [storeBooks, setStoreBooks] = useState([]);
  const { user } = useLoadUser();
  const location = useLocation();

  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Axios instance with Authorization header

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Create a new book
  const createBook = async (bookData, coverPhoto) => {
    setIsBookPosting(true);
    setError(null);
    const formData = new FormData();

    // Append the book data object as a string
    formData.append("data", JSON.stringify(bookData));

    // Append the file
    if (coverPhoto) {
      formData.append("file", coverPhoto);
    }

    try {
      const response = await axiosInstance.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStoreBooks((prev) => [...prev, response?.data?.data]);

      return response?.data?.data;
    } catch (err) {
      setError(err);
    } finally {
      setIsBookPosting(false);
    }
  };

  // Fetch all books
  const getAllBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/books");
      if (response?.data) {
        setBooks(response?.data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  const getBooksByStore = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        `/books/store/${user?.store_id}`
      );
      if (response?.data) {
        setStoreBooks(response?.data);
      }
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  // Update a book
  const updateBook = async (bookId, updatedData, coverPhoto) => {
    setIsBookPosting(true);
    setError(null);
    const formData = new FormData();

    // Append updated data
    formData.append("data", JSON.stringify(updatedData));

    // Append the new file if provided
    if (coverPhoto) {
      formData.append("file", coverPhoto);
    }

    try {
      const response = await axiosInstance.put(`/books/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStoreBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? response.data.data : book
        )
      );
      return response.data?.data;
    } catch (err) {
      setError(err);
    } finally {
      setIsBookPosting(false);
    }
  };

  // Delete a book
  const deleteBook = async (bookId) => {
    setIsDeleting(true);
    setdeleteError(null);

    try {
      await axiosInstance.delete(`/books/${bookId}`);
      setStoreBooks(storeBooks.filter((item) => item._id !== bookId));
    } catch (err) {
      setError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  function isActive(path, location) {
    return path.includes(location.pathname) ? true : false;
  }

  const libs = {
    user,
    books,
    loading,
    error,
    storeBooks,
    setStoreBooks,
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    isBookPosting,
    setIsBookPosting,
    isDeleting,
    setIsDeleting,
    deleteError,
  };

  useEffect(() => {
    if (books.length == 0) {
      getAllBooks();
      if (isActive(["/dashboard/user/books"], location)) {
        if (storeBooks.length == 0 && user?.is_store_owner) getBooksByStore();
      }
    }
  }, []);

  return <BookContext.Provider value={libs}>{children}</BookContext.Provider>;
};
