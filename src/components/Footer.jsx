import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <h2>KLECommerce</h2>


      

      <p>

        <Link to="/">Home</Link>

        {" | "}

        <Link to="/products">Products</Link>

        {" | "}

        <Link to="/login">Login</Link>

        {" | "}

        <Link to="/signup">Register</Link>

        {" | "}

        <Link to="/admin/login">Admin</Link>

      </p>

      <p>
        Copyright © 2026 KLECommerce
      </p>

    </footer>
  );
}

export default Footer;