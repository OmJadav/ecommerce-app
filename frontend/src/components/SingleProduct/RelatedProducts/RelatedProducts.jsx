import Products from "../../Products/Products";
const RelatedProducts = ({ data }) => {
  return (
    <div className="related-products">
      <Products headingText={"Related Products"} products={data} />
    </div>
  );
};

export default RelatedProducts;
