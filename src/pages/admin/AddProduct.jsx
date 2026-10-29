import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function AddProduct() {

    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Fashion");
    const [image, setImage] = useState("");

    const categories = [
        "Fashion",
        "Groceries",
        "Electronics",
        "Mobiles",
        "Appliances",
        "Beauty",
        "Books",
        "Sports"
    ];


    function handleAddProduct(e) {

        e.preventDefault();

        const products =
            JSON.parse(localStorage.getItem("products")) || [];


        const newProduct = {

            id: Date.now(),

            name: productName,

            price: Number(price),

            category: category,

            image: image
        };


        products.push(newProduct);


        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        alert("Product added successfully");


        setProductName("");
        setPrice("");
        setCategory("Fashion");
        setImage("");


        navigate("/admin/products");
    }


    return (

        <div className="container">

            {/* HEADER */}

            <Header />


            {/* CATEGORY MENU */}

            <Categories isAdmin={true} />


            {/* ADD PRODUCT */}

            <section className="dashboard-section">

                <div className="admin-form">

                    <h2>ADD ITEMS</h2>

                    <form onSubmit={handleAddProduct}>

                        {/* PRODUCT NAME */}

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={productName}
                            onChange={(e) =>
                                setProductName(e.target.value)
                            }
                            required
                        />


                        {/* PRICE */}

                        <label>
                            Price
                        </label>

                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            min="1"
                            required
                        />


                        {/* CATEGORY */}

                        <label>
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            {categories.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>


                        {/* IMAGE PATH */}

                        <label>
                            Image Path
                        </label>

                        <input
                            type="text"
                            placeholder="/images/shirt.jpg"
                            value={image}
                            onChange={(e) =>
                                setImage(e.target.value)
                            }
                            required
                        />


                        {/* IMAGE PREVIEW */}

                        {image && (

                            <div className="image-preview">

                                <img
                                    src={image}
                                    alt="Product Preview"
                                />

                            </div>

                        )}


                        {/* ADD BUTTON */}

                        <button type="submit">
                            Add Product
                        </button>

                    </form>


                    {/* BACK TO ADMIN DASHBOARD */}

                    <p className="back-dashboard">

                        <a
                            href="/admin/dashboard"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/admin/dashboard");
                            }}
                        >
                            Back to Admin Dashboard
                        </a>

                    </p>

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

export default AddProduct;