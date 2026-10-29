import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function UserDashboard() {

    const username =
        localStorage.getItem("currentUser");

    return (

        <div className="container">

            {/* HEADER */}

            <Header />

            {/* USER CATEGORY MENU */}

            <Categories isAdmin={false} />

            {/* USER DASHBOARD */}

            <section className="dashboard-section">

                <h2>USER DASHBOARD</h2>

                <h3>
                    Welcome, {username}
                </h3>

                <div className="dashboard-menu">

                    <Link to="/user/profile">
                        My Profile
                    </Link>

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/cart">
                        My Cart
                    </Link>

                    <Link to="/orders">
                        My Orders
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

export default UserDashboard;