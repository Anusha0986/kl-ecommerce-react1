import { Link, useNavigate } from "react-router-dom";

function Categories() {

    const navigate = useNavigate();

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


    function handleCategoryClick(category) {

        const loggedIn =
            localStorage.getItem("loggedIn") === "true";

        const loginType =
            localStorage.getItem("loginType");


        // Before Login

        if (!loggedIn) {

            alert("Please login first");

            navigate("/login");

            return;
        }


        // Admin Login

        if (loginType === "admin") {

            navigate(
                `/admin/products?category=${category}`
            );

            return;
        }


        // User Login

        if (loginType === "user") {

            navigate(
                `/products?category=${category}`
            );

            return;
        }


        // If login information is invalid

        alert("Please login first");

        navigate("/login");
    }


    return (
        <nav className="categories">

            {categories.map((category) => (

                <div key={category}>

                    <Link
                        className="category-link"
                        to="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleCategoryClick(category);
                        }}
                    >
                        {category}
                    </Link>

                </div>

            ))}

        </nav>
    );
}

export default Categories;