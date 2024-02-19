import React, { useState } from "react";

const ForgetPasswordComponent = () => {

  const [inputValue, setInputValue] = useState()

  const onSubmit = (e) =>{
    e.preventDefault()
    console.log(inputValue);
  }

  return (
    <div className=" flex flex-col gap-6 w-80 sm:w-96">
      <div>
        <h1 className=" text-[#181818] font-semibold text-2xl sm:text-3xl font-sf-pro-display text-center">
          Forget your password?
        </h1>
        <p className=" text-gray-3 font-noto-sans text-center text-sm sm:text-base">
          We'll send you a link to reset it. Enter your email address used for
          My Dream Place
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <label
          className=" font-noto-sans font-medium text-sm text-[#181818]"
          htmlFor="email-mobile"
        >
          Your email address
        </label>
        <input
          type="text"
          pattern="^\d{10}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          title="Enter a 10-digit phone number or a valid email address"
          className=" border border-gray-2 bg-gray-2 rounded py-1.5 px-3 focus:outline-none w-full"
          placeholder="Enter email or number"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          type="submit"
          className=" border border-primary rounded bg-primary text-white hover:bg-white hover:text-primary duration-300 font-medium font-noto-sans py-2 px-2 w-full mt-6"
        >
          Send Reset Link
        </button>
      </form>
      <div className=" text-gray-3 text-xs sm:text-sm font-noto-sans">
        By creating an account, you agree with our{" "}
        <span className=" text-primary">Terms and Conditions</span> and
        <span className=" text-primary">Privacy Statement</span>.
      </div>
    </div>
  );
};

export default ForgetPasswordComponent;
