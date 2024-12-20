import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within an StoreProvider");
  }
  return context;
}
export default useStore;