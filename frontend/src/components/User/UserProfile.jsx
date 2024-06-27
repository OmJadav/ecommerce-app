import React, { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { sendDataApi } from "../../utils/api";

export const UserProfile = () => {
  const { userData } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const userId = userData?._id;

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userData, addresses: [...userData.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    sendDataApi(userId ? `/api/user/update-user/${userId}` : null, newUser);
    setSelectedEditIndex(-1);
    setOpenModal(false);
  };

  const handleRemove = (index) => {
    const newUser = { ...userData, addresses: [...userData.addresses] };
    newUser.addresses.splice(index, 1);
    sendDataApi(userId ? `/api/user/update-user/${userId}` : null, newUser);
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userData.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("house_no", address.house_no);
    setValue("area", address.area);
    setValue("landmark", address.landmark);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pin", address.pin);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setOpenModal(true);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userData,
      addresses: [...userData.addresses, address],
    };
    sendDataApi(userId ? `/api/user/update-user/${userId}` : null, newUser);
    reset();
    setOpenModal(false);
  };

  const handleOpenAddForm = () => {
    reset(); // Reset form to ensure it's empty
    setSelectedEditIndex(-1);
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full pt-10 bg-gray-100">
        {userData && (
          <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6">
              User Profile
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-indigo-900"
                  >
                    Your First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="w-full p-2.5 cursor-not-allowed bg-indigo-50 border border-indigo-300 text-indigo-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your first name"
                    value={userData?.firstName}
                    disabled
                  />
                </div>
                {userData.lastName && (
                  <div className="w-full">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-indigo-900"
                    >
                      Your Last name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="w-full p-2.5 cursor-not-allowed bg-indigo-50 border border-indigo-300 text-indigo-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your Last Name"
                      value={userData?.lastName}
                      disabled
                    />
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-indigo-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2.5 cursor-not-allowed bg-indigo-50 border border-indigo-300 text-indigo-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your.email@mail.com"
                  value={userData?.email}
                  disabled
                />
              </div>
            </div>

            <h4 className="text-xl font-medium leading-6 text-indigo-900 mt-8 text-center">
              Your Addresses
            </h4>
            <div className="flex flex-col gap-3 mt-4">
              {userData.addresses.map((a, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg shadow-sm"
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-indigo-900">
                      {a.house_no}
                    </p>
                    <span className="text-xs text-indigo-600">
                      {a.area}, {a.city}, {a.state} - {a.pin}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditForm(index)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleOpenAddForm}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-300 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
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
        )}
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Address</Modal.Header>
        <Modal.Body>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              selectedEditIndex >= 0
                ? handleEdit(data, selectedEditIndex)
                : handleAdd(data);
            })}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your name"
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
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Enter 10 digit Phone Number",
                    },
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your phone"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="house_no"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your House No
                </label>
                <input
                  type="text"
                  id="house_no"
                  {...register("house_no", {
                    required: "House number is required",
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your House No"
                />
                {errors.house_no && (
                  <p className="text-red-500">{errors.house_no.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="landmark"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Landmark
                </label>
                <input
                  type="text"
                  id="landmark"
                  {...register("landmark", {
                    required: "Landmark is required",
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your Landmark"
                />
                {errors.landmark && (
                  <p className="text-red-500">{errors.landmark.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="area"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Area
                </label>
                <input
                  type="text"
                  id="area"
                  {...register("area", {
                    required: "Area is required",
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your Area"
                />
                {errors.area && (
                  <p className="text-red-500">{errors.area.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", {
                    required: "City is required",
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your City"
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
                  Your State
                </label>
                <input
                  type="text"
                  id="state"
                  {...register("state", {
                    required: "State is required",
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your State"
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
                  Your PIN Code
                </label>
                <input
                  type="text"
                  id="pin"
                  {...register("pin", {
                    required: "PIN code is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Enter 6 digit PIN code",
                    },
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Enter your PIN"
                />
                {errors.pin && (
                  <p className="text-red-500">{errors.pin.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
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
                  d="M12 19V5m-7 7h14"
                />
              </svg>
              Save
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
