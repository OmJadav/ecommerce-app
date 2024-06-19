import "./Products.scss";
import Product from "./Product/Product";
const Products = ({ innerPage, headingText, products }) => {
  // console.log(products);
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {products && products.length > 0 ? (
          products?.map((product) => (
            <Product key={product?._id} id={product?._id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
