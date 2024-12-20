// Get token from localStorage
export const getToken = () => {
  const authData = localStorage.getItem("buchhandlung_auth");
  if (authData) {
    try {
      const parsedAuth = JSON.parse(authData);
      return parsedAuth.token;
    } catch (e) {
      console.error("Failed to parse authentication token:", e);
      return null;
    }
  }
  return null;
};
