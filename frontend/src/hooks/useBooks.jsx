import { useContext } from "react";
import { BookContext } from "../context/BookContext";

function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within an BookProvider");
  }
  return context;
}
export default useBooks;
