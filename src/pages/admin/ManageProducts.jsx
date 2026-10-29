import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function ManageProducts() {

  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  // Edit states
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("Fashion");
  const [editImage, setEditImage] = useState("");

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


  // Load products from Local Storage

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


  // Edit product

  function handleEdit(product) {

    setEditId(product.id);

    setEditName(product.name);
    setEditPrice(product.price);
    setEditCategory(product.category);
    setEditImage(product.image);
  }


  // Save edited product

  function handleUpdate(e) {

    e.preventDefault();

    const updatedProducts = products.map((product) => {

      if (product.id === editId) {

        return {
          ...product,
          name: editName,
          price: Number(editPrice),
          category: editCategory,
          image: editImage
        };

      }

      return product;

    });


    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    setProducts(updatedProducts);

    setEditId(null);

    setEditName("");
    setEditPrice("");
    setEditCategory("Fashion");
    setEditImage("");

    alert("Product updated successfully");
  }


  // Cancel edit

  function handleCancel() {

    setEditId(null);

    setEditName("");
    setEditPrice("");
    setEditCategory("Fashion");
    setEditImage("");
  }


  // Delete product

  function handleDelete(id) {

    const confirmDelete =
      window.confirm("Do you want to delete this product?");

    if (!confirmDelete) {
      return;
    }


    const updatedProducts =
      products.filter((product) => product.id !== id);


    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    setProducts(updatedProducts);

    alert("Product deleted successfully");
  }


  return (

    <div className="container">

      {/* HEADER */}

      <Header />


      {/* ADMIN CATEGORY MENU */}

      <Categories isAdmin={true} />


      {/* ALL PRODUCTS */}

      <section className="dashboard-section">

        <h2>ALL PRODUCTS</h2>


        {category ? (

          <h3>
            Category: {category}
          </h3>

        ) : (

          <h3>
            All Categories
          </h3>

        )}


        <div className="admin-products">

          {filteredProducts.length === 0 ? (

            <p>
              No products found.
            </p>

          ) : (

            filteredProducts.map((product) => (

              <div
                className="admin-product-card"
                key={product.id}
              >

                {editId === product.id ? (

                  /* =========================
                     EDIT PRODUCT
                  ========================= */

                  <div className="product-edit-form">

                    <h3>Edit Product</h3>


                    {/* NAME */}

                    <label>
                      Product Name
                    </label>

                    <input
                      type="text"
                      value={editName}
                      onChange={(e) =>
                        setEditName(e.target.value)
                      }
                    />


                    {/* PRICE */}

                    <label>
                      Price
                    </label>

                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) =>
                        setEditPrice(e.target.value)
                      }
                    />


                    {/* CATEGORY */}

                    <label>
                      Category
                    </label>

                    <select
                      value={editCategory}
                      onChange={(e) =>
                        setEditCategory(e.target.value)
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
                      value={editImage}
                      onChange={(e) =>
                        setEditImage(e.target.value)
                      }
                    />


                    {/* PREVIEW */}

                    {editImage && (

                      <div className="image-preview">

                        <img
                          src={editImage}
                          alt="Preview"
                        />

                      </div>

                    )}


                    {/* SAVE */}

                    <button
                      className="save-button"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>


                    {/* CANCEL */}

                    <button
                      className="cancel-button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>

                  </div>

                ) : (

                  /* =========================
                     DISPLAY PRODUCT
                  ========================= */

                  <>

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      ₹{product.price}
                    </p>

                    <p>
                      {product.category}
                    </p>


                    {/* EDIT */}

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(product)
                      }
                    >
                      Edit
                    </button>


                    {/* DELETE */}

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      Delete
                    </button>

                  </>

                )}

              </div>

            ))

          )}

        </div>


        {/* BACK TO DASHBOARD */}

        <p className="back-dashboard">

          <Link to="/admin/dashboard">
            Back to Admin Dashboard
          </Link>

        </p>

      </section>


      <Offers />

      <Services />

      <Footer />

    </div>
  );
}

export default ManageProducts;