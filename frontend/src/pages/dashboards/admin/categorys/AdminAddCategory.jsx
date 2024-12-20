import React from "react";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import useCategories from "../../../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
const AdminAddCategory = () => {
  const { loading, error, createCategory } = useCategories();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.name.value;
    createCategory({ name: categoryName })
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
          <h2>Add Category</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" className="form-control" name="name" required />
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

export default AdminAddCategory;
