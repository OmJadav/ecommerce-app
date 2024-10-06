import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendDataApi } from "../../utils/api";
import { Context } from "../../utils/context";
import CheckoutCartView from "./CheckoutCartView";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import backendUrl from "../../utils/backendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm();
  const [totalAmount, setTotalAmount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [savings, setSavings] = useState(0);
  const [hasPromo, setHasPromo] = useState(false);
  const { userData, cartSubTotal, cartItems, promocodes } = useContext(Context);
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [Promocode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const userId = userData?._id;
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(cartSubTotal);
  }, [cartSubTotal]);

  const handleAddAddress = (data) => {
    const update = {
      ...userData,
      addresses: [...userData?.addresses, data],
    };
    sendDataApi(userId ? `/api/user/update-user/${userId}` : null, update);
    window.location.href = "/checkout";
  };
  const promoCode = promoCodeInput?.toLowerCase().trim();
  let index = promoCode?.search(/\d/);
  let textPart = promoCode?.slice(0, index);
  let numberPart = promoCode ? promoCode.slice(index) : 0;

  //promocode logic
  useEffect(() => {
    const fetchPromocodes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/codes/promocodes`, {
          withCredentials: true,
        });
        // console.log(response.data[0]);
        setPromoCode(response.data[0] || null);
      } catch (error) {
        toast.error("Failed to fetch promocodes");
      }
    };
    fetchPromocodes();
  }, [setPromoCode]);

  const finalAmount = () => {
    setPromoError("");
    setPromoSuccess("");
    setHasPromo(false);
    if (!hasPromo && promoCode === Promocode?.promocode) {
      if (index !== -1) {
        let discount = totalAmount * (parseInt(numberPart) / 100);
        setSavings(parseFloat(discount.toFixed(2)));
        setTotalAmount(parseFloat((totalAmount - discount).toFixed(2)));
        setPromoSuccess(
          `You got ${numberPart} % off on your Promo Code ${promoCode}`
        );
        setHasPromo(true);
      } else {
        setSavings(0);
        setTotalAmount(totalAmount);
      }
    } else {
      console.log("Invalid promo code");
      setPromoError("Invalid promo code");
    }
  };

  const handleInputChange = (event) => {
    setPromoCodeInput(event.target.value);
  };
  const makePayment = async (req, res) => {
    if (selectedAddress && paymentMethod) {
      try {
        const stripe = await loadStripe(
          process.env.REACT_APP_STRIPE_PUBLIC_KEY
        );
        const body = {
          products: cartItems,
          userId: userId,
          discount: numberPart,
          totalAmount: totalAmount,
        };
        const response = await fetch(`${backendUrl}/stripe/checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const session = await response.json();

        const orderData = {
          items: cartItems,
          totalAmount,
          totalItems: cartItems.length,
          discount: numberPart,
          user: userId,
          selectedAddress,
          paymentMethod,
          paymentStatus: "pending",
          orderStatus: "pending",
        };
        localStorage.setItem("orderData", JSON.stringify(orderData));
        // console.log(session);
        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          toast.error(result.error.message);
        }
      } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    } else {
      toast("Select Address and Payment Method", {
        icon: "❌",
      });
    }
  };
  const handleAddress = (e) => {
    const selectedIndex = parseInt(e.target.value);
    // console.log(e.target.value);
    setSelectedAddress(userData.addresses[selectedIndex]);
  };

  const handleCashOrder = async () => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items: cartItems,
        totalAmount,
        totalItems: cartItems.length,
        discount: numberPart,
        user: userId,
        selectedAddress,
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "pending",
      };
      try {
        const response = await axios.post(
          `${backendUrl}/api/orders/new-order`,
          order,
          {
            withCredentials: true,
          }
        );
        // console.log(response.data);
        localStorage.setItem("currentOrder", JSON.stringify(response.data));
        toast.success("Order placed successfully");
        navigate("/order-confirm");
        return response.data;
      } catch (error) {
        console.error("ERROR in sending data API: " + error.message);
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    } else {
      toast("Select Address and Payment Method", {
        icon: "❌",
      });
    }
  };
  const handleOrder = async (sessionId) => {
    const order = {
      items: cartItems,
      totalAmount,
      totalItems: cartItems.length,
      discount: numberPart,
      user: userId,
      selectedAddress,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "pending",
    };
    try {
      const response = await axios.post(
        `${backendUrl}/api/orders/new-order`,
        order,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("currentOrder", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("ERROR in sending data API: " + error.message);
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      <section className="bg-white py-7 antialiased dark:bg-gray-900 md:py-7">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h1 className="text-center text-3xl font-bold">Checkout</h1>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              {showForm && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Shipping Details
                  </h2>
                  <form
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      // reset();
                      handleAddAddress(data);
                      console.log(data);
                    })}
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your Full Name{" "}
                        </label>
                        <input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                          placeholder="Enter Your name"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your email*{" "}
                        </label>
                        <input
                          type="email"
                          id="email"
                          {...register("email", {
                            required: "Email is Required",
                            pattern: {
                              value: /\b\w+@[\w.-]+\.\w{2,4}\b/gi,
                              message: "Email not valid",
                            },
                          })}
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                          placeholder="xyz@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="house_no"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {" "}
                            Your House/Apartment No. and Name*{" "}
                          </label>
                        </div>
                        <input
                          type="text"
                          {...register("house_no", {
                            required: "House number/name is required",
                          })}
                          id="house_no"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                          placeholder="Example. A-201 , Sky city"
                        />
                        {errors.house_no && (
                          <p className="text-red-500">
                            {errors.house_no.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="area"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {" "}
                            Area / Locality{" "}
                          </label>
                        </div>
                        <input
                          type="text"
                          id="area"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                          placeholder="Area name"
                          {...register("area", {
                            required: "Area is required",
                          })}
                        />
                        {errors.area && (
                          <p className="text-red-500">{errors.area.message}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="landmark"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Land Mark{" "}
                        </label>
                        <input
                          type="text"
                          id="landmark"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                          placeholder="Famous/Popular place"
                          {...register("landmark", {
                            required: "landmark is required",
                          })}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          City{" "}
                        </label>
                        <input
                          type="text"
                          id="city"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                          placeholder="Enter city"
                          {...register("city", {
                            required: "City is required",
                          })}
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          State{" "}
                        </label>
                        <input
                          type="text"
                          id="state"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                          placeholder="Enter State name"
                          {...register("state", {
                            required: "State is required",
                          })}
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="pin"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Pin code/Zip code (6 digit){" "}
                        </label>
                        <input
                          type="number"
                          id="pin"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                          placeholder="Enter your area pin code"
                          {...register("pin", {
                            required: "PIN is required",
                            pattern: {
                              value: /^\d{6}$/,
                              message: "PIN must be exactly 6 digits",
                            },
                          })}
                        />
                        {errors.pin && (
                          <p className="text-red-500">{errors.pin.message}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Phone Number*{" "}
                        </label>
                        <div className="flex items-center">
                          <div
                            id="dropdown-phone-button-3"
                            className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 outline-none  dark:border-gray-600 dark:bg-gray-700 dark:text-white "
                            type="button"
                          >
                            <svg
                              fill="none"
                              aria-hidden="true"
                              className="me-2 h-4 w-4"
                              viewBox="0 0 20 15"
                            >
                              <rect width="20" height="5" fill="#FF9933" />
                              <rect
                                width="20"
                                height="5"
                                y="5"
                                fill="#FFFFFF"
                              />
                              <rect
                                width="20"
                                height="5"
                                y="10"
                                fill="#138808"
                              />
                              <circle
                                cx="10"
                                cy="7.5"
                                r="2"
                                fill="none"
                                stroke="#000080"
                                strokeWidth="0.5"
                              />
                              <g stroke="#000080" strokeWidth="0.2">
                                <line x1="10" y1="7.5" x2="10" y2="5.5" />
                                <line x1="10" y1="7.5" x2="10.588" y2="5.588" />
                                <line x1="10" y1="7.5" x2="11.176" y2="6.0" />
                                <line x1="10" y1="7.5" x2="11.588" y2="6.588" />
                                <line x1="10" y1="7.5" x2="12" y2="7.0" />
                                <line x1="10" y1="7.5" x2="12.176" y2="7.5" />
                                <line x1="10" y1="7.5" x2="12" y2="8.0" />
                                <line x1="10" y1="7.5" x2="11.588" y2="8.412" />
                                <line x1="10" y1="7.5" x2="11.176" y2="9.0" />
                                <line x1="10" y1="7.5" x2="10.588" y2="9.412" />
                                <line x1="10" y1="7.5" x2="10" y2="9.5" />
                                <line x1="10" y1="7.5" x2="9.412" y2="9.412" />
                                <line x1="10" y1="7.5" x2="8.824" y2="9.0" />
                                <line x1="10" y1="7.5" x2="8.412" y2="8.412" />
                                <line x1="10" y1="7.5" x2="8" y2="8.0" />
                                <line x1="10" y1="7.5" x2="7.824" y2="7.5" />
                                <line x1="10" y1="7.5" x2="8" y2="7.0" />
                                <line x1="10" y1="7.5" x2="8.412" y2="6.588" />
                                <line x1="10" y1="7.5" x2="8.824" y2="6.0" />
                                <line x1="10" y1="7.5" x2="9.412" y2="5.588" />
                                <line x1="10" y1="7.5" x2="10" y2="5.5" />
                                <line x1="10" y1="7.5" x2="10.588" y2="5.588" />
                                <line x1="10" y1="7.5" x2="11.176" y2="6.0" />
                                <line x1="10" y1="7.5" x2="11.588" y2="6.588" />
                              </g>
                            </svg>
                            +91
                          </div>
                          <div className="relative w-full">
                            <input
                              type="number"
                              id="phone"
                              className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              placeholder="10 digits Mobile number"
                              {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[6-9]\d{9}$/,
                                  message:
                                    "Phone number must be a valid 10-digit Indian number",
                                },
                              })}
                            />
                          </div>
                        </div>
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                      {/* <div className="sm:col-span-2"> */}
                      <div className="sm:col-span-2 flex items-center gap-4">
                        <Button color={"light"} type="reset">
                          Reset
                        </Button>
                        <button
                          type="submit"
                          className="flex w- items-center justify-center gap-2 rounded-lg border border-gray-200 bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14m-7 7V5"
                            />
                          </svg>
                          Add new address
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              <div className="space-y-4">
                <button
                  onClick={toggleForm}
                  className="flex w- items-center justify-center gap-2 rounded-lg border border-gray-200 bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  {showForm ? "Hide form" : "+ Add New Address"}
                </button>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Addresses
                </h3>
                {userData && userData.addresses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {userData?.addresses?.map((a, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              onChange={handleAddress}
                              value={index}
                              aria-describedby={index}
                              type="radio"
                              name="address"
                              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                            />
                          </div>
                          <div className="ms-4 text-sm">
                            <label
                              htmlFor="credit-card"
                              className="font-medium leading-none text-gray-900 dark:text-white"
                            >
                              {" "}
                              {a.house_no.toUpperCase()}{" "}
                            </label>
                            <p
                              id="credit-card-text"
                              className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                            >
                              {a.city.toUpperCase()} - {a.pin}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center">You have no saved addresses </p>
                )}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment <span className="text-sm">(select one)</span>
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="cardPayment"
                          aria-describedby="cardPayment-text"
                          type="radio"
                          name="payment-method"
                          value="card"
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                      </div>
                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="cardPayment"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          {" "}
                          Card Payment{" "}
                        </label>
                        <p
                          id="cardPayment-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          Pay with your card
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="cashPayment"
                          aria-describedby="cashPayment-text"
                          type="radio"
                          name="payment-method"
                          value="cash"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                      </div>
                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="cashPayment"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          {" "}
                          Cash on delivery{" "}
                        </label>
                        <p
                          id="cashPayment-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          Pay after you got your package
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <>
                <CheckoutCartView />
              </>
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹ {cartSubTotal}
                    </dd>
                  </dl>
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Enter a gift card, voucher or promotional code{" "}
                    </label>
                    <div className="flex max-w-md items-center gap-4">
                      <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 "
                        placeholder="Enter promo code"
                        value={promoCodeInput}
                        onChange={handleInputChange}
                      />
                      <button
                        onClick={finalAmount}
                        className="flex items-center justify-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800  dark:bg-primary-600 dark:hover:bg-indigo-700 dark:focus:ring-primary-800"
                      >
                        Apply
                      </button>
                    </div>
                    {!hasPromo && promoError && (
                      <p className="text-right text-red-500">{promoError}</p>
                    )}
                  </div>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      {" "}
                      - ₹ {savings}
                    </dd>
                  </dl>
                  {hasPromo && promoCode && promoSuccess && (
                    <p className="text-right text-green-500">{promoSuccess}</p>
                  )}
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ₹ {totalAmount}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                {paymentMethod && paymentMethod === "card" ? (
                  <button
                    onClick={makePayment}
                    className="flex w-full items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4  focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Proceed to Card Payment
                  </button>
                ) : (
                  <button
                    onClick={handleCashOrder}
                    className="flex w-full items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4  focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
