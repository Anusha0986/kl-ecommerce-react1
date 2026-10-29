function Products() {

  function handleAddToCart() {

    const loggedIn =
      localStorage.getItem("loggedIn") === "true";

    if (!loggedIn) {

      alert("Please login first");

      return;
    }

    alert("Please use the Products page to add items to cart");
  }


  return (
    <section className="products">

      {/* Product 1 */}

      <div className="product">

        <img
          src="/images/shirt.jpg"
          alt="Men's Shirt"
        />

        <h3>Men's Shirt</h3>

        <h2>₹999</h2>

        <input
          type="button"
          value="Add to Cart"
          onClick={handleAddToCart}
        />

      </div>


      {/* Product 2 */}

      <div className="product">

        <img
          src="/images/rice.jpg"
          alt="Rice Bag"
        />

        <h3>Rice Bag</h3>

        <h2>₹1200</h2>

        <input
          type="button"
          value="Add to Cart"
          onClick={handleAddToCart}
        />

      </div>


      {/* Product 3 */}

      <div className="product">

        <img
          src="/images/mobile.jpg"
          alt="Smart Phone"
        />

        <h3>Smart Phone</h3>

        <h2>₹15000</h2>

        <input
          type="button"
          value="Add to Cart"
          onClick={handleAddToCart}
        />

      </div>


      {/* Product 4 */}

      <div className="product">

        <img
          src="/images/washing.jpg"
          alt="Washing Machine"
        />

        <h3>Washing Machine</h3>

        <h2>₹22000</h2>

        <input
          type="button"
          value="Add to Cart"
          onClick={handleAddToCart}
        />

      </div>


      {/* Product 5 */}

      <div className="product">

        <img
          src="/images/shirt.jpg"
          alt="Men's Shirt"
        />

        <h3>Men's Shirt</h3>

        <h2>₹999</h2>

        <input
          type="button"
          value="Add to Cart"
          onClick={handleAddToCart}
        />

      </div>


      {/* Product 6 */}

      <div className="product">

        <img
          src="/images/rice.jpg"
          alt="Rice Bag"
        />

        <h3>Rice Bag</h3>

        <h2>₹1200</h2>

        <input
          type="button"
          value="Add to Cart"
          onClick={handleAddToCart}
        />

      </div>


      {/* Product 7 */}

      <div className="product">

        <img
          src="/images/mobile.jpg"
          alt="Smart Phone"
        />

        <h3>Smart Phone</h3>

        <h2>₹15000</h2>

        <input
          type="button"
          value="Add to Cart"
          onClick={handleAddToCart}
        />

      </div>


      {/* Product 8 */}

      <div className="product">

        <img
          src="/images/washing.jpg"
          alt="Washing Machine"
        />

        <h3>Washing Machine</h3>

        <h2>₹22000</h2>

        <input
          type="button"
          value="Add to Cart"
          onClick={handleAddToCart}
        />

      </div>

    </section>
  );
}

export default Products;