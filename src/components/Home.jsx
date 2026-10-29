import Header from "./Header";
import Categories from "./Categories";
import Banner from "./Banner";
import ProductTitle from "./ProductTitle";
import Products from "./Products";
import Offers from "./Offers";
import Services from "./Services";
import Footer from "./Footer";

function Home() {
  return (
    <div className="container">

      <Header />

      <Categories />

      <Banner />

      <ProductTitle />

      <Products />

      <Offers />

      <Services />

      <Footer />

    </div>
  );
}

export default Home;