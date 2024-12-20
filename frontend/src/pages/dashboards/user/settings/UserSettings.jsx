import axios from "axios";
import useProfileSettings from "./useProfileSettings";

const UserSettings = () => {
  const {
    userDetails,
    photoFile,
    passwords,
    errorMessage,
    successMessage,
    imageUpdating,
    isPasswordUpdating,
    isDetailsUpdating,
    imgValid,
    handleInputChange,
    handleImageChange,
    handleUserDetailsSubmit,
    handleUserPhoto,
    handlePasswordUpdate,
  } = useProfileSettings();
  return (
    <div className="container mt-4">
      <h2>Settings</h2>

      {errorMessage && (
        <div className="alert alert-success">{errorMessage}</div>
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
              Update Password
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
