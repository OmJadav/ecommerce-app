import Product from "../components/Products/Product/Product";
import "../components/Products/Products.scss";
import AdminProduct from "./AdminProduct";
const AdminProducts = ({ innerPage, headingText, products }) => {
  // console.log(products);
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {products && products.length > 0 ? (
          products?.map((product) => (
            <AdminProduct
              key={product?._id}
              id={product?._id}
              product={product}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
