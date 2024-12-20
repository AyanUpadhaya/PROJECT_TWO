import React, { useState, useEffect, useCallback } from "react";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import axios from "axios";
import { getToken } from "../../../../utils/getToken";
import useBooks from "../../../../hooks/useBooks";

import { useLocation, useNavigate } from "react-router-dom";
import UpdateBookForm from "./UpdateBookForm";
import { hasStateChanged } from "../../../../utils/hasStateChanged";

const UserUpdateBooks = ({ onSubmit }) => {
  const { state } = useLocation();
  const { payload, type } = state || {};

  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { user, isBookPosting, updateBook } = useBooks();

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
    title: payload?.title || "",
    author: payload?.author || "",
    about: payload?.about || "",
    published_date: payload?.published_date || "",
    language: payload?.language || "",
    qty: payload?.qty || 1,
    price: payload?.price || 0,
    sell_price: payload?.sell_price || 0,
    tags: payload?.tags?.join(", ") || "",
    category_id: payload?.category_id?._id || "",
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

  //checks empty property
  function hasEmptyProperties(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        // Check for empty strings, null, or undefined
        if (value === "" || value === null || value === undefined) {
          return true;
        }

        // Optionally check for nested objects
        if (typeof value === "object" && !Array.isArray(value)) {
          if (hasEmptyProperties(value)) return true;
        }
      }
    }
    return false;
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(bookDetails);

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

    if (hasEmptyProperties(bookDetails)) {
      console.log(bookDetails);
      alert("Empty data can not be sent");
      return;
    }

    // Pass the formData to the parent component or API function
    updateBook(payload?._id, bookData, coverPhoto).then((data) => {
      if (data?._id) {
        navigate("/dashboard/user/books");
      }
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
      <h2>Update Book</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-success">{errorMessage}</div>
      )}
      {/* form */}
      <UpdateBookForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        bookDetails={bookDetails}
        categories={categories}
        handleFileChange={handleFileChange}
        handleCategoryChange={handleCategoryChange}
        isBookPosting={isBookPosting}
      ></UpdateBookForm>
    </div>
  );
};

export default UserUpdateBooks;
