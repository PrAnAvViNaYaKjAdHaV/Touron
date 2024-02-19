import React from "react";
import aboutusImg from "../../assets/images/about-us/about-us.jpg";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RecentBlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const handleNavigation = (e) => {
    e.preventDefault();
    navigate(`/blog/${blog._id}`);
  };
  return (
    <div
      onClick={handleNavigation}
      className="group flex gap-6 md:gap-2 md:grid md:grid-cols-3 items-center cursor-pointer w-full"
    >
      <div className=" overflow-hidden w-fit h-fit flex items-center justify-center rounded">
        <img
          className="group-hover:scale-110 duration-300 w-36 h-24 rounded object-cover"
          src={blog.imageSrc ? blog.imageSrc : aboutusImg}
          alt={"blog image"}
        />
      </div>
      <div className=" col-span-2 flex flex-col gap-2">
        <div>
          <h1 className=" font-semibold text-stone-800 text-xl">
            {blog.blogTitle.length > 34
              ? `${blog.blogTitle.slice(0, 34)}...`
              : blog.blogTitle}
          </h1>
          <p className=" text-xs font-medium text-primary">
            {moment(blog.createdAt).format("Do MMM YYYY")}
          </p>
        </div>
        <p className=" text-sm text-stone-600">
          {blog.content.length > 80
            ? `${blog.content.slice(0, 80)}...`.replace(/<\/?p>/g, "")
            : blog.content.replace(/<\/?p>/g, "")}
        </p>
      </div>
    </div>
  );
};

export default RecentBlogCard;
