import React from "react";
import Blog from "../../components/blog/Blog"
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const Blogs = () => {
  return (
    <div>
      <Navbar />
        <Blog />
      <Footer />
    </div>
  );
};

export default Blogs;
