"use client";

import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";
import { Link } from "react-router-dom";
export function AdminHeader() {
  return (
    <Banner>
      <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
          <p className="flex items-center justify-between gap-10 font-bold text-black dark:text-gray-400">
            <Link to={"/admin"}>Admin Home</Link>
            <Link to={"/admin/admin-orders"}>Admin Orders</Link>
            <Link to={"/admin/admin-users"}>Manage Users</Link>
            {/* <Link to={"/"}>Contact</Link> */}
            <Link to={"/"}>User</Link>
          </p>
        </div>
        <Banner.CollapseButton
          color="gray"
          className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
        >
          <HiX className="h-4 w-4" />
        </Banner.CollapseButton>
      </div>
    </Banner>
  );
}
