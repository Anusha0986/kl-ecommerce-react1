import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "./Header";
import Categories from "./Categories";
import Offers from "./Offers";
import Services from "./Services";
import Footer from "./Footer";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    function handleSignup(e) {

        e.preventDefault();


        /* ADMIN EMAIL */

        if (email === "admin@gmail.com") {

            alert("This email is reserved for Admin");

            return;
        }


        /* GET EXISTING USERS */

        const users =
            JSON.parse(localStorage.getItem("users")) || [];


        /* CHECK USER EXISTS */

        const userExists = users.some(
            (user) => user.username === email
        );


        if (userExists) {

            alert("User already exists");

            return;
        }


        /* CREATE USER */

        const newUser = {

            name: name,

            username: email,

            email: email,

            mobile: mobile,

            password: password

        };


        /* ADD USER */

        users.push(newUser);


        /* SAVE USERS */

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        alert("Registration successful");


        navigate("/login");
    }


    return (
        <div className="container">

            <Header />

            <Categories />

            <section className="auth-section">

                <div className="auth-box">

                    <h2>REGISTER</h2>

                    <form onSubmit={handleSignup}>

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />


                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />


                        <label>
                            Mobile
                        </label>

                        <input
                            type="text"
                            placeholder="Enter mobile number"
                            value={mobile}
                            onChange={(e) =>
                                setMobile(e.target.value)
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
                            Register
                        </button>

                    </form>


                    <p>
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
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

export default Signup;