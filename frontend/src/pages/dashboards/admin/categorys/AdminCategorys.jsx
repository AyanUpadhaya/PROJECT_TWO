import React from "react";
import AdminCategoryTable from "./AdminCategoryTable";
import { useNavigate } from "react-router-dom";
import useCategories from "../../../../hooks/useCategories";
import AddIcon from "../../../../components/dashboard/icons/AddIcon";
import FullPageLoader from "../../../../components/loader/FullPageLoader";

const AdminCategorys = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useCategories();

  if (error) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>Something went wrong</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return <FullPageLoader></FullPageLoader>;
  }

  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Categories </h2>
          </div>
          <div>
            <button onClick={() => navigate("add")} className="btn btn-success">
              <AddIcon></AddIcon> 
            </button>
          </div>
        </div>

        <div>
          {loading ? (
            <>
              <div className="p-3">
                <h2 className="fs-3">Loading...</h2>
              </div>
            </>
          ) : (
            <AdminCategoryTable
              data={categories}
              navigate={navigate}
            ></AdminCategoryTable>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategorys;
