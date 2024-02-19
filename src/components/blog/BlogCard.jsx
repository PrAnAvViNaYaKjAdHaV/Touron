import React from "react";
import aboutusImg from "../../assets/images/about-us/about-us.jpg";
import { BiSolidCommentDots } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/blog/${blog._id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="max-w-sm rounded-xl overflow-hidden shadow-lg cursor-pointer"
    >
      <div className=" p-2">
        <img
          className="w-full h-64 rounded-lg"
          loading="lazy"
          src={blog.imageSrc}
          alt="Scenic View"
        />
      </div>
      <div className=" pt-1.5 pb-5 px-4">
        <p className=" text-primary text-sm font-medium">
          {moment(blog.updatedAt).format("Do MMM YYYY")}
        </p>
        <h1 className=" text-2xl font-bold text-stone-800">
          {blog.blogTitle.length > 25
            ? blog.blogTitle.slice(0, 25) + "..."
            : blog.blogTitle}
        </h1>
        <p className=" text-sm sm:text-base text-stone-600 mt-1.5 mb-3">
          {blog.content.length > 130
            ? blog.content.slice(0, 130) + "..."
            : blog.content}
        </p>
        <div className=" flex items-center gap-2">
          <BiSolidCommentDots className=" text-primary mt-0.5" />{" "}
          <span className=" text-sm text-stone-600">
            {" "}
            {blog.comments ? blog.comments.length : 0} Replies
          </span>
        </div>
        <div className=" flex items-center gap-5 mt-2">
          {blog.categories &&
            blog.categories.length > 0 &&
            blog.categories.map((item, index) => {
              return (
                <div key={index} className=" flex items-center gap-3">
                  <MdDone className=" text-primary" />
                  <span className=" text-sm text-stone-600">{item}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
