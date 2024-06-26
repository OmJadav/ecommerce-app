import { Navigate, useNavigate, useParams } from "react-router-dom";
import Products from "../Products/Products";
import "./Category.scss";
import { Dropdown } from "flowbite-react";
import useFetch from "../Hooks/useFetch";
import { Context } from "../../utils/context";
import { useContext, useState } from "react";
const Category = () => {
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
                    // onClick={() => Navigate(`/category/${category._id}`)}
                    onClick={() => {
                      navigate(`/category/${category._id}`);
                      setSelectCategory(category.name);
                    }}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
            </Dropdown>
          </div>
          <div className="sec-heading">{data?.category?.name}</div>
          {/* <div className="category-title">{data?.category?.name}</div> */}
          {products?.length === 0 ? (
            <h1 className="no-product text-center">No Product Available !!!</h1>
          ) : (
            <Products innerPage={true} products={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
