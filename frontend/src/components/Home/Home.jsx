import { useContext, useEffect } from "react";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import "./Home.scss";
import { Context } from "../../utils/context";
const Home = () => {
  const { categories, products } = useContext(Context);

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products headingText="Popular Products" products={products} />
        </div>
      </div>
    </div>
  );
};
export default Home;
