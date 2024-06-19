import { useContext, useEffect } from "react";
import "../components/Home/Home.scss";
import AdminProducts from "./AdminProducts";
import { Context } from "../utils/context";
import AdminCategory from "./AdminCategory";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
const AdminHome = () => {
  const { categories, products } = useContext(Context);

  return (
    <div>
      <div className="main-content">
        <div className="layout">
          <AdminCategory categories={categories} />
          <Link to={"/admin/add-new"} className="inline-block">
            <Button color="purple"> + Add New Product</Button>
          </Link>
          <AdminProducts headingText="Popular Products" products={products} />
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
