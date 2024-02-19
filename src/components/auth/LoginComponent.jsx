import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/common/touronWhileLogo.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectTravelWith } from "../../redux/features/customize/customizeSlice";

const LoginComponent = () => {
  const travelWith = useSelector(selectTravelWith);
  const [travelWithData, setTravelWithData] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState(+91); // ["+91", "+1", "+44"
  const [mobileNumber, setMobileNumber] = useState();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState();
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendOTP, setSendOTP] = useState();

  const [newUser, setNewUser] = useState(true);
  // let BASE_URL = import.meta.env.VITE_API_URL;

  // if (import.meta.env.NODE_ENV === "production") {
  //   BASE_URL = `${req.protocol}://${req.get("host")}`;
  // }

  const handleVerifyOTP = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/login/verify-otp`, {
        otp,
        mobileNumber,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "OTP verified") {
          axios
            .post(`${import.meta.env.VITE_API_URL}/api/login`, {
              username: username,
              mobileNumber: mobileNumber,
              email: email,
            })
            .then((res) => {
              if (res.data.message === "old user") {
                console.log(res.data);
                sessionStorage.setItem("userToken", res.data.token);
                sessionStorage.setItem("admin", res.data.admin);
                sessionStorage.setItem("user", JSON.stringify(res.data));
                setNewUser(false);
                if (travelWithData != "") {
                  navigate("/customize/date-itenary");
                } else {
                  navigate("/");
                }
              } else if (
                res.data.message === "add user" ||
                res.data.message === "new user"
              ) {
                setNewUser(true);
              }
              setOtpVerified(true);
              setShowOTP(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("OTP verification failed");
        setOtpVerified(false);
      });
  };

  const handleClickGetOTP = () => {
    if (mobileNumber.length === 10) {
      setSendOTP(Math.floor(100000 + Math.random() * 900000));

      axios
        .post(`${import.meta.env.VITE_API_URL}/api/login/send-otp`, {
          mobileNumber: mobileNumber,
        })
        // .then((response) => response.text())
        .then((result) => {
          console.log(result);
          if (result.data.message === "OTP sent successfully") {
            setShowOTP(true);
            toast.success("OTP sent successfully");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(travelWith);
    console.log(mobileNumber, username);
    if (username.length > 1) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/login`, {
          username: username,
          mobileNumber: mobileNumber,
          email: email,
        })
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("userToken", res.data.token);
          sessionStorage.setItem("admin", res.data.admin);
          sessionStorage.setItem("user", JSON.stringify(res.data));
          if (travelWithData != "") {
            navigate("/customize/date-itenary");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    }
  };

  const handleCloseLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    setTravelWithData(travelWith);
    console.log(travelWithData);
  }, []);

  return (
    <>
      <div className=" relative hidden lg:flex flex-col gap-10 items-center justify-center pb-20">
        <img className=" w-32" src={logoImg} alt="" />
        <div className=" flex flex-col gap-4 items-center justify-center">
          <h1 className=" text-white font-bold text-5xl">Touron</h1>
          <p className=" text-stone-50 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            asperiores architecto repellat, cumque sit, ipsam enim voluptate
            deleniti minus similique impedit ducimus, vitae sint facilis earum
            illum atque dolorem. Adipisci voluptate perspiciatis accusantium,
            officiis delectus rem exercitationem sunt eligendi magni ducimus
            maxime provident? In labore error provident aut, dignissimos enim
            quidem nihil excepturi iure. Vitae consequuntur provident at ipsam
            maxime.
          </p>
        </div>
      </div>
      <div className=" relative flex items-center justify-center 2xl:px-10">
        <form
          onSubmit={onSubmit}
          className=" flex flex-col gap-5 sm:bg-white sm:shadow-md -pt-5 sm:py-10 sm:px-10 rounded-xl"
        >
          <div className=" flex items-start justify-between gap-4">
            <h1 className=" font-semibold text-xl sm:text-2xl text-stone-700">
              Enter mobile number to personalise your trip
            </h1>
            <button
              className=" font-semibold text-stone-600 w-fit h-fit"
              onClick={handleCloseLogin}
            >
              <IoMdClose className="text-3xl text-stone-700" />
            </button>
          </div>
          {showOTP && (
            <div className=" flex flex-col gap-3">
              <label className=" font-semibold text-stone-700">Enter OTP</label>
              <input
                type="number"
                className=" border border-stone-200 rounded px-3 py-2 sm:py-2 focus:outline-none"
                placeholder="Enter OTP"
                onChange={(e) => setOTP(e.target.value)}
                value={otp}
                required
              />
              <button
                className=" font-semibold text-stone-100 bg-primary px-1 py-2 sm:py-3 rounded border border-primary hover:bg-stone-50 hover:text-primary duration-300"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </button>
            </div>
          )}
          {otpVerified && showOTP === false ? (
            newUser ? (
              <>
                <input
                  type="text"
                  className=" border border-gray-2 bg-gray-2 rounded-lg py-2 sm:py-3 px-3 focus:outline-none w-full text-stone-600"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className=" border border-gray-2 bg-gray-2 rounded-lg py-2 sm:py-3 px-3 focus:outline-none w-full text-stone-600"
                  placeholder="Enter your Email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className=" font-semibold text-stone-100 bg-primary px-1  py-2 sm:py-3 rounded border border-primary hover:bg-stone-50 hover:text-primary duration-300"
                >
                  Submit
                </button>
              </>
            ) : travelWithData != null ? (
              navigate("/customize/date-itenary")
            ) : (
              navigate("/")
            )
          ) : (
            showOTP === false && (
              <>
                <div className=" grid grid-cols-[50px_1fr] justify-around items-center gap-3 ">
                  <input
                    className=" border border-gray-2 bg-gray-2 rounded-lg py-2 sm:py-3 px-3 focus:outline-none w-full text-stone-500"
                    type="number"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={true}
                  />
                  <input
                    className=" border border-gray-2 bg-gray-2 rounded-lg py-2 sm:py-3 px-3 focus:outline-none w-full text-stone-600"
                    type="number"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
                <button
                  onClick={handleClickGetOTP}
                  className=" font-semibold text-stone-100 bg-primary px-1 py-2 sm:py-3 rounded border border-primary hover:bg-stone-50 hover:text-primary duration-300"
                >
                  Get OTP
                </button>
              </>
            )
          )}
        </form>
      </div>
    </>
  );
};

export default LoginComponent;
