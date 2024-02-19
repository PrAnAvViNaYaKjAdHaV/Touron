import React, { useEffect, useRef, useState } from "react";
import aboutusImg from "../../assets/images/about-us/about-us.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import RecentBlogCard from "./RecentBlogCard";

const BlogPageComponent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState(""); // Holds the new comment

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if page is scrolled more than a certain amount (e.g., 100px)
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const blogResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs/${id}`
        );
        setBlog(blogResponse.data);
        const allBlogsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs/getblogs/10`
        );
        setAllBlogs(allBlogsResponse.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/updatecomment/${id}`,
        {
          newComment: comment,
        }
      );
      setBlog({ ...blog, comments: [...blog.comments, comment] });
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" relative lg:px-4 xl:px-10 py-8 grid md:grid-cols-3 xl:gap-12 ">
      <div className=" md:col-span-2 px-4 sm:px-8 xl:px-16">
        <div className=" text-center">
          <h1 className=" mt-2 mb-1 text-4xl font-bold">{blog.blogTitle}</h1>
          <h3 className=" text-primary font-medium text-sm mb-4">
            {moment(blog.updatedAt).format("Do MMM YYYY")}
          </h3>
          <div className=" py-6">
            <img
              src={blog.imageSrc}
              className=" w-full rounded max-h-[400px] object-cover"
              alt="Blog Image"
            />
          </div>
        </div>
        <p className=" text-stone-600 text-justify text-xl">
          {blog.content?.replace(/<\/?p>/g, "")}
        </p>
        <div className=" flex flex-col gap-10 text-stone-600 py-10">
          <div>
            <h1 className=" text-3xl font-semibold text-stone-800">
              {blog.subHeading1}
            </h1>
            {blog.imageSrc1 && (
              <img
                src={blog.imageSrc1}
                className=" w-full rounded-xl my-5  max-h-[500px] object-cover"
                alt="Blog Image"
              />
            )}
            <p className=" mt-3 text-stone-600 text-justify text-xl">
              {blog.content1?.replace(/<\/?p>/g, "")}
            </p>
          </div>
          <div>
            <h1 className=" text-3xl font-semibold text-stone-800">
              {blog.subHeading2}
            </h1>
            {blog.imageSrc2 && (
              <img
                src={blog.imageSrc2}
                className=" w-full rounded-xl my-5  max-h-[500px] object-cover"
                alt="Blog Image"
              />
            )}
            <p className=" mt-3 text-stone-600 text-justify text-xl">
              {blog.content2?.replace(/<\/?p>/g, "")}
            </p>
          </div>
          <div>
            <h1 className=" text-3xl font-semibold text-stone-800">
              {blog.subHeading3}
            </h1>
            {blog.imageSrc3 && (
              <img
                src={blog.imageSrc3}
                className=" w-full rounded-xl my-5  max-h-[500px] object-cover"
                alt="Blog Image"
              />
            )}
            <p className=" mt-3 text-stone-600 text-justify text-xl">
              {blog.content3?.replace(/<\/?p>/g, "")}
            </p>
          </div>
          <div>
            <img
              src={aboutusImg}
              className=" w-full max-h-[300px] rounded-md object-cover"
              alt=""
            />
          </div>
          <div className=" my-10">
            <h1 className=" font-semibold text-xl text-stone-900">
              Things to note
            </h1>
            <div className=" text-stone-700 ml-4 mt-2 text-lg">
              <div>
                <span className=" font-semibold">Country name:</span>{" "}
                <span className=" ml-2 text-base">{blog.countryName}</span>
              </div>
              <div>
                <span className=" font-semibold">City name:</span>{" "}
                <span className=" ml-2 text-base">
                  {blog.cityName &&
                    blog.cityName.map((item, index) => {
                      return <span key={index}>{item}</span>;
                    })}
                </span>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-[1fr_150px] items-center gap-3">
            <input
              type="text"
              placeholder="Enter the comments"
              value={comment}
              onChange={handleChange}
              className=" border border-stone-500 rounded-md py-2 px-3 w-full"
            />
            <button
              onClick={handleAddComment}
              className=" bg-primary py-2 px-4 font-medium text-white rounded"
            >
              Add comment
            </button>
          </div>
        </div>
      </div>
      <div className=" py-5 px-6 md:px-0">
        <h1 className=" text-4xl font-semibold text-stone-800">Recent blogs</h1>
        <div className=" flex flex-col gap-5 pt-5 ">
          {allBlogs.map((item, index) => {
            return <RecentBlogCard key={item._id} blog={item} />;
          })}
        </div>
      </div>

      {showButton && (
        <div
          className={` fixed bottom-5 left-2 right-2  items-center justify-center font-noto-sans  z-50`}
        >
          <div className=" flex justify-center">
            <div className="grid grid-cols-3 items-start justify-center w-fit">
              <div className=" col-span-2 bg-[#D9D9D9] text-stone-900 text-lg font-medium py-2 px-2 sm:px-4 rounded-l-2xl">
                Create my itinerary
              </div>
              <a
                href="/customize/"
                className=" bg-[#125EBA] text-lg py-2 px-2 sm:px-4 font-semibold text-stone-100 rounded-r-2xl"
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPageComponent;
