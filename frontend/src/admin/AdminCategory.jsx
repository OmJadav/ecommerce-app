import { useNavigate } from "react-router-dom";
import "../components/Category/Category.scss";
const AdminCategory = ({ categories }) => {
  // console.log(categories);
  const navigate = useNavigate();

  return (
    <>
      <div className="shop-by-category">
        <div className="categories">
          {categories && categories.length > 0 ? (
            categories?.map((category) => (
              <div key={category?._id} className="category">
                <img
                  src={category.thumbnail}
                  alt=""
                  onClick={() =>
                    navigate(`/admin/admin-category/${category._id}`)
                  }
                />
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

export default AdminCategory;
