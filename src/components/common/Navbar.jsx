import React, { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/images/common/logo2.png";

const Navbar = (type) => {
  const { pathname } = useLocation();
  const [currentPathname, setCurrentPathname] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userToken, setUserToken] = useState(
    sessionStorage.getItem("userToken")
  );

  useEffect(() => {
    setCurrentPathname(pathname);
    console.log(currentPathname);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const logoutUser = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("userToken");
    setUserToken(null);
  };

  return (
    <div
      className={` flex justify-between items-center py-5 px-3 sm:px-10 md:px-20 font-noto-sans ${
        type === "frame" ? " bg-transparent" : " bg-opacity-80 bg-white "
      } `}
    >
      <img
        src={logoImg}
        className="  w-22 h-8 md:h-11 md:w-18 object-cover"
        alt=""
      />
      <div
        className={` absolute top-0 bottom-0 left-0 right-0  duration-500 lg:bg-transparent lg:static ${
          isMenuOpen
            ? "  z-10 opacity-100 bg-white bg-opacity-90 "
            : " opacity-0 lg:opacity-100 "
        } flex flex-col lg:flex-row items-center gap-16 lg:gap-5 pt-24 lg:pt-0 lg:pr-[120px] text-gray-1 font-semibold lg:font-extrabold text-2xl lg:text-base duration-300`}
      >
        <Link
          className={`${
            currentPathname === "/"
          } hover:text-stone-400 duration-300 font-medium`}
          to="/"
        >
          HOME
        </Link>
        <Link
          className={`${
            currentPathname === "/destination"}  hover:text-stone-400 duration-300 font-medium`}
          to="/destination"
        >
          INTERNATIONAL
        </Link>
        <Link
          className={`${
            currentPathname === "/destination/india"}  hover:text-stone-400 duration-300 font-medium`}
          to="/destination/india"
        >
          DOMESTIC
        </Link>
        <Link
          className={`${
            currentPathname === "/itenary" 
          }  hover:text-stone-400 duration-300 font-medium`}
          to="/itenary"
        >
          ITINERARIES
        </Link>
        <Link
          className={`${
            currentPathname === "/blogs" 
          }  hover:text-stone-400 duration-300 font-medium`}
          to="/blogs"
        >
          BLOG
        </Link>
        <Link
          className={`${
            currentPathname === "/visa"
          }  hover:text-stone-400 duration-300 font-medium`}
          to="https://visa.touron.in/"
          target="blank"
        >
          VISA
        </Link>
        <Link
          to="/login"
          className=" border border-primary text-white bg-primary rounded-md py-1.5 px-3 font-medium hover:bg-white hover:text-primary duration-300 flex lg:hidden"
        >
          Sign In
        </Link>
        {/* <Link className=" hover:text-stone-400 duration-300" to="#">Gaia</Link> */}
      </div>
      <div className=" flex w-full lg:w-auto justify-end mr-6 lg:mr-0 items-center gap-2 font-medium z-20">
        {userToken ? (
          user.username && (
            <Link
              to={"/dashboard/"}
              className=" border border-primary bg-primary text-white font-bold text-lg py-1.5 px-3 rounded-full "
            >
              {user?.username?.slice(0, 1)}
            </Link>
          )
        ) : (
          // <Link
          //   onClick={logoutUser}
          //   className=" border border-primary text-primary bg-white rounded-md py-1.5 px-3 font-medium hover:bg-primary hover:text-white duration-300"
          // >
          //   Log out
          // </Link>
          <Link
            to="/login"
            className=" border border-primary text-white bg-primary rounded-md py-1 lg:py-1.5 px-3 font-medium hover:bg-white hover:text-primary duration-300 hidden lg:flex"
          >
            Sign In
          </Link>
        )}
      </div>
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className=" z-20 lg:min-w-[15%] lg:hidden w-fit h-fit cursor-pointer"
      >
        {isMenuOpen ? (
          <IoMdClose className=" text-3xl lg:hidden" />
        ) : (
          <CiMenuBurger className=" text-3xl lg:hidden" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
