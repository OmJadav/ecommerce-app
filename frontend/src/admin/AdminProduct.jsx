import "../components/Products/Product/Product.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Rating } from "flowbite-react";
const AdminProduct = ({ id, product }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="product-card">
        <div onClick={() => navigate(`/product/${id}`)}>
          <div className="thumbnail">
            <div className="rating-overlay">
              <Rating>
                {[...Array(5)].map((_, index) => (
                  <Rating.Star key={index} filled={index < product.rating} />
                ))}
              </Rating>
            </div>
            <img src={`${product.thumbnail}`} alt="" />
          </div>
          <div className="prod-details">
            <span className="name">{product.title}</span>
            <span className="price">&#8377;{product.price}</span>
          </div>
        </div>
        <Link to={`/admin/update-product/${product._id}`}>
          <Button color="success" className="w-full p-0 mb-1 ">
            Edit Product
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AdminProduct;
