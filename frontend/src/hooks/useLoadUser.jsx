import React from "react";

const useLoadUser = () => {
  const storedUser = localStorage.getItem("buchhandlung_auth");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    return { user: { ...parsedUser } };
  }
  return { user: {} };
};

export default useLoadUser;
