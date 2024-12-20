import React, { useState } from "react";
import axios from "axios";

import useAuth from "../../../../hooks/useAuth";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";

const UserAddStore = () => {
  // Base URL for the API
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

  // Axios instance with base URL and Authorization header
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  const { user, setUser, saveUserToLocalStorage } = useAuth();
  const [storeDetails, setStoreDetails] = useState({
    name: "",
    location: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        name: storeDetails?.name,
        location: storeDetails?.location,
        description: storeDetails?.description,
        created_by: user?._id,
      })
    );

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/stores`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setSuccessMessage("Store created successfully!");
      setUser((prev) => ({
        ...prev,
        store_id: response?.data?.data?._id,
        is_store_owner: true,
      }));
      saveUserToLocalStorage({
        ...user,
        store_id: response?.data?.data?._id,
        is_store_owner: true,
      });
      setStoreDetails({ name: "", location: "", description: "" });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to create store."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-2">
      <BackToPrev
        className={"mb-2"}
        path={"/dashboard/user/store"}
        title={"Back"}
      ></BackToPrev>
      <h2>Create Store</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-success">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={storeDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={storeDetails.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={storeDetails.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "Loading..." : "Create Store"}
        </button>
      </form>
    </div>
  );
};

export default UserAddStore;
