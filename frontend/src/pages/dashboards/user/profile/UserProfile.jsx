import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import EditIcon from "../../../../components/dashboard/icons/EditIcon";
import { profile } from "../../../../assets/getAssets";

function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="w-100 ">
        <div className="d-flex flex-column justify-content-between gap-3 ">
          <div className="d-flex justify-content-between gap-3 align-items-center">
            <div>
              <h2>Profile</h2>
            </div>
            <div>
              <button
                onClick={() => navigate("/dashboard/user/settings")}
                className="btn btn-success"
              >
                <EditIcon />
              </button>
            </div>
          </div>
          {/* card */}
          <div>
            <div className=" py-5">
              <div className="d-flex flex-column align-items-center  gap-3">
                <div
                  style={{ width: "300px", height: "300px" }}
                  className="p-2 rounded object-cover bg-success rounded-circle"
                >
                  {user?.photoUrl ? (
                    <>
                      <img
                        src={user?.photoUrl}
                        className=" img-fluid rounded-circle object-cover"
                      />
                    </>
                  ) : (
                    <img
                      src={profile}
                      className=" img-fluid rounded-circle object-cover"
                    />
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Name: {(user && user?.name) || "user"}
                  </h5>
                  <p className="card-text">
                    <span className="fw-bold">Address:</span>{" "}
                    {(user && user?.address) || "No data found"}
                  </p>
                  <div className="card-text">
                    <span className="fw-bold">Email:</span>{" "}
                    {(user && user?.email) || "No data found"}
                    <br />
                    <span className="fw-bold">Store Id:</span>{" "}
                    {(user && user?.store_id) || "No data found"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
