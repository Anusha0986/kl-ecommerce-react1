import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

function AllUsers() {

  const [users, setUsers] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");


  // Load users from Local Storage

  useEffect(() => {

    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    setUsers(storedUsers);

  }, []);


  // Delete user

  function handleDelete(index) {

    const confirmDelete =
      window.confirm("Do you want to delete this user?");

    if (!confirmDelete) {
      return;
    }

    const updatedUsers =
      users.filter((_, i) => i !== index);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);

    alert("User deleted successfully");
  }


  // Start editing

  function handleEdit(index) {

    setEditIndex(index);

    setEditUsername(users[index].username);
    setEditPassword(users[index].password);
  }


  // Save edited user

  function handleUpdate(e) {

    e.preventDefault();

    // Check duplicate username

    const duplicateUser = users.some(
      (user, index) =>
        index !== editIndex &&
        user.username === editUsername
    );

    if (duplicateUser) {

      alert("Username already exists");

      return;
    }


    // Do not allow admin email

    if (editUsername === "admin@gmail.com") {

      alert("This email is reserved for Admin");

      return;
    }


    const updatedUsers = [...users];

    updatedUsers[editIndex] = {

      username: editUsername,

      password: editPassword

    };


    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);

    setEditIndex(null);

    setEditUsername("");
    setEditPassword("");

    alert("User updated successfully");
  }


  // Cancel edit

  function handleCancel() {

    setEditIndex(null);

    setEditUsername("");
    setEditPassword("");
  }


  return (

    <div className="container">

      {/* HEADER */}

      <Header />

      {/* ADMIN CATEGORY MENU */}

      <Categories isAdmin={true} />

      {/* ALL USERS */}

      <section className="dashboard-section">

        <h2>ALL USERS</h2>


        {users.length === 0 ? (

          <p>
            No registered users found.
          </p>

        ) : (

          <div className="users-table">

            <table>

              <thead>

                <tr>

                  <th>S.No</th>

                  <th>Username</th>

                  <th>Password</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {users.map((user, index) => (

                  <tr key={index}>

                    {editIndex === index ? (

                      <>

                        <td>
                          {index + 1}
                        </td>

                        <td>

                          <input
                            type="text"
                            value={editUsername}
                            onChange={(e) =>
                              setEditUsername(e.target.value)
                            }
                          />

                        </td>

                        <td>

                          <input
                            type="text"
                            value={editPassword}
                            onChange={(e) =>
                              setEditPassword(e.target.value)
                            }
                          />

                        </td>

                        <td>

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

                        </td>

                      </>

                    ) : (

                      <>

                        <td>
                          {index + 1}
                        </td>

                        <td>
                          {user.username}
                        </td>

                        <td>
                          {user.password}
                        </td>

                        <td>

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

                        </td>

                      </>

                    )}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}


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

export default AllUsers;