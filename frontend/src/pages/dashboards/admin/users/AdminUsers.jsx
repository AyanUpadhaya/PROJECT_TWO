import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../../../utils/getToken";
import "./AdminUsersTable";
import AdminUsersTable from "./AdminUsersTable";
import FullPageLoader from "../../../../components/loader/FullPageLoader";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Axios instance with Authorization header

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

   if (loading) {
     return <FullPageLoader></FullPageLoader>;
   }

  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Users </h2>
          </div>
        </div>
        {/* table */}
        <div>
          <AdminUsersTable users={users}></AdminUsersTable>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
