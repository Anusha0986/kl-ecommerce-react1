import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function AdminDashboard() {

  return (
    <div className="container">

      {/* HEADER */}

      <Header />

      {/* ADMIN CATEGORY MENU */}

      <Categories isAdmin={true} />

      {/* ADMIN DASHBOARD */}

      <section className="dashboard-section">

        <h2>ADMIN DASHBOARD</h2>

        <div className="dashboard-menu">

          <Link to="/admin/add-product">
            Add Items
          </Link>

          <Link to="/admin/products">
            All Products
          </Link>

          <Link to="/admin/users">
            All Users
          </Link>

          <Link to="/admin/orders">
            All Orders
          </Link>

        </div>

      </section>

      {/* OFFERS */}

      <Offers />

      {/* SERVICES */}

      <Services />

      {/* FOOTER */}

      <Footer />

    </div>
  );
}

export default AdminDashboard;