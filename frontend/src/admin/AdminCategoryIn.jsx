import { useNavigate, useParams } from "react-router-dom";
import "../components/Category/Category.scss";
import { Dropdown } from "flowbite-react";
import { useContext, useState } from "react";
import useFetch from "../components/Hooks/useFetch";
import { Context } from "../utils/context";
import AdminProducts from "./AdminProducts";
const AdminCategoryIn = () => {
  const { id } = useParams();
  const { data } = useFetch(`/api/categories/categoryproducts/${id}`);
  // console.log(data);
  const products = data?.category?.products;
  const { categories } = useContext(Context);
  const navigate = useNavigate();
  const [selectCategory, setSelectCategory] = useState();
  return (
    <>
      <div className="category-main-content">
        <div className="layout">
          <div className="mb-5 -mt-10">
            <Dropdown
              label={selectCategory ? selectCategory : "Category"}
              dismissOnClick={false}
            >
              {categories &&
                categories.map((category) => (
                  <Dropdown.Item
                    key={category._id}
                    onClick={() => {
                      navigate(`/admin/admin-category/${category._id}`);
                      setSelectCategory(category.name);
                    }}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
            </Dropdown>
          </div>
          <div className="category-title">{data?.category?.title}</div>
          {products?.length === 0 ? (
            <h1 className="no-product text-center">No Product Available !!!</h1>
          ) : (
            <AdminProducts innerPage={true} products={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCategoryIn;
