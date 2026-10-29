import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function Cart() {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("currentUser");

    const cartKey = `cart_${username}`;

    const [cart, setCart] = useState([]);


    // Load cart

    useEffect(() => {

        if (!username) {
            return;
        }

        const storedCart =
            JSON.parse(localStorage.getItem(cartKey)) || [];

        setCart(storedCart);

    }, [username, cartKey]);


    // Increase quantity

    function increaseQuantity(id) {

        const updatedCart = cart.map((item) => {

            if (item.id === id) {

                return {
                    ...item,
                    quantity: item.quantity + 1
                };

            }

            return item;

        });

        setCart(updatedCart);

        localStorage.setItem(
            cartKey,
            JSON.stringify(updatedCart)
        );
    }


    // Decrease quantity

    function decreaseQuantity(id) {

        const updatedCart = cart
            .map((item) => {

                if (item.id === id) {

                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };

                }

                return item;

            })
            .filter((item) => item.quantity > 0);


        setCart(updatedCart);

        localStorage.setItem(
            cartKey,
            JSON.stringify(updatedCart)
        );
    }


    // Delete item

    function deleteItem(id) {

        const updatedCart =
            cart.filter((item) => item.id !== id);

        setCart(updatedCart);

        localStorage.setItem(
            cartKey,
            JSON.stringify(updatedCart)
        );
    }


    // Calculate total

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    // Place order

    function handlePlaceOrder() {

        if (cart.length === 0) {

            alert("Your cart is empty");

            return;
        }


        const allOrders =
            JSON.parse(localStorage.getItem("orders")) || [];


        const newOrder = {

            id: "ORD" + Date.now(),

            username: username,

            products: cart,

            total: total,

            date: new Date().toISOString().split("T")[0],

            status: "Placed"

        };


        allOrders.push(newOrder);


        localStorage.setItem(
            "orders",
            JSON.stringify(allOrders)
        );


        // Clear current user's cart

        localStorage.removeItem(cartKey);

        setCart([]);


        alert("Order placed successfully");

        navigate("/orders");
    }


    return (

        <div className="container">

            <Header />

            <Categories isAdmin={false} />


            <section className="dashboard-section">

                <h2>MY CART</h2>


                {cart.length === 0 ? (

                    <>

                        <p>
                            Your cart is empty.
                        </p>

                        <br />

                        <Link to="/products">
                            Continue Shopping
                        </Link>

                    </>

                ) : (

                    <>

                        <div className="cart-table">

                            <table>

                                <thead>

                                    <tr>

                                        <th>Product</th>

                                        <th>Price</th>

                                        <th>Quantity</th>

                                        <th>Total</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {cart.map((item) => (

                                        <tr key={item.id}>

                                            <td>

                                                <div className="cart-product">

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                    />

                                                    <span>
                                                        {item.name}
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                ₹{item.price}
                                            </td>

                                            <td>

                                                <button
                                                    className="quantity-button"
                                                    onClick={() =>
                                                        decreaseQuantity(item.id)
                                                    }
                                                >
                                                    -
                                                </button>

                                                {" "}

                                                {item.quantity}

                                                {" "}

                                                <button
                                                    className="quantity-button"
                                                    onClick={() =>
                                                        increaseQuantity(item.id)
                                                    }
                                                >
                                                    +
                                                </button>

                                            </td>

                                            <td>
                                                ₹{item.price * item.quantity}
                                            </td>

                                            <td>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        deleteItem(item.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>


                        <h2 className="cart-total">
                            Grand Total: ₹{total}
                        </h2>


                        <button
                            className="place-order-button"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>

                    </>

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

export default Cart;