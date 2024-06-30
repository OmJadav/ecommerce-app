import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backendUrl from "../../utils/backendUrl";
import axios from "axios";
import { Context } from "../../utils/context";

export const OrderSuccessPage = () => {
  const { cartItems, setCartItems } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      handleOrder(sessionId);
    }
    if (
      location.pathname === "/order-confirm" ||
      location.pathname.startsWith("/order-confirm") ||
      location.pathname.startsWith("/order-confirm?")
    ) {
      setCartItems([]);
    }
  }, [location]);

  const handleOrder = async (sessionId) => {
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/new-order`,
        orderData,
        {
          withCredentials: true,
        }
      );
      toast.success("Order placed successfully");
      localStorage.removeItem("orderData");
      localStorage.setItem("currentOrder", JSON.stringify(response.data));
      // navigate("/my-orders");
    } catch (error) {
      console.error("ERROR in sending data API: " + error.message);
      toast.error("Failed to place order");
    }
  };
  const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));

  const formatDateToLocal = (utcDateString) => {
    const date = new Date(utcDateString);
    return date.toLocaleString();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("currentOrder");
      // navigate("/my-orders");
    }, 20000);

    return () => {
      clearTimeout(timer);
      localStorage.removeItem("currentOrder");
    };
  }, [location]);

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Thanks for your order!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            Your order{" "}
            {currentOrder && (
              <a
                href="#"
                className="font-medium text-gray-900 dark:text-white hover:underline"
              >
                #{currentOrder?.order?._id}
              </a>
            )}
            will be processed within 24 hours during working days. We will
            notify you by email once your order has been confirmed.
          </p>
          {currentOrder && (
            <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Order Date & Time
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {formatDateToLocal(currentOrder?.order?.createdAt)}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Payment Method
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {currentOrder?.order?.paymentMethod}
                </dd>
              </dl>

              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Address
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {currentOrder?.order?.selectedAddress.city} ,
                  {currentOrder?.order?.selectedAddress.state}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Phone
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  +91 {currentOrder?.order?.selectedAddress.phone}
                </dd>
              </dl>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <Link to={"/my-orders"}>
              <div className="text-white bg-purple-500 hover:bg-purple-800  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 ">
                Track your order
              </div>
            </Link>
            <Link to={"/"}>
              <div className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Return to shopping
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
