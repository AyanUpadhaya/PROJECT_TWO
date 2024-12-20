import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";

function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within an CategoryProvider");
  }
  return context;
}
export default useCategories;
