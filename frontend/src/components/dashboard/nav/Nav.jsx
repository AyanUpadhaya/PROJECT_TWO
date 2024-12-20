import useAuth from "../../../hooks/useAuth";
import DropCircle from "./DropCircle";

const Nav = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <div>
      <header className="p-3 text-bg-light shadow-sm">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <div className="ms-auto text-end">
              {isAuthenticated && (
                <DropCircle logout={logout} user={user}></DropCircle>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Nav;
