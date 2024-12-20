import React from "react";
import { formatToUSDate } from "../../../../utils/formatToUSDate";
import useCategories from "../../../../hooks/useCategories";
import EditIcon from "../../../../components/dashboard/icons/EditIcon";
import TrashIcon from "../../../../components/dashboard/icons/TrashIcon";

const AdminCategoryTable = ({ navigate, data }) => {
  const { loading, error, deleteCategory } = useCategories();
  const handleNavigate = (item) => {
    navigate(`update`, {
      state: {
        payload: item,
        type: "edit",
      },
    });
  };
  const handleDelete = (id) => {
    deleteCategory(id)
      .then((data) => {
        if (data?.success) {
          alert("Category deleted");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category Name</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, idx) => (
              <tr key={item?._id}>
                <th scope="row">{idx + 1}</th>
                <td>{item?.name}</td>
                <td>{formatToUSDate(item?.createdAt)}</td>
                <td>{formatToUSDate(item?.updatedAt)}</td>
                <td className="d-flex gap-2 align-items-center">
                  <button
                    onClick={() => handleNavigate(item)}
                    className="btn btn-primary"
                  >
                    <EditIcon></EditIcon>
                  </button>
                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="btn btn-danger"
                  >
                    <TrashIcon></TrashIcon>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td colSpan="7" className="text-center">
                  No category found.
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default AdminCategoryTable;
