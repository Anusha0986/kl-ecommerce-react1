import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  function handleLogout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loginType");
    localStorage.removeItem("currentUser");

    setLoggedIn(false);

    navigate("/");
  }

  return (
    <header className="header">

      {/* LOGO */}

      <div className="logo">

        <img
          src="/images/logo.png"
          alt="KLECommerce Logo"
        />

      </div>


      {/* SEARCH */}

      <div className="search">

        <input
          type="text"
          placeholder="Search Products"
        />

        <input
          type="submit"
          value="Search"
        />

      </div>


      {/* ACCOUNT */}

      <div className="account">

        {!loggedIn ? (

          <>
            <Link to="/login">
              Login
            </Link>

            {" | "}

            <Link to="/signup">
              Register
            </Link>
          </>

        ) : (

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        )}

      </div>

    </header>
  );
}

export default Header;