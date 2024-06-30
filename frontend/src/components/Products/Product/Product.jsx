import "./Product.scss";
import prod from "../../../assets/products/earbuds-prod-1.webp";
import { Rating } from "flowbite-react";
import { useNavigate } from "react-router-dom";
const Product = ({ id, product }) => {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
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
  );
};

export default Product;
