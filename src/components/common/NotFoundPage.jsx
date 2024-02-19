import React from "react";
import notFoundImg from "../../assets/images/common/error-bg.svg";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate()
    const handleNavigate = () =>{
        navigate("/")
    }
  return (
    <div className=" grid sm:grid-cols-2 items-center justify-center h-screen bg-gray-100">
      <div className=" px-8 sm:px-12 md:px-20">
        <h1 className=" font-bold text-primary">404 Error</h1>
        <p className="text-5xl font-semibold text-gray-600 mt-2">Page not found</p>
        <p className="mt-4 text-gray-500">
          Sorry but the page you are looking for has been removed or had its
          name changed. Please try your search again!
        </p>

        <div className="mt-6">
          <button onClick={handleNavigate} className=" bg-primary py-2 px-4 rounded text-white font-medium hover:opacity-80">Back to Home</button>
        </div>
      </div>

      <div className="absolute top-0 bottom-0 right-0 w-1/2 hidden sm:flex items-center">
        <img src={notFoundImg} alt="" />
      </div>
    </div>
  );
};

export default NotFoundPage;
