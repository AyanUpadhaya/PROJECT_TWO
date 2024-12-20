import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";

const UserSettings = () => {
  const { user, setUser, saveUserToLocalStorage } = useAuth();
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

  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imageUpdating, setImageUpdating] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpadating] = useState(false);
  const [isDetailsUpdating, setIsDetailsUpadating] = useState(false);
  const [imgValid, setImgValid] = useState(false);

  // input changes for user details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // image file selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      setErrorMessage("Only JPEG or PNG images are allowed.");
      setImgValid(false);
      return;
    }

    if (file.size > maxSize) {
      setErrorMessage("Image size should not exceed 2MB.");
      setImgValid(false);
      return;
    }

    // If valid, update the state
    setPhotoFile(file);
    setErrorMessage("");
    setImgValid(true);
  };

  // user details form submission
  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    // Prepare form data
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        name: userDetails.name,
        email: userDetails.email,
        address: userDetails.address,
      })
    );

    try {
      setIsDetailsUpadating(true);

      const response = await axiosInstance.put(`/users/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("User details updated successfully.");
      setUser((prev) => ({
        ...prev,
        name: response?.data?.user?.name,
        email: response?.data?.user?.email,
        address: response?.data?.user?.address,
      }));
      saveUserToLocalStorage({
        ...user,
        ...response?.data?.user,
      });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      setErrorMessage(errorMessage);
    } finally {
      setIsDetailsUpadating(false);
    }
  };

  //user picture update
  const handleUserPhoto = async (e) => {
    e.preventDefault();
    // Prepare form data
    const formData = new FormData();

    if (photoFile) {
      formData.append("file", photoFile);
    } else {
      alert("No photo file choosen");
    }

    try {
      setImageUpdating(true);
      const response = await axiosInstance.patch(
        `/users/${user._id}/picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("User Picture updated successfully.");
      if (response?.data?.user) {
        setUser((prev) => ({
          ...prev,
          photoUrl: response?.data?.user?.photoUrl,
        }));
        saveUserToLocalStorage({
          ...user,
          photoUrl: response?.data?.user?.photoUrl,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      setErrorMessage(errorMessage);
    } finally {
      setImageUpdating(false);
    }
  };

  // password form submission
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        oldPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })
    );

    try {
      setIsPasswordUpadating(true);
      const response = await axiosInstance.put(
        `/users/${user._id}/password`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Explicitly set the content type
          },
        }
      );

      setSuccessMessage("Password updated successfully.");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      setErrorMessage(errorMessage);
    } finally {
      setIsPasswordUpadating(false);
    }
  };
  return (
    <div className="container mt-4">
      <h2>Settings</h2>

      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <br />
      <div className="row">
        <div className="col-md-6">
          {/* Form for updating user details */}
          <form
            onSubmit={handleUserDetailsSubmit}
            className="mb-4 d-flex flex-column gap-2"
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control form-control-lg rounded-pill"
                value={userDetails?.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control form-control-lg rounded-pill bg-light"
                value={userDetails?.email}
                onChange={handleInputChange}
                required
                readOnly
              />

              <span className="text-xs text-success">
                You can't change email
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control form-control-lg rounded-pill"
                value={userDetails?.address}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <button
              disabled={isDetailsUpdating}
              type="submit"
              className="btn btn-primary rounded-pill w-full "
            >
              {isDetailsUpdating ? "Loading..." : "Update Details"}
            </button>
          </form>
        </div>

        {/* updating password */}
        <div className="col-md-6">
          <form
            onSubmit={handlePasswordUpdate}
            className="d-flex flex-column gap-3"
          >
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="form-control form-control-lg rounded-pill"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control form-control-lg rounded-pill"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control form-control-lg rounded-pill"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
            </div>
            <br />
            <button
              disabled={isPasswordUpdating}
              type="submit"
              className="btn btn-secondary rounded-pill"
            >
              {isPasswordUpdating?"Loading..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
      <br />
      <div className="row ">
        <div className="col-md-6 mb-2">
          <h5>Update Picture</h5>
          <form onSubmit={handleUserPhoto}>
            <div className="form-group">
              <label htmlFor="photo">Profile Picture</label>
              <input
                type="file"
                id="photo"
                className="form-control form-control-lg rounded-pill"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <br />
            <button
              disabled={imageUpdating || !imgValid}
              type="submit"
              className="btn btn-primary rounded-pill "
            >
              {imageUpdating ? "Loading...." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
