import axios from "axios";
import React, { useEffect, useState } from "react";
import backendUrl from "../utils/backendUrl";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editOrderId, setEditOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const handleStatusChange = async (orderId, type, newStatus) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/orders/update-order`,
        { orderId, type, newStatus },
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("ERROR in updating order status: " + error.message);
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-800";
      case "confirmed":
        return "bg-indigo-200 text-indigo-800";
      case "received":
        return "bg-green-200 text-green-800";
      case "dispatched":
        return "bg-yellow-200 text-yellow-800";
      case "delivered":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
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

  const handleEyeClick = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/orders/all-orders`,
          {
            withCredentials: true,
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("ERROR in fetching all orders API: " + error.message);
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    };
    fetchAllOrders();
  }, [handleStatusChange]);
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-2xl px-4 2xl:px-0">
          <div className="mx-auto max-w-7xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Manage orders
              </h2>
            </div>
            <div className="mt-6 flow-root sm:mt-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Payment Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Last Update
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {orders &&
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">
                              #{order._id}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ₹ {order.totalAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {editOrderId === order._id ? (
                              <select
                                value={order.paymentStatus}
                                className="block  font-bold rounded-lg border border-gray-300 bg-gray-50 pl-3 pt-1 pb-1  text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                                onChange={(e) =>
                                  handleStatusChange(
                                    order._id,
                                    "paymentStatus",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="pending">Pending</option>
                                <option value="received">Received</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`${chooseColor(
                                  order.paymentStatus
                                )} inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium`}
                              >
                                {chooseIcon(order.paymentStatus)}
                                {order.paymentStatus}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {order.selectedAddress.city}{" "}
                            {order.selectedAddress.state}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {editOrderId === order._id ? (
                              <select
                                className="block  font-bold rounded-lg border border-gray-300 bg-gray-50  pl-3 pt-1 pb-1 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                                value={order.orderStatus}
                                onChange={(e) =>
                                  handleStatusChange(
                                    order._id,
                                    "orderStatus",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`${chooseColor(
                                  order.orderStatus
                                )} inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium`}
                              >
                                {chooseIcon(order.orderStatus)}
                                {order.orderStatus}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.updatedAt).toLocaleString()}
                          </td>
                          <td className="flex justify-between gap-4 content-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {/* <MdDelete
                            className="cursor-pointer"
                            color="red"
                            size={22}
                            /> */}
                            <FaEdit
                              className="cursor-pointer"
                              color="green"
                              size={22}
                              onClick={() =>
                                setEditOrderId(
                                  editOrderId === order._id ? null : order._id
                                )
                              }
                            />
                            <FaEye
                              onClick={() => handleEyeClick(order)}
                              className="cursor-pointer"
                              color="blue"
                              size={22}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {selectedOrder && (
        <Dialog
          className="relative z-10"
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Order Id : #{selectedOrder._id}
                      </DialogTitle>
                      <div className="cart-products">
                        {selectedOrder &&
                          selectedOrder.items?.map((item) => (
                            <div key={item?._id} className="cart-product">
                              <div className="img-container">
                                <img src={item?.product?.thumbnail} alt="" />
                              </div>
                              <div className="prod-details">
                                <span className="name">
                                  {item?.product?.title}
                                </span>
                                <div className="text">
                                  <span>{item?.quantity}</span>
                                  <span>x</span>
                                  <span className="highlight">
                                    &#8377; {item?.product?.price}{" "}
                                  </span>
                                  <span> = </span>
                                  <span className="text-green-700">
                                    &#8377;{" "}
                                    {item?.product?.price * item?.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Back
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};
