import React, { useState } from "react";
import { FaHandPaper, FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";

const ContactContainer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission, like sending data to a server
    console.log(formData);
  };
  return (
    <div>
      <div className=" bg-primary text-white text-center py-8">
        <h1 className=" text-3xl font-semibold">Contact us</h1>
        <p>Get in touch via phone, email or fill in the form below</p>
      </div>
      <div className=" grid sm:grid-cols-2 items-center gap-5 md:gap-12 px-5 sm:px-10 md:px-12 lg:px-28 py-10">
        <div className="bg-white p-8 rounded-lg w-full">
          <div className=" flex gap-2 mb-4">
            <div className=" bg-slate-200 px-4 rounded flex items-center">
              <FaHandPaper className=" text-2xl text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary">
                Hi, we're happy to help you!
              </h2>
              <p className="text-gray-600">
                Please enter details so we can reach out to you
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className=" flex flex-col gap-6">
          <div className=" flex flex-col gap-3">
            <div className=" flex items-center gap-2 bg-white shadow-md w-80 rounded-md px-3 py-2">
              <div className=" bg-slate-200 p-4 rounded flex items-center">
                <FaMobileAlt className=" text-2xl text-primary" />
              </div>
              <div>
                <h2 className=" text-sm font-medium text-stone-500">Phone</h2>
                <p className=" text-stone-700">123456789</p>
              </div>
            </div>
            <div className=" flex items-center gap-2 bg-white shadow-md w-80 rounded-md px-3 py-2">
              <div className=" bg-slate-200 p-4 rounded flex items-center">
                <MdEmail className=" text-2xl text-primary" />
              </div>
              <div>
                <h2 className=" text-sm font-medium text-stone-500">Email</h2>
                <p className=" text-stone-700">hello@touron.in</p>
              </div>
            </div>
            <div className=" flex gap-2 bg-white shadow-md w-80 rounded-md px-3 py-2">
              <div className=" bg-slate-200 p-4 rounded flex items-center h-fit">
                <FaAddressBook className=" text-2xl text-primary" />
              </div>
              <div>
                <h2 className=" text-sm font-medium text-stone-500">Address</h2>
                <p className=" text-stone-700">
                  Anna nagar, tour On Holidays,The Hive,Level 3 VR Mall, Next to
                  Madras House(Landmark), Thirumangalam, Chennai-40
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
