import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/common/logo2.png";
import { MdDashboard } from "react-icons/md";
import { SiGooglebigquery } from "react-icons/si";
import { FaCcVisa } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function SidebarUser() {
  const { pathname } = useLocation();
  return (
    <div className=" border-r border-r-stone-300 bg-[#fdfdfd] text-stone-500 w-16 sm:w-52 lg:w-80 space-y-6 fixed top-0 left-0 bottom-0 overflow-y-scroll">
      <h1 className=" px-2 lg:px-6 text-stone-600 text-xl sm:text-2xl lg:text-3xl font-semibold uppercase tracking-wider py-4 border-b border-stone-400">
        <img src={logo} className=" w-full h-full sm:h-auto sm:w-48" alt="" />
      </h1>
      <nav className=" flex flex-col gap-3 px-2 lg:px-6 py-5">
        {initialNavigation.map((item, index) => (
          <Link
            to={item.href}
            className={`w-full text-left flex justify-between items-center px-2 py-[10px] text-lg font-semibold rounded-md ${
              item.href === pathname
                ? " bg-slate-100 text-primary"
                : "hover:bg-slate-100 hover:text-primary"
            }`}
          >
            <div className=" flex items-center">
              <item.icon className="mr-3 h-8 sm:h-5 w-8 sm:w-5" />
              <p className={`hidden sm:flex`}>{item.name}</p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default SidebarUser;

const initialNavigation = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard/",
    current: false,
  },
  {
    name: "Home",
    icon: FaHome,
    href: "/",
    current: false,
  },
  {
    name: "My Request",
    icon: SiGooglebigquery,
    href: "/dashboard/request",
    current: false,
  },
  {
    name: "My visa request",
    icon: FaCcVisa,
    href: "/dashboard/visa",
    current: false,
  },
  {
    name: "User profile",
    icon: CgProfile,
    href: "/dashboard/profile",
    current: false,
  },
  {
    name: "Logout",
    icon: IoMdLogOut,
    href: "/logout",
    current: false,
  },
];
