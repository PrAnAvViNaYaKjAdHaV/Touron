import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/common/logof1.png";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const [pathName, setPathName] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    setPathName(pathname);
  }, []);

  return (
    //     <div>
    //       <div className=" py-8 px-8 sm:px-4 md:px-10 lg:px-12 2xl:px-20 font-noto-sans grid grid-cols-2 sm:flex items-start justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-20 xl:gap-28 2xl:gap-36 ">
    //         <div className=" col-span-2 flex sm:justify-center items-start gap-2 pb-4 sm:pb-0">
    //           <img className=" w-11 mt-0.5 mb-2" src={Logo} alt="" />
    //           <div>
    //             <h1 className=" font-medium text-[#1B1F2D] mb-1">TourON</h1>
    //             <p className=" text-gray-3 text-sm">
    //               Your next goto companion for travel
    //             </p>
    //           </div>
    //         </div>
    //         <div>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">About</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Blogs</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Gaia</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Contact us</p>
    //         </div>
    //         <div>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Australia</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">New Zealand</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">France</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Greece</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Maldives</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Singapore</p>
    //         </div>
    //         <div>
    //           <p className="  text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Terms and Conditions</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Privacy Policy</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Terms of use</p>
    //         </div>
    //         <div>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Support</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Cancel your bookings</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Use Coupon</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">Refund Policies</p>
    //           <p className=" text-gray-3 hover:text-stone-400 cursor-pointer duration-300 mb-0.5 text-sm">
    //             {" "}
    //             International Travel Documents{" "}
    //           </p>
    //         </div>
    //       </div>
    //       <p className=" text-stone-500 text-sm text-center py-2">copyright &#169; 2023. All rights reserved.</p>
    //     </div>

    <footer
      className={`bg-via-[#bce1ff] ${
        pathName === "/state/frame" &&
        " bg-stone-300 backdrop-filter backdrop-blur-lg bg-opacity-30 "
      }`}
    >
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-3">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            {/* <img src="#" className="mr-5 h-6 sm:h-9" alt="logo" /> */}
            <img className=" w-16 mt-0.5 mb-2" src={Logo} alt="" />
            <p className="max-w-xs mt-4 text-md text-gray-600 text-justify">
            Discover the beauty of journeys with tour On - where every trip is a story waiting to unfold. Embark on unforgettable adventures, forging connections that last a lifetime. Your journey begins here, let's explore the world together.
            </p>
            <div className="flex mt-8 space-x-6 text-gray-600">
              <a
                className="hover:opacity-75"
                href = "https://www.facebook.com/touronholidays/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Facebook </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                className="hover:opacity-75"
                href = "https://www.instagram.com/touronholidays/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Instagram </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                className="hover:opacity-75"
                href = "https://twitter.com/touronholidays/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Twitter </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 sm:justify-between lg:grid-cols-5">
            <div>
              <p className="font-medium">Company</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <Link
                  className="hover:opacity-75"
                  to="https://visa.touron.in/"
                  target="_blank"
                >
                  {" "}
                  Visa{" "}
                </Link>
                <Link className="hover:opacity-75" to="/about-us">
                  {" "}
                  About us{" "}
                </Link>
                <Link className="hover:opacity-75"> Careers</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium">Menu</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                {/* <Link className="hover:opacity-75"> VR Appointment </Link> */}
                <Link className="hover:opacity-75" to="/itenary">
                  Itenaries
                </Link>
                <Link className="hover:opacity-75" to="/destination">
                  Destination
                </Link>
                <Link className="hover:opacity-75" to="/blogs">
                  Blog
                </Link>
              </nav>
            </div>

            <div className=" sm:col-span-2 lg:col-span-1 flex sm:items-center sm:justify-center lg:items-start lg:justify-start">
              <div>
                <p className="font-medium">Legal</p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <Link className="hover:opacity-75" to="/contact">
                    {" "}
                    Contact us{" "}
                  </Link>
                  <Link className="hover:opacity-75" to="/privacypolicy">
                    {" "}
                    Privacy Policy{" "}
                  </Link>
                  <Link className="hover:opacity-75" to="/termscondition">
                    {" "}
                    Terms &amp; Conditions{" "}
                  </Link>
                  {/* <Link className="hover:opacity-75" to="/return-policy">
                  {" "}
                  Returns Policy{" "}
                </Link> */}
                </nav>
              </div>
            </div>
            <div className=" lg:ml-5 sm:order-5">
              <p className="font-medium">Contact us</p>
              <nav className="flex flex-col mt-3 space-y-0.5 text-sm text-gray-500">
                <a
                  href="https://www.google.com/maps/place/tour+On/@13.080703,80.1950502,17z/data=!3m2!4b1!5s0x3a52640335b64d99:0xc3274e3bb225aed3!4m6!3m5!1s0x3a525f4556f125d3:0xf35cba654a2f8878!8m2!3d13.080703!4d80.1976251!16s%2Fg%2F11g2r7gzj2?entry=ttu"
                  target="_blank"
                  className=" grid grid-cols-[12px_1fr] items-start gap-2 text-gray-50 border border-stone-700 bg-stone-700 hover:bg-white hover:text-stone-700 duration-300 rounded w-fit py-1.5 pl-2 pr-3 font-medium text-sm mb-2"
                >
                  <IoLocationOutline className=" mt-1" />
                  <p>Chennai</p>
                </a>
                <p>The Hive, Level 3,</p>
                <p>VR Mall,</p> 
                <p>Madras House,</p>
                <p>Anna Nagar, Chennai - 40 </p>
              </nav>
            </div>
            <div className=" sm:order-6">
              <p className="font-medium h-6"></p>
              <nav className="flex flex-col mt-3 space-y-0.5 text-sm text-gray-500">
                <a
                  href="https://www.google.com/maps/place/tour+On/@13.080703,80.1950502,17z/data=!3m2!4b1!5s0x3a52640335b64d99:0xc3274e3bb225aed3!4m6!3m5!1s0x3a525f4556f125d3:0xf35cba654a2f8878!8m2!3d13.080703!4d80.1976251!16s%2Fg%2F11g2r7gzj2?entry=ttu"
                  target="_blank"
                  className=" grid grid-cols-[12px_1fr] items-start gap-2 text-gray-50 border border-stone-700 bg-stone-700 hover:bg-white hover:text-stone-700 duration-300 rounded w-fit py-1.5 pl-2 pr-3 font-medium text-sm mb-2"
                >
                  <IoLocationOutline className=" mt-1" />
                  <p>Coimbatore</p>
                </a>
                <p>No. 147-148,</p>
                <p>DB Road, 1st Floor,</p>
                <p>Vijay Enclave, </p>
                <p>R.S.Puram, Coimbatore - 02</p>
              </nav>
            </div>
          </div>
        </div>
        <div className="">
          <p className=" text-center mt-8 text-[9px] sm:text-xs text-gray-800">
            © 2024 <a href="touron.in">tour On</a> (A Brand of Lotsatravel
            Holiday LLP) | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
