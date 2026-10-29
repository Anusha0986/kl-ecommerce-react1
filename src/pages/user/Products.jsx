import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function Products() {

    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");


    // Load products

    useEffect(() => {

        const storedProducts =
            JSON.parse(localStorage.getItem("products")) || [];

        setProducts(storedProducts);

    }, []);


    // Filter products by category

    const filteredProducts = category
        ? products.filter(
            (product) => product.category === category
        )
        : products;


    // Add product to cart

    function handleAddToCart(product) {

        const username =
            localStorage.getItem("currentUser");

        if (!username) {

            alert("Please login first");

            return;
        }


        // Each user gets a separate cart

        const cartKey = `cart_${username}`;

        const cart =
            JSON.parse(localStorage.getItem(cartKey)) || [];


        // Check whether product already exists

        const existingProduct = cart.find(
            (item) => item.id === product.id
        );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });

        }


        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );


        alert("Product added to cart");
    }


    return (

        <div className="container">

            <Header />

            <Categories isAdmin={false} />


            <section className="dashboard-section">

                <h2>PRODUCTS</h2>


                {category ? (

                    <h3>
                        Category: {category}
                    </h3>

                ) : (

                    <h3>
                        All Products
                    </h3>

                )}


                <div className="user-products">

                    {filteredProducts.length === 0 ? (

                        <p>
                            No products found.
                        </p>

                    ) : (

                        filteredProducts.map((product) => (

                            <div
                                className="user-product-card"
                                key={product.id}
                            >

                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                                <h3>
                                    {product.name}
                                </h3>

                                <h2>
                                    ₹{product.price}
                                </h2>

                                <p>
                                    {product.category}
                                </p>

                                <button
                                    className="add-cart-button"
                                    onClick={() =>
                                        handleAddToCart(product)
                                    }
                                >
                                    Add to Cart
                                </button>

                            </div>

                        ))

                    )}

                </div>


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

export default Products;