import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    mobileNumber: "",
    email: "",
    otp: "",
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState();
  const [otpVerified, setOTPVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userString = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    try {
      setFormData(userString);
    } catch (error) {
      console.error("Error parsing user JSON:", error);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (showOTP === false) {
      if (formData.mobileNumber?.length === 10) {
        axios
          .post(`${import.meta.env.VITE_API_URL}/api/login/send-otp`, formData)
          .then((res) => {
            if (res.data.message === "OTP sent successfully") {
              setShowOTP(true);
              toast.success("OTP sent successfully");
            }
          });
      } else {
        toast.error("Enter a valid mobile number");
      }
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/login/verify-otp`, {
          otp,
          mobileNumber: formData.mobileNumber,
        })
        .then((res) => {
          if (res.data.message === "OTP verified") {
            setOTPVerified(true);
            toast.success("OTP verified successfully");
            axios
              .post(
                `${import.meta.env.VITE_API_URL}/api/login/update/${
                  formData._id
                }`,
                formData
              )
              .then((res) => {
                console.log(res);
                sessionStorage.setItem("userToken", res.data.token);
                sessionStorage.setItem("admin", res.data.admin);
                sessionStorage.setItem("user", JSON.stringify(res.data));
                toast.success("Credentials updated successfully");

                setShowOTP(false);
                setOtp();
                setOTPVerified(false);
              });
          } else {
            toast.error("OTP verification failed");
            setOTPVerified(false);
          }
        });
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen px-3 ">
      <div className=" grid lg:grid-cols-2 justify-center gap-3 xl:gap-10 lg:mb-20">
        <div className=" order-2 lg:order-1 flex justify-center">
          <form
            onSubmit={onSubmit}
            className=" flex flex-col gap-3 w-full sm:w-[400px] md:w-[500px] shadow-sm bg-white rounded-md px-3 sm:px-10 pt-6 pb-8"
          >
            <h1 className=" text-3xl font-semibold text-stone-800">Add user</h1>
            <div className=" flex flex-col gap-2 w-full">
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Username
                </label>
                <input
                  className=" border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Mobile no
                </label>
                <input
                  className=" border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile number"
                  onChange={handleChange}
                  value={formData.mobileNumber}
                />
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Email
                </label>
                <input
                  className=" border border-stone-500 rounded-md py-2 px-3"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              {/* <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Image
                </label>
                <input
                  className=" border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="image"
                  placeholder="Image Url"
                  // onChange={handleChange}
                  // value={formData.mobileNumber}
                />
              </div> */}
              {showOTP && (
                <div className=" flex flex-col gap-1">
                  <label className=" text-sm font-medium text-stone-800">
                    OTP
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="otp"
                    placeholder="Enter the OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    required
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className=" rounded py-1.5 px-2 font-semibold text-white bg-primary"
            >
              Update User
            </button>
          </form>
        </div>
        <div className=" order-1 lg:order-2 flex justify-center">
          <div className="flex flex-col items-center justify-center gap-8 shadow-sm bg-white rounded-md px-3 sm:py-6 w-full sm:w-[400px] md:w-[500px]">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEUKME7///+El6bw8vQZPVlHZHpmfpHCy9Ojsbzg5ekpSmTR2N44V29XcYayvsd2i5yTpLFbvRYnAAAJcklEQVR4nO2d17arOgxFs+kkofz/154Qmg0uKsuQccddT/vhnOCJLclFMo+//4gedzcApf9B4srrusk+GsqPpj+ypq7zVE9LAdLWWVU+Hx69y2FMwAMGyfusLHwIpooyw9IAQfK+8naDp3OGHvZ0FMhrfPMgVnVjC2kABOQ1MLvi0DEIFj1ILu0LU2WjNRgtSF3pKb4qqtd9IHmjGlJHlc09IHlGcrQcPeUjTAySAGNSkQlRhCCJMGaUC0HSYUx6SmxFAtJDTdylsr4ApC1TY0yquKbCBkk7qnYVzPHFBHkBojhVJWviwgPJrsP4qBgTgbQXdsesjm4pDJDmIuswVZDdFx0ENTtkihoeqSDXD6tVxOFFBHndMKxWvUnzexpIcx/Gg2goJJDhVo6PCMGRAnKTmZuKm3wcJO/upphUqUHy29yVrRhJDORXOKIkEZDf4YiRhEF+iSNCEgb5KY4wSRDkB/yurUEG8nMcocgYABnvbrVL3nMIP0h/d5udKnwzSC/InfPdkJ6eWb0PJE++dyVVyQP5iQmWW27X5QG5druEKafBu0Hqu9saVOHa8HKC/K6BzHKZiRMEZCDF0Nd1/ZfXI/fcOibHOssFgokg9uFA20BhztHEAZIjIohrD/o1wljeFBDEwBo8YUt5Ir/rNLjOIACPFdy/AbEcPdcJBOCxytjeYAM4Kzp6rhOIPhRGNzwmFP3rOoTFI0irtnQKx6fj1Zt+h9njEUS9mKJxfFRrX5lt7wcQtaWTOfTHeIXVJQcQrRW+OYex2j0a66XZINoO8a7fPH2iHF2mC7ZBtB3Czb5QvjizSx7A3308mRzqAwujSywQbYfwc0iU8zqjS0yQ6ztEHX9332KCaGNIYB/Qq1z3yN0oDZBWyeFYJBCkm2sXLhDtpKFwNDMu5TnrZpYGiHbK4Nlwikg5DrYV1g6iPoJmzE5MKd/fOp53EPUaQZaLqH3u+vo2ELWp3wSyWuYGoj9EEIJoV3L9AUS/ZLsJpLNBXmqOu0CW6P5A/dx9IL0FAji/FYKot9EqE0Tvs6QBUe/2CxMEkZAlBNGPhdoAQWyTSmbxUwvUygwQyMmniAPgLt87CODXHuftWJIQgzrfQDC5AfwSgz9MmmG/gWCOqDgZ4JsQeTvZBoJJDhAFEsSDyxUEEUUekk0UEMhjBcEcGsoWVpBU3NcCgkkPkJWrKbdRZvULCMTWhYEdMrayBQRyqHcnSLmAIH7LcWJ8Hch7BsHEdWFpJsZjziCgFBpZ9TPm4e0XBJTTJKt9xjy8RoLI4gimPLP5goCSgWTrEcyzsy8IqmZVMo0H5bJiQToBCOjZ5RcElhjLN3dU7uQMAvoxwQkJZKI1CQzCthJYEigahHuDDi4rFwzCPQ7F1fiDQZgTR5iJwEGYRgIsiECD8BwwMAEfDcIaW8CRBQdhjS1kJQEchDEFhiRKr4KDFPS9FGQNVwEHoW83QjsEHdkfnuIOl6C1NjMItiaCaCWgbdpFJXQ9soh2uoB9aJcCxFdgZwlcrTmvENGlrITBBdpK25Qhd1F2RScq8CKu/gsCL8qN5THjy+Rr5E6joYgPxpdl518QrCf8Kpgjn6C8HLkbb+vt7ZM8wdVvy258khsRfHaS5DalDnlidZT7Erk+SXV5Bj1D3LS29XyhVJuoKHs9Q8S6reK11oUc7vPcr9uswP3SLiDINefXOF5rwCuGzVT6zVkVPfh2wWmHcz4wAwba2cgN1/Tsvleu7//i69CgVyt1GwjOs2+XK3rtbl151Tg3vOeioG40Mz2V+6pQ4xbJHOZj6g0EMxk93tV7fuedvVZpQSPhbwNBGInrymGrwNh1GXmL8F+lAaJ+NU/fzcmvJqvKj7177+1v1GY/GiBKI1Fdy/2XK6upXwaIJpI8B/399W0mH9zzafKaeCF9J0WF+jyCuFusTGzZKhFH8dVLZql2brxgcdVBKb7KG/7UZTmB3XJ6uL/QYT5ScRI74FcHEJ7feopyfGkaeaGlPoCw/BbjZmSBWIvINQNmTxdjWJqwUI8sztR4nYPuIPSTSUnOCZOE3ierqRoJfNSQxDjLEYs8i91eqgFCDSWiFHiuqAN9CwEGCPEISVjvwhS7Mfx6dtX8kC5aqvneGBOEFN2v6RBiYwr3DQOkLhEW6fHFbIwFQnkLiWYmZxE220z/aedPx99C+hiyKR4OzNFhg8S75CJTnxQ1dyugHTLaY10iu9dBpmhQtMz1ABLrkgtHVnRsPUO3OcU25i8cWdGxZbflCBKJqBdMs3aF/dYhNexU9RFcYEmLXYQKghyWdufyldBSU3KpjkKhZclxTXQGCTkL/HZDUIH5+Gkt4SgoCtj7pSYSNJLTK3VVRnmXZxebSMBIzmHABeIdXBebiN9eHYtUZ62ab3BdGkUm+SKJw1bdRXeewaX7qqdAnljg2sVxg3guAk3baofcg9yZ2eZpnHNvSFrEqhB9YPjesmt0pt6Xc8hl7W5L9Q4Xx09ctsrd5VhWeF6nF8SRrZdw49qns//0xTK/AZ8vGr3caTliuzeFNeCJTgafpKlhHd2WP1sy1LqDF798gjKJPLqDr9keoTd43+NyNzC1CI8Xy2lcPtOaVBI5IiAWyQ3e125AcKoXs2Djhy5eVc3KiBxREIPkhjBiLhIjU++4T91IbggjRiCJLSEIwWGddkEaxlVN5KCArPHk8mXVpHk8FHH7JL3n5dPA7C90q7XkeFJucacNmGXeRfswLE71HA79efaGiCN/Ofjmfmtcp8X10tIsqCacV5xfRWjNUiXGYbovWgyFYHcQLak15K9oM5zqmgaeKsHJetbSHfSPzXOiw/rxE9YH4CXaUpsZ0ztemFurP95Jpyvrd29YTpIZr7cEJHqfc7Wl0PFm2+yJR70udaokKFtGPTdm8WdQe24+HmVLlueboWQquBcYYVH2vEzfh8kCks1p90eWsLCyZ8qK7E86Oe+3XYFnBuiWdth20UqZR5SvMoyPg3WNauJipi0LMTQgVq5xUUlZcrPsopPHJ926z8pm7xyFLrH/PxpHSoXKdWgXsLn1scZn1ZDd/2vszN3lt254qkE+qu3yoqLM+ghN3Qz2qcVzUC/ZMFsK/alU6l0OWV/bQz6v6yYbyuN5BaZ4A7Y30vs/PPksS2+qzlvfF7OQmzzcL7W+xa7OIfRuVdtn/tdvdFLnL4OTKcm2W16PmWc4FWWXNSlWM2n3D+uPxuyrcfo74aP+Ac30a82+oLmfAAAAAElFTkSuQmCC"
              alt=""
              className=" h-[110px] w-[110px] rounded-full shadow-md object-cover"
            />
            <div className=" flex flex-col items-center justify-center font-medium">
              <h1 className=" text-2xl text-stone-700 font-bold">
                {formData.username}
              </h1>
              <h2 className=" text-stone-700">{formData.email}</h2>
              <p className=" text-stone-500 mt-1.5 text-sm text-center">
                Your tour adventure, your way. Manage bookings, explore upcoming
                trips, and unlock exclusive perks—all in one place. Your
                profile, your key to personalized travel experiences. Let the
                journey begin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
