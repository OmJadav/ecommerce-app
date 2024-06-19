import "./SingleProduct.scss";
// import prod from "../../assets/products/earbuds-prod-2.webp";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useContext, useEffect, useState } from "react";
import { fetchDataApi } from "../../utils/api";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { Carousel } from "flowbite-react";
import { Context } from "../../utils/context";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const { data } = useFetch(`/api/products/product/${id}`);
  const { handleAddToCart } = useContext(Context);
  if (!data)
    return (
      // <h1 className="text-3xl text-center text-red-500">
      //   Something went wrong
      // </h1>
      null
    );

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
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(product, quantity);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <span className="text-bold">
                Category :{" "}
                <span className="capitalize">{product?.category?.name}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProducts data={data.relatedProducts} />
      </div>
    </div>
  );
};

export default SingleProduct;
