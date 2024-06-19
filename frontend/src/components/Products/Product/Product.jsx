import "./Product.scss";
import prod from "../../../assets/products/earbuds-prod-1.webp";
import { useNavigate } from "react-router-dom";
const Product = ({ id, product }) => {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <div className="thumbnail">
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
