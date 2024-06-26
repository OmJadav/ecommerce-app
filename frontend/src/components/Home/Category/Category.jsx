import "./Category.scss";
import cat from "../../../assets/category/cat-1.jpg";
import { useNavigate } from "react-router-dom";
const Category = ({ categories }) => {
  // console.log(categories);
  const navigate = useNavigate();
  return (
    <>
      <div className="shop-by-category">
        <div className="categories">
          {categories && categories.length > 0 ? (
            categories?.map((category) => (
              <div
                key={category?._id}
                className="category"
                onClick={() => navigate(`/category/${category._id}`)}
              >
                <img src={category.thumbnail} alt="" />
                {/* <img src={cat} alt="" /> */}
              </div>
            ))
          ) : (
            <p>No Categories available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
