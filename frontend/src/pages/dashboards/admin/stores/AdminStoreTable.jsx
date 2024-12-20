import React from "react";
import formatToLocaleDateString from "../../../../utils/formatToLocaleDateString";

const AdminStoreTable = ({ data }) => {
  const truncate = (text) => {
    if (text) return text.length > 34 ? text.slice(0, 34) + "..." : text;
    return text;
  };
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Store Name</th>
              <th scope="col">Owner</th>
              <th scope="col">Books</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={item?._id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{truncate(item?.name)}</td>
                  <td>{item?.created_by?.name}</td>
                  <td>{item?.book_ids?.length}</td>
                  <td>{formatToLocaleDateString(item?.createdAt)}</td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td colSpan="7" className="text-center">
                    No store found.
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminStoreTable;
