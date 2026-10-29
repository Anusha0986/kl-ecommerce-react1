import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

// User
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";
import Orders from "./pages/user/Orders";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import ManageProducts from "./pages/admin/ManageProducts";
import AllUsers from "./pages/admin/AllUsers";
import AllOrders from "./pages/admin/AllOrders";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* COMMON */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />


                {/* USER */}

                <Route
                    path="/user/dashboard"
                    element={<UserDashboard />}
                />

                <Route
                    path="/user/profile"
                    element={<UserProfile />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />


                {/* ADMIN */}

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/add-product"
                    element={<AddProduct />}
                />

                <Route
                    path="/admin/products"
                    element={<ManageProducts />}
                />

                <Route
                    path="/admin/users"
                    element={<AllUsers />}
                />

                <Route
                    path="/admin/orders"
                    element={<AllOrders />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;