import React, { useState } from "react";
import axios from "axios";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../../../hooks/useStore";

const UserUpdateStore = () => {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const { setMystore } = useStore();
  const navigate = useNavigate();
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
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [storeDetails, setStoreDetails] = useState({
    name: payload?.name || "",
    location: payload?.location || "",
    description: payload?.description || "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pictureUpdating, setPictureUpdating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        name: storeDetails?.name,
        location: storeDetails?.location,
        description: storeDetails?.description,
      })
    );

    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/stores/${payload?._id}`,
        formData
      );
      setSuccessMessage("Store updated successfully!");
      setMystore((prev) => ({
        ...prev,
        name: response?.data?.data?.name,
        location: response?.data?.data?.location,
        description: response?.data?.data?.description,
      }));
      if (response?.data?.data?._id) navigate("/dashboard/user/store");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update store."
      );
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPicture = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (coverPhoto) {
      formData.append("file", coverPhoto);
      try {
        setPictureUpdating(true);
        const response = await axiosInstance.patch(
          `/stores/${payload?._id}/picture`,
          formData
        );
        setSuccessMessage("Picture updated successfully!");

        setMystore((prev) => ({
          ...prev,
          cover_photo: response?.data?.data?.cover_photo,
        }));
      } catch (error) {
        setErrorMessage(
          error.response?.data?.data.message || "Failed to update store."
        );
        console.error(error);
      } finally {
        setPictureUpdating(false);
      }
    }

    return;
  };

  return (
    <div className="container mt-2">
      <BackToPrev
        className={"mb-2"}
        path={"/dashboard/user/store"}
        title={"Back"}
      ></BackToPrev>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-success">{errorMessage}</div>
      )}
      {/* update cover photo */}
      <div>
        <h4>Update cover photo</h4>
        <div>
          <form onSubmit={handleSubmitPicture}>
            <div className="mb-3">
              <label htmlFor="coverPhoto" className="form-label">
                Cover Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="coverPhoto"
                name="cover_photo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button
              disabled={pictureUpdating}
              type="submit"
              className="btn btn-primary"
            >
              {pictureUpdating ? "Loading..." : "Change cover"}
            </button>
          </form>
        </div>
      </div>
      <br />

      {/* update store details */}
      <div>
        <h4>Update store details</h4>
        <br />
        <form onSubmit={handleSubmitDetails}>
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
            {loading ? "Loading..." : "Update Store"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateStore;
