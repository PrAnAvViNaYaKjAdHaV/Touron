import React, { useEffect, useState } from "react";
import logo from "../../assets/images/common/logo2.png";
import { FaChevronDown } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { MdFlight } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { IoChatbox } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { BiSolidNotepad } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { MdSell } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { FiTarget } from "react-icons/fi";
import { MdRequestPage } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { MdOutlineFlight } from "react-icons/md";

import { Link, redirect, useLocation, useNavigate } from "react-router-dom";

function Sidebaradmin() {
  const admin = sessionStorage.getItem("admin");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [navigation, setNavigation] = useState(initialNavigation);

  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname); // Update the current path when pathname changes
  }, [pathname]);

  useEffect(() => {
    const updatedNavigation = initialNavigation.map((item) => {
      const isCurrent = currentPath === item.href;
      const updatedSubItems = item.sub?.map((subItem) => ({
        ...subItem,
        current: currentPath === subItem.subhref,
      }));

      return {
        ...item,
        current: isCurrent,
        isSubnameVisible:
          isCurrent || updatedSubItems?.some((subItem) => subItem.current),
        sub: updatedSubItems,
      };
    });

    setNavigation(updatedNavigation);
  }, [currentPath]);

  const toggleSubname = (index) => {
    const newNavigation = navigation.map((item, i) => {
      if (i === index) {
        // Keep the submenu open if the current URL matches any of the sub-item URLs
        const shouldStayOpen = item.sub?.some((subItem) => subItem.current);
        return {
          ...item,
          isSubnameVisible: shouldStayOpen ? true : !item.isSubnameVisible,
        };
      }
      return item;
    });

    setNavigation(newNavigation);
  };

  return (
    <div className=" border-r border-r-stone-300 bg-[#fdfdfd] text-stone-500 w-16 sm:w-52 lg:w-80 space-y-6 fixed top-0 left-0 bottom-0 overflow-y-scroll">
      <h1 className=" px-2 lg:px-6 text-stone-600 text-xl sm:text-2xl lg:text-3xl font-semibold uppercase tracking-wider py-6 border-b border-stone-400">
        <img src={logo} className=" w-48" alt="" />
      </h1>
      <nav className=" flex flex-col gap-3 px-2 lg:px-6 pt-2 pb-5">
        {navigation.map((item, index) => (
          <div
            key={item.name}
            className={`group ${
              admin !== "9047514717"
                ? item.name === "Customers"
                  ? "hidden"
                  : item.name === "Users"
                  ? "hidden"
                  : item.name === "Vendor"
                  ? "hidden"
                  : item.name === "BookingDRecords" && "hidden"
                : ""
            }`}
          >
            <Link
              to={item.href}
              onClick={() => toggleSubname(index)}
              className={`w-full text-left flex justify-between items-center px-2 sm:pl-4 sm:pr-2 py-[10px] font-semibold rounded-3xl ${
                item.current
                  ? " bg-slate-100 text-primary"
                  : "hover:bg-slate-100 hover:text-primary"
              }`}
            >
              <div className=" flex items-center">
                <item.icon className="sm:mr-3 h-5 w-5" />
                <p className={`hidden sm:flex`}>{item.name}</p>
              </div>
              {item.sub && (
                <FaChevronDown
                  className={`${
                    item.isSubnameVisible ? " rotate-180" : "rotate-0"
                  } duration-300`}
                />
              )}
            </Link>
            {item.isSubnameVisible &&
              item.sub &&
              item.sub.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={item.subhref}
                    className={` flex items-center mt-1 px-4 py-1 text-sm font-semibold rounded-xl hover:bg-slate-100 ${
                      item.current
                        ? " bg-slate-100 text-primary"
                        : "hover:bg-slate-100 hover:text-primary"
                    }`}
                  >
                    <item.subicon className=" mr-3 h-5 w-5" />
                    <p className={`hidden sm:flex`}>{item.subname}</p>
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebaradmin;

const initialNavigation = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    href: "/admin",
    current: true,
  },
  {
    name: "Analytics",
    icon: IoMdAnalytics,
    href: "/admin/analytics",
    current: false,
  },
  {
    name: "Sales",
    icon: FiTarget,
    href: "#admin",
    sub: [
      {
        subname: "Request",
        subhref: "/admin/sales/request",
        subicon: MdRequestPage,
        current: false,
      },
      {
        subname: "BookingB2C",
        subhref: "/admin/sales/bookingb2c",
        subicon: FaBusinessTime,
        current: false,
      },
      {
        subname: "BookingB2B",
        subhref: "/admin/sales/bookingb2b",
        subicon: MdBusinessCenter,
        current: false,
      },
    ],
    current: false,
  },
  {
    name: "BookingDRecords",
    icon: FaBlog,
    href: "/admin/bookingdrecords",
    current: false,
  },
  {
    name: "Blog",
    icon: FaBlog,
    href: "/admin/blogs",
    current: false,
  },
  {
    name: "Itineries",
    icon: FaPlaceOfWorship,
    href: "/admin/itinary",
    current: false,
  },
  {
    name: "Domestic",
    icon: FaHome,
    href: "#",
    sub: [
      {
        subname: "Domestic State",
        subhref: "/admin/domestic/state",
        subicon: MdOutlineRealEstateAgent,
      },
      {
        subname: "Domestic City",
        subhref: "/admin/domestic/city",
        subicon: FaCity,
      },
    ],
    current: false,
  },
  {
    name: "International",
    icon: MdOutlineFlight,
    href: "#",
    sub: [
      {
        subname: "International Country",
        subhref: "/admin/international/country",
        subicon: MdOutlineRealEstateAgent,
      },
      {
        subname: "International City",
        subhref: "/admin/international/city",
        subicon: FaCity,
      },
    ],
    current: false,
  },
  {
    name: "Team members",
    icon: RiTeamFill,
    href: "/admin/teammembers",
    current: false,
  },
  {
    name: "Chat box",
    icon: IoChatbox,
    href: "/admin/chatbox",
    current: false,
  },
  {
    name: "Testimonials",
    icon: FaNoteSticky,
    href: "/admin/testimonials",
    current: false,
  },
  {
    name: "Customers",
    icon: FaUsers,
    href: "/admin/customers",
    current: false,
  },
  {
    name: "Users",
    icon: HiUsers,
    href: "/admin/users",
    current: false,
  },
  {
    name: "Vendor",
    icon: MdSell,
    href: "/admin/vendor",
    current: false,
  },
  {
    name: "Logout",
    icon: IoLogOut,
    href: "/logout",
    current: false,
  },
];
