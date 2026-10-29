import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function UserProfile() {

    const username =
        localStorage.getItem("currentUser");

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        (item) => item.username === username
    );

    return (

        <div className="container">

            <Header />

            <Categories isAdmin={false} />

            <section className="dashboard-section">

                <h2>MY PROFILE</h2>

                {user ? (

                    <div className="profile-box">

                        <p>
                            <b>Name:</b> {user.name}
                        </p>

                        <p>
                            <b>Email:</b> {user.email}
                        </p>

                        <p>
                            <b>Mobile:</b> {user.mobile}
                        </p>

                        <p>
                            <b>Username:</b> {user.username}
                        </p>

                    </div>

                ) : (

                    <p>
                        User details not found.
                    </p>

                )}

                <p className="back-dashboard">

                    <Link to="/user/dashboard">
                        Back to User Dashboard
                    </Link>

                </p>

            </section>

            <Offers />

            <Services />

            <Footer />

        </div>
    );
}

export default UserProfile;