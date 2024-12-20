import React from "react";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import { useNavigate, useLocation } from "react-router-dom";
import useCategories from "../../../../hooks/useCategories";

const AdminUpdateCategory = () => {
  const { loading, error, updateCategory } = useCategories();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { payload, type } = state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.name.value;
    if (categoryName == payload?.name) {
      alert("No changes made");
      return;
    }

    updateCategory(payload._id, { name: categoryName })
      .then((data) => {
        if (data?.success) {
          navigate("/dashboard/admin/categorys");
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="py-2">
      <BackToPrev path={"/dashboard/admin/categorys"} title={"Back"} />
      <div className="d-flex flex-column justify-content-between gap-3 p-3 ">
        <div>
          <h2>Update Category</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              defaultValue={payload?.name}
              type="text"
              className="form-control"
              name="name"
            />
            <br />
            <button disabled={loading} className="btn btn-dark">
              {loading ? "Submiting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateCategory;
