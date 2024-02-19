import React, { useEffect, useState } from "react";
import Testomonial from "./Testomonial";
import avatar from "../../assets/images/home/avatar-1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../index.css";
import { Pagination } from "swiper/modules";
import axios from "axios";

const TestomonialContainer = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [screenWidth, setScreenWidth] = useState();
  const screenWidthFunc = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/testimonials/`)
      .then((res) => {
        setTestimonials(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", screenWidthFunc);
    return () => {
      window.removeEventListener("resize", screenWidthFunc);
    };
  }, []);

  return (
    <div className=" py-10 pl-0 px-3 sm:px-6 md:px-8 lg:pt-16 lg:pb-3">
      <div className=" text-center">
        <h1 className=" text-[#181818] text-3xl font-medium font-josefin-sans mb-1.5">
          CELEBRITY TRAVELERS
        </h1>
        <p className=" inline md:block font-noto-sans text-[#181818]">
          Here's our pick of Celebrity explorers who choose us for their fantasy
          excursion will{" "}
        </p>
        <p className=" inline md:block font-noto-sans text-[#181818]">
          inspire you and push you to pack your backs and hit the street..!
        </p>
      </div>

      <div className=" flex items-center justify-center gap-6 overflow-x-auto py-0 md:py-5 lg:py-10 h-[300px] md:h-[400px]">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={0}
          direction={`${screenWidth > 1170 ? "horizontal" : "vertical"}`}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <Testomonial item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestomonialContainer;
