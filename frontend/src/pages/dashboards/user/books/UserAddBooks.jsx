import React, { useState, useEffect, useCallback } from "react";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import axios from "axios";
import { getToken } from "../../../../utils/getToken";
import useBooks from "../../../../hooks/useBooks";
import AddForm from "./AddForm";
import { useNavigate } from "react-router-dom";

const UserAddBooks = ({ onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user, isBookPosting, createBook } = useBooks();

  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Axios instance with base URL and Authorization header
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Fetch all categories

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }, [BASE_URL]);

  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    about: "",
    published_date: "",
    language: "",
    qty: 1,
    price: 0,
    sell_price: 0,
    tags: "",
    category_id: "",
    store_id: user?.store_id,
    created_by: user?._id,
  });

  const handleCategoryChange = (categoryId) => {
    setBookDetails((prev) => ({ ...prev, category_id: categoryId }));
  };

  const [coverPhoto, setCoverPhoto] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhoto(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (bookDetails.qty < 1) {
      alert("Qty can not be less than one");
      return;
    }

    if (bookDetails.price == 0 || bookDetails.sell_price == 0) {
      alert("price can not be zero");
      return;
    }

    const formData = new FormData();
    // Append the book details as a JSON string
    const bookData = {
      ...bookDetails,
      tags: bookDetails.tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
    };

    // Pass the formData to the parent component or API function
    createBook(bookData, coverPhoto)
      .then((data) => {
        if (data?._id) {
          navigate("/dashboard/user/books");
        }
      })
      .catch((error) => {
        setErrorMessage(error?.message);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mt-2">
      <BackToPrev
        className={"mb-2"}
        path={"/dashboard/user/books"}
        title={"Back"}
      ></BackToPrev>
      <h2>Create Book</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-success">{errorMessage}</div>
      )}
      {/* form */}
      <AddForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        bookDetails={bookDetails}
        categories={categories}
        handleFileChange={handleFileChange}
        handleCategoryChange={handleCategoryChange}
        isBookPosting={isBookPosting}
      ></AddForm>
    </div>
  );
};

export default UserAddBooks;
