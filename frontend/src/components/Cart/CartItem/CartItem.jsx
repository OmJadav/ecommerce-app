import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import prod from "../../../assets/products/earbuds-prod-5.webp";
import { useContext } from "react";
import { Context } from "../../../utils/context";
const CartItem = () => {
  const { cartItems, handleCartProductQuantity, handleRemoveFromCart } =
    useContext(Context);
  // console.log(cartItems);
  return (
    <div className="cart-products">
      {cartItems &&
        cartItems?.map((item) => (
          <div key={item?._id} className="cart-product">
            <div className="img-container">
              {/* <img src={item?.product?.thumbnail || item?.thumbnail} alt="" /> */}
              <img src={item?.product?.thumbnail} alt="" />
            </div>
            <div className="prod-details">
              <span className="name">
                {/* {item?.product?.title || item?.title} */}
                {item?.product?.title}
              </span>
              <MdClose
                className="close-btn"
                // onClick={() => handleRemoveFromCart(item || item?.product)}
                onClick={() => handleRemoveFromCart(item?.product)}
              />
              <div className="quantity-buttons">
                <span
                  onClick={
                    () => handleCartProductQuantity("dec", item)
                    // handleCartProductQuantity("dec", item?.product)
                  }
                >
                  -
                </span>
                <span>{item.quantity}</span>
                <span
                  onClick={
                    () => handleCartProductQuantity("inc", item)
                    // handleCartProductQuantity("inc", item?.product)
                  }
                >
                  +
                </span>
              </div>
              <div className="text">
                <span>{item?.quantity}</span>
                <span>x</span>
                <span className="highlight">
                  {/* &#8377; {item?.product?.price || item?.price}{" "} */}
                  &#8377; {item?.product?.price}{" "}
                </span>
                <span> = </span>
                <span className="text-green-700">
                  {/* &#8377; {item?.product?.price || item?.price * item?.quantity} */}
                  &#8377; {item?.product?.price * item?.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CartItem;
