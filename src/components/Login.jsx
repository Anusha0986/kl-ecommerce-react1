import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "./Header";
import Categories from "./Categories";
import Offers from "./Offers";
import Services from "./Services";
import Footer from "./Footer";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {

        e.preventDefault();

        /* =========================
           ADMIN LOGIN
        ========================= */

        if (
            username === "admin@gmail.com" &&
            password === "admin"
        ) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("loginType", "admin");
            localStorage.setItem(
                "currentUser",
                "admin@gmail.com"
            );

            alert("Admin login successful");

            navigate("/admin/dashboard");

            return;
        }


        /* =========================
           USER LOGIN - NEW USERS
        ========================= */

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (item) =>
                item.username === username &&
                item.password === password
        );

        if (user) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("loginType", "user");
            localStorage.setItem(
                "currentUser",
                user.username
            );

            alert("User login successful");

            navigate("/user/dashboard");

            return;
        }


        /* =========================
           USER LOGIN - OLD
           LOCAL STORAGE DATA
        ========================= */

        const storedUsername =
            localStorage.getItem("username");

        const storedPassword =
            localStorage.getItem("password");

        const storedEmail =
            localStorage.getItem("email");


        if (
            (username === storedUsername ||
             username === storedEmail) &&
            password === storedPassword
        ) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("loginType", "user");
            localStorage.setItem(
                "currentUser",
                username
            );

            alert("User login successful");

            navigate("/user/dashboard");

            return;
        }


        /* =========================
           INVALID LOGIN
        ========================= */

        alert("Invalid username/email or password");
    }


    return (
        <div className="container">

            <Header />

            <Categories />

            <section className="auth-section">

                <div className="auth-box">

                    <h2>LOGIN</h2>

                    <form onSubmit={handleLogin}>

                        <label>
                            Username / Email
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username or email"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button type="submit">
                            Login
                        </button>

                    </form>

                    <p>
                        Don't have an account?{" "}
                        <Link to="/signup">
                            Register
                        </Link>
                    </p>

                </div>

            </section>

            <Offers />

            <Services />

            <Footer />

        </div>
    );
}

export default Login;