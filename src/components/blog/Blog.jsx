import React, { useEffect, useState } from "react";
import BlogCard from "../../components/blog/BlogCard";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 18;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/blogs/getblogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Determine the range of page numbers to display
  let displayPageNumbers;
  if (currentPage + 3 >= totalPages) {
    displayPageNumbers = Array.from(
      { length: totalPages - currentPage + 1 },
      (_, i) => i + currentPage
    );
  } else {
    displayPageNumbers = Array.from({ length: 3 }, (_, i) => i + currentPage);
  }

  // Function to render page numbers with dots
  const renderPageNumbers = () => {
    const renderedPageNumbers = displayPageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => paginate(number)}
        className={`px-3 py-1 bg-gray-200 text-gray-600 rounded mr-2 ${
          currentPage === number ? "font-bold" : ""
        }`}
      >
        {number}
      </button>
    ));

    if (totalPages > currentPage + 3) {
      renderedPageNumbers.push(
        <span key="dot" className="px-3 py-1 text-gray-600">
          ...
        </span>
      );
    }

    return renderedPageNumbers;
  };

  // Calculate index of the first blog for the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" px-4 sm:px-6 py-8">
      <div className=" text-center ">
        <h1 className="text-4xl text-stone-800 font-semibold mb-1">
          Latest blogs
        </h1>
        <p className=" text-stone-600">
          Read about your favorite destinations, and get to know about the
          latest trends in tourism from our Blog... <br />
          New articles everyday!
        </p>
      </div>
      <div className=" py-10 flex items-center justify-center gap-3 flex-wrap">
        {currentBlogs.map((item, index) => {
          return <BlogCard key={index} blog={item} />;
        })}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-gray-600 rounded mr-2"
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentBlogs.length < blogsPerPage}
          className="px-3 py-1 bg-gray-200 text-gray-600 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;
