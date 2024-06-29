import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import backendUrl from "../../utils/backendUrl";
import { Context } from "../../utils/context";
import toast from "react-hot-toast";

export const UserOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { userData } = useContext(Context);
  const userId = userData?._id;
  useEffect(() => {
    const getOrders = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${backendUrl}/api/orders/fetch-user-order/${userId}`,
            { withCredentials: true }
          );
          //   console.log(response.data.userOrder);
          setUserOrders(response.data.userOrder);
        } catch (error) {
          toast.error(error.response.data.error);
          console.error(error.response.data.error);
        }
      }
    };
    getOrders();
  }, [userId]);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-800";
      case "confirmed":
        return "bg-indigo-200 text-indigo-800";
      case "dispatched":
        return "bg-yellow-200 text-yellow-800";
      case "delivered":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      case "received":
        return "bg-green-200 text-green-800";
      default:
        return "bg-purple-200 text-purple-800";
    }
  };
  const chooseIcon = (status) => {
    switch (status) {
      case "pending":
        return (
          <svg
            className="me-1 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
            />
          </svg>
        );
      case "confirmed":
        return (
          <svg
            className="me-1 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
        );
      case "dispatched":
        return (
          <svg
            className="me-1 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </svg>
        );
      case "delivered":
        return (
          <svg
            className="me-1 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
        );
      case "received":
        return (
          <svg
            className="me-1 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg
            className="me-1 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="me-1 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
            />
          </svg>
        );
    }
  };
  const formatDateToLocal = (utcDateString) => {
    const date = new Date(utcDateString);
    return date.toLocaleString();
  };

  if (userOrders.length < 1) {
    return (
      <div className="flex items-center justify-center  bg-gray-100">
        <div className="text-gray-800 text-lg text-center p-5 bg-white rounded-lg shadow-md">
          You don't have any orders yet!
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center space-y-6">
      {userOrders &&
        userOrders?.map((order) => (
          <div
            key={order._id}
            className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition duration-300 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h5 className="mb-4  md:text-xl font-bold text-gray-900 dark:text-white">
                Order ID: #{order._id}
              </h5>
              <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">
                  Order Status:
                </strong>{" "}
                <span
                  className={`${chooseColor(
                    order.orderStatus
                  )} inline-flex items-center rounded px-2.5 py-0.5 font-medium`}
                >
                  {chooseIcon(order.orderStatus)}
                  {order.orderStatus}
                </span>
              </p>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col md:flex-row items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
                >
                  <img
                    src={item.product.thumbnail}
                    alt=""
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600 mb-4 md:mb-0"
                  />
                  <div className="md:ml-4 text-center md:text-left">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.product.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {item.product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 text-center md:text-left">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">
                  Discount:
                </strong>{" "}
                {order.discount} %
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">
                  Order Total:
                </strong>{" "}
                ₹ {order.totalAmount}
              </p>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">
                  Payment Method:
                </strong>{" "}
                {order.paymentMethod}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">
                  Payment Status:
                </strong>{" "}
                <span
                  className={`${chooseColor(
                    order.paymentStatus
                  )} inline-flex items-center rounded px-2.5 py-0.5 font-medium`}
                >
                  {chooseIcon(order.paymentStatus)}
                  {order.paymentStatus}
                </span>
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">
                  Order Created Date:
                </strong>{" "}
                {formatDateToLocal(order.createdAt)}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">
                  Last Updated:
                </strong>{" "}
                {formatDateToLocal(order.updatedAt)}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">
                  Address:
                </strong>{" "}
                {order.selectedAddress.house_no},{order.selectedAddress.area},
                {order.selectedAddress.city},{order.selectedAddress.state}-
                {order.selectedAddress.pin}
              </p>
            </div>

            {order &&
              order.orderStatus !== "delivered" &&
              order.orderStatus !== "cancelled" && (
                <div className="flex justify-end mt-1">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300">
                    Cancel Order
                  </button>
                </div>
              )}
          </div>
        ))}
    </div>
  );
};
