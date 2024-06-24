import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import { Context } from "../../utils/context";
import { Link } from "react-router-dom";
const Cart = ({ setShowCart }) => {
  const { cartItems, cartSubTotal } = useContext(Context);
  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>
        {cartItems?.length === 0 ? (
          <div className="empty-cart">
            <BsCartX />
            <span>Your Cart is Empty</span>
            <button className="return-cta" onClick={() => setShowCart(false)}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal : </span>
                <span className="text total">&#8377; {cartSubTotal} </span>
              </div>
              <div className="button">
                <Link to={"/checkout"}>
                  <button
                    className="checkout-cta"
                    onClick={() => setShowCart(false)}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
