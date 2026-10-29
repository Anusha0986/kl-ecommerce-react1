import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function Orders() {

    const username =
        localStorage.getItem("currentUser");

    const [orders, setOrders] = useState([]);


    // Load user orders

    useEffect(() => {

        const allOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        const userOrders = allOrders.filter(
            (order) =>
                order.username === username
        );

        setOrders(userOrders);

    }, [username]);


    return (

        <div className="container">

            <Header />

            <Categories isAdmin={false} />


            <section className="dashboard-section">

                <h2>MY ORDERS</h2>


                {orders.length === 0 ? (

                    <p>
                        No orders found.
                    </p>

                ) : (

                    <div className="user-orders">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.id}
                            >

                                <h3>
                                    Order ID: {order.id}
                                </h3>

                                <p>
                                    Date: {order.date}
                                </p>

                                <p>
                                    Status: {order.status}
                                </p>


                                <div className="order-products">

                                    {order.products.map(
                                        (product, index) => (

                                            <p key={index}>

                                                {product.name}

                                                {" × "}

                                                {product.quantity}

                                                {" - ₹"}

                                                {
                                                    product.price *
                                                    product.quantity
                                                }

                                            </p>

                                        )
                                    )}

                                </div>


                                <h3>
                                    Total: ₹{order.total}
                                </h3>

                            </div>

                        ))}

                    </div>

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

export default Orders;