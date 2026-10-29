import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function AllOrders() {

  const [orders, setOrders] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const [editUsername, setEditUsername] = useState("");
  const [editTotal, setEditTotal] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editStatus, setEditStatus] = useState("Placed");


  // Load orders from Local Storage

  useEffect(() => {

    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(storedOrders);

  }, []);


  // Start Edit

  function handleEdit(index) {

    setEditIndex(index);

    setEditUsername(orders[index].username || "");
    setEditTotal(orders[index].total || "");
    setEditDate(orders[index].date || "");
    setEditStatus(orders[index].status || "Placed");
  }


  // Save Update

  function handleUpdate(e) {

    e.preventDefault();

    const updatedOrders = [...orders];

    updatedOrders[editIndex] = {
      ...updatedOrders[editIndex],

      username: editUsername,

      total: Number(editTotal),

      date: editDate,

      status: editStatus
    };


    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setOrders(updatedOrders);

    setEditIndex(null);

    setEditUsername("");
    setEditTotal("");
    setEditDate("");
    setEditStatus("Placed");

    alert("Order updated successfully");
  }


  // Cancel Edit

  function handleCancel() {

    setEditIndex(null);

    setEditUsername("");
    setEditTotal("");
    setEditDate("");
    setEditStatus("Placed");
  }


  // Delete Order

  function handleDelete(index) {

    const confirmDelete =
      window.confirm("Do you want to delete this order?");

    if (!confirmDelete) {
      return;
    }

    const updatedOrders =
      orders.filter((_, i) => i !== index);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setOrders(updatedOrders);

    alert("Order deleted successfully");
  }


  return (

    <div className="container">

      {/* HEADER */}

      <Header />


      {/* ADMIN CATEGORY MENU */}

      <Categories isAdmin={true} />


      {/* ALL ORDERS */}

      <section className="dashboard-section">

        <h2>ALL ORDERS</h2>


        {orders.length === 0 ? (

          <p>
            No orders found.
          </p>

        ) : (

          <div className="orders-table">

            <table>

              <thead>

                <tr>

                  <th>S.No</th>

                  <th>Order ID</th>

                  <th>User</th>

                  <th>Products</th>

                  <th>Total</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {orders.map((order, index) => (

                  <tr key={order.id || index}>

                    <td>
                      {index + 1}
                    </td>


                    <td>
                      {order.id}
                    </td>


                    {/* USER */}

                    <td>

                      {editIndex === index ? (

                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) =>
                            setEditUsername(e.target.value)
                          }
                        />

                      ) : (

                        order.username

                      )}

                    </td>


                    {/* PRODUCTS */}

                    <td>

                      {order.products &&
                      order.products.length > 0 ? (

                        order.products.map(
                          (product, productIndex) => (

                            <div key={productIndex}>

                              {product.name}

                              {" × "}

                              {product.quantity || 1}

                            </div>

                          )
                        )

                      ) : (

                        "No products"

                      )}

                    </td>


                    {/* TOTAL */}

                    <td>

                      {editIndex === index ? (

                        <input
                          type="number"
                          value={editTotal}
                          onChange={(e) =>
                            setEditTotal(e.target.value)
                          }
                        />

                      ) : (

                        `₹${order.total}`

                      )}

                    </td>


                    {/* DATE */}

                    <td>

                      {editIndex === index ? (

                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) =>
                            setEditDate(e.target.value)
                          }
                        />

                      ) : (

                        order.date

                      )}

                    </td>


                    {/* STATUS */}

                    <td>

                      {editIndex === index ? (

                        <select
                          value={editStatus}
                          onChange={(e) =>
                            setEditStatus(e.target.value)
                          }
                        >

                          <option value="Placed">
                            Placed
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      ) : (

                        order.status || "Placed"

                      )}

                    </td>


                    {/* ACTIONS */}

                    <td>

                      {editIndex === index ? (

                        <>

                          <button
                            className="save-button"
                            onClick={handleUpdate}
                          >
                            Save
                          </button>

                          <button
                            className="cancel-button"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>

                        </>

                      ) : (

                        <>

                          <button
                            className="edit-button"
                            onClick={() =>
                              handleEdit(index)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(index)
                            }
                          >
                            Delete
                          </button>

                        </>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}


        {/* BACK TO ADMIN DASHBOARD */}

        <div className="back-dashboard">

          <Link to="/admin/dashboard">
            Back to Admin Dashboard
          </Link>

        </div>

      </section>


      <Offers />

      <Services />

      <Footer />

    </div>
  );
}

export default AllOrders;