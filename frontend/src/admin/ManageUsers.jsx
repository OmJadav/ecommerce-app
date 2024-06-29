import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Modal } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import backendUrl from "../utils/backendUrl";
import { useForm } from "react-hook-form";
import { sendDataApi } from "../utils/api";
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  const handleUpdateUser = (update) => {
    sendDataApi(
      userData?._id ? `/api/user/update-user/${userData?._id}` : null,
      update
    );
    setOpenModal(false);
  };

  const deleteUserData = async (user) => {
    // console.log(user._id);
    try {
      const response = await axios.delete(
        `${backendUrl}/api/user/delete/${user._id}`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("ERROR in fetching all orders API: " + error.message);
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleEditButtonClick = (user) => {
    setOpenModal(true);
    setUserData(user);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    setValue("role", user.role);
  };
  const handleDeleteButtonClick = (user) => {
    setOpen(true);
    setUserData(user);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/all`, {
          withCredentials: true,
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("ERROR in fetching all orders API: " + error.message);
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    };
    fetchUsers();
  }, [openModal, deleteUserData]);
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-2xl px-4 2xl:px-0">
          <div className="mx-auto max-w-7xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Manage Users
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
                        User ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Signed Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Role
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
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 ">
                    {users &&
                      users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">
                              #{user._id}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.firstName} {user.lastName}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(user.updatedAt).toLocaleString()}
                          </td>
                          <td className="flex justify-between gap-4 content-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <MdDelete
                              className="cursor-pointer"
                              onClick={() => handleDeleteButtonClick(user)}
                              color="red"
                              size={22}
                            />
                            <FaEdit
                              onClick={() => handleEditButtonClick(user)}
                              className="cursor-pointer"
                              color="green"
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
      {userData && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Update User</Modal.Header>
          <Modal.Body>
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                handleUpdateUser(data);
                console.log(data);
              })}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={userData.firstName}
                    {...register("firstName", {
                      required: "firstName is required",
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    placeholder="Enter your name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue={userData.lastName}
                    {...register("lastName", {
                      required: "lastName is required",
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    placeholder="Enter your name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message}</p>
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
                    defaultValue={userData.email}
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
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    {...register("role", {
                      required: "role is required",
                    })}
                    defaultValue={userData.role}
                    label={userData.role}
                    className="block w-full font-bold rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    placement="right"
                  >
                    <option value={"user"}>user</option>
                    <option value={"ad@min#"}>ad@min#</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-green-100 dark:border-green-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
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
                Update
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
      {userData && (
        <Dialog className="relative z-10" open={open} onClose={setOpen}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Permanent Delete account
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate{" "}
                          <span className="text-red-600">
                            {" "}
                            {userData.firstName} {userData.lastName}{" "}
                          </span>
                          account attached with email{" "}
                          <span className="text-red-600">
                            {" "}
                            {userData.email}
                          </span>
                          ? All of your data will be permanently removed. This
                          action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                      deleteUserData(userData);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Cancel
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

export default ManageUsers;
