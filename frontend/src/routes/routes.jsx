import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "../layouts/WebsiteLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import DashboardlLayout from "../layouts/DashboardlLayout";
import AdminHome from "../pages/dashboards/admin/home/AdminHome";
import UserHome from "../pages/dashboards/user/home/UserHome";
import UserProfile from "../pages/dashboards/user/profile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import RedirectToDashboard from "../utils/RedirectToDashboard";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AdminUsers from "../pages/dashboards/admin/users/AdminUsers";
import AdminStores from "../pages/dashboards/admin/stores/AdminStores";
import AdminAddCategory from "../pages/dashboards/admin/categorys/AdminAddCategory";
import AdminCategorys from "../pages/dashboards/admin/categorys/AdminCategorys";
import AdminBooks from "../pages/dashboards/admin/books/AdminBooks";
import AdminUpdateCategory from "../pages/dashboards/admin/categorys/AdminUpdateCategory";
import { CategoryProvider } from "../context/CategoryContext";
import Cart from "../pages/cart/Cart";
import UserBooks from "../pages/dashboards/user/books/UserBooks";
import UserAddBooks from "../pages/dashboards/user/books/UserAddBooks";
import UserUpdateBooks from "../pages/dashboards/user/books/UserUpdateBooks";
import UserPurchase from "../pages/dashboards/user/purchase/UserPurchase";
import UserStore from "../pages/dashboards/user/store/UserStore";
import UserAddStore from "../pages/dashboards/user/store/UserAddStore";
import UserUpdateStore from "../pages/dashboards/user/store/UserUpdateStore";
import UserStoreOrders from "../pages/dashboards/user/orders/UserStoreOrders";
import UserSettings from "../pages/dashboards/user/settings/UserSettings";
import { StoreProvider } from "../context/StoreContext";
import UserStoreDetails from "../pages/dashboards/user/store/UserStoreDetails";
import { BookProvider } from "../context/BookContext";
import BookDetails from "../pages/dashboards/user/books/BookDetails";
import PublicBookDetails from "../pages/bookdetails/PublicBookDetails";
import { CartProvider } from "../context/CartContext";
import LoginRoute from "./LoginRoute";
import { OrderProvider } from "../context/OrderContext";
import Signup from "../pages/auth/Signup";

const router = createBrowserRouter([
  //website
  {
    path: "/",
    element: (
      <CartProvider>
        <WebsiteLayout></WebsiteLayout>
      </CartProvider>
    ),
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "book_details/:book_id",
        element: <PublicBookDetails></PublicBookDetails>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "cart",
        element: (
          <LoginRoute>
            <Cart></Cart>
          </LoginRoute>
        ),
      },
    ],
  },

  //dashboard
  // if user access dashboard route then redirect to role based dashboard
  {
    path: "/dashboard",
    element: <RedirectToDashboard></RedirectToDashboard>,
  },
  //role based dashboard for user and admin
  {
    path: "/dashboard/*",
    element: <DashboardlLayout></DashboardlLayout>,
    children: [
      //admin routes
      {
        path: "admin",
        element: <PrivateRoute role={"admin"}></PrivateRoute>,
        children: [
          {
            path: "",
            element: <AdminHome></AdminHome>,
          },

          {
            path: "users",
            element: <AdminUsers></AdminUsers>,
          },
          {
            path: "books",
            element: (
              <BookProvider>
                <AdminBooks></AdminBooks>
              </BookProvider>
            ),
          },
          {
            path: "stores",
            element: (
              <StoreProvider>
                <AdminStores></AdminStores>
              </StoreProvider>
            ),
          },
          {
            path: "categorys",
            element: (
              <CategoryProvider>
                <AdminCategorys></AdminCategorys>,
              </CategoryProvider>
            ),
          },
          {
            path: "categorys/add",
            element: (
              <CategoryProvider>
                <AdminAddCategory></AdminAddCategory>
              </CategoryProvider>
            ),
          },
          {
            path: "categorys/update",
            element: (
              <CategoryProvider>
                <AdminUpdateCategory></AdminUpdateCategory>
              </CategoryProvider>
            ),
          },
        ],
      },
      //user options
      {
        path: "user",
        element: <PrivateRoute role={"user"}></PrivateRoute>,
        children: [
          //general
          {
            path: "",
            element: <UserHome></UserHome>,
          },
          {
            path: "profile",
            element: <UserProfile></UserProfile>,
          },
          // books
          {
            path: "books",
            element: (
              <BookProvider>
                <UserBooks></UserBooks>,
              </BookProvider>
            ),
          },
          {
            path: "books/add",
            element: (
              <BookProvider>
                <UserAddBooks></UserAddBooks>,
              </BookProvider>
            ),
          },
          {
            path: "books/update",
            element: (
              <BookProvider>
                <UserUpdateBooks></UserUpdateBooks>,
              </BookProvider>
            ),
          },
          {
            path: "books/details",
            element: (
              <BookProvider>
                <BookDetails></BookDetails>,
              </BookProvider>
            ),
          },
          // user purchase history
          {
            path: "purchase_history",
            element: <UserPurchase></UserPurchase>,
          },
          // store
          {
            path: "store",
            element: (
              <StoreProvider>
                <UserStore></UserStore>
              </StoreProvider>
            ),
          },
          {
            path: "store/details",
            element: (
              <StoreProvider>
                <UserStoreDetails></UserStoreDetails>
              </StoreProvider>
            ),
          },
          {
            path: "store/add",
            element: <UserAddStore></UserAddStore>,
          },
          {
            path: "store/update",
            element: (
              <StoreProvider>
                <UserUpdateStore></UserUpdateStore>
              </StoreProvider>
            ),
          },
          // store orders
          {
            path: "orders",
            element: (
              <OrderProvider>
                <UserStoreOrders></UserStoreOrders>
              </OrderProvider>
            ),
          },
          //settings
          {
            path: "settings",
            element: <UserSettings></UserSettings>,
          },
        ],
      },
    ],
  },
]);

export default router;
