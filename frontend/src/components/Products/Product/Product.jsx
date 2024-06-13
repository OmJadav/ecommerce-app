import "./Product.scss";
import prod from "../../../assets/products/earbuds-prod-1.webp";
const Product = ({ product }) => {
  return (
    <div className="product-card">
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
