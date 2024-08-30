import "./SingleProduct.scss";
import { FaCartPlus } from "react-icons/fa";
import { Rating } from "flowbite-react";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { Carousel } from "flowbite-react";
import { Context } from "../../utils/context";
import Loader from "../Loader/Loader";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  const userId = userInfo?._id;
  const { id } = useParams();
  const { data } = useFetch(`/api/products/product/${id}`);
  const { handleAddToCart } = useContext(Context);
  if (!data) {
    return <Loader />;
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      else return prevState - 1;
    });
  };
  const product = data?.product;
  const { thumbnail, images } = product;
  const carouselImages = [thumbnail, ...images];
  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            {/* <img src={product?.thumbnail} alt="" /> */}
            <div className="h-64 sm:h-full xl:h-full 2xl:h-full ">
              <Carousel>
                {carouselImages.map((image, index) => (
                  <img key={index} src={image} alt={`Slide ${index + 1}`} />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="right">
            <span className="name">{product?.title}</span>
            <span className="price">&#8377; {product?.price}</span>
            <span className="desc">{product?.description}</span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrementQuantity}>-</span>
                <span>{quantity}</span>
                <span onClick={incrementQuantity}>+</span>
              </div>
              {userId && product.stock > 0 ? (
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product, quantity)}
                >
                  <FaCartPlus size={20} />
                  ADD TO CART
                </button>
              ) : (
                <button className="add-to-cart-button" disabled={true}>
                  {product.stock > 0
                    ? "Please Login to add in cart"
                    : "OUT OF STOCK"}
                </button>
              )}
            </div>

            <span className="divider" />

            <div className="info-item">
              <div className="text-bold">
                Category:{" "}
                <span className="capitalize">{product?.category?.name}</span>
              </div>
              <div className="reviews mb-5">
                {product?.rating > 0 ? (
                  <Rating>
                    {[...Array(5)].map((_, index) => (
                      <Rating.Star
                        key={index}
                        filled={index < product.rating}
                      />
                    ))}
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      ({product?.rating})
                    </p>
                  </Rating>
                ) : (
                  <span>No reviews yet.</span>
                )}
              </div>
              <div className="text-bold">
                Stock :
                <span
                  className={`stock ${
                    product.stock > 0
                      ? "in-stock bg-green-200 text-green-800"
                      : "out-of-stock bg-red-200 text-red-800"
                  } p-1 rounded-lg ml-1 font-bold`}
                >
                  {" "}
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts data={data.relatedProducts} />
      </div>
    </div>
  );
};

export default SingleProduct;
