import React from "react";
import BlogPageComponent from "../../components/blog/BlogPageComponent";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const BlogPage = () => {
  return (
    <div>
      <Navbar />
      <BlogPageComponent />
      <Footer />
    </div>
  );
};

export default BlogPage;
