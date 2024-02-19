import React, { useState } from "react";

const ImageSliderItenary = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className=" grid sm:grid-cols-[1fr_160px] gap-4 items-center">
      <div className="relative flex items-center justify-center">
        <button onClick={prevSlide} className="absolute left-0 z-10">
          <span className="carousel-arrow">{"<"}</span>
        </button>

        {images.map((image, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img
                  src={image}
                  alt="Travel Destination"
                  className="w-96 md:w-96 lg:w-[800px] xl:w-[1200px] h-[600px] object-cover"
                />
              )}
            </div>
          );
        })}

        <button onClick={nextSlide} className="absolute right-0 z-10">
          <span className="carousel-arrow">{">"}</span>
        </button>

        <div className="absolute bottom-0 mb-2">
          <span className="p-2 bg-white rounded-full shadow-lg">
            {`${current + 1} / ${length}`}
          </span>
        </div>
      </div>
      <div className=" grid grid-cols-5 sm:grid-cols-1 gap-2 h-full">
        {images.map((image, index) => {
          return (
            <div
              onClick={() => setCurrent(index)}
              className="w-full h-fit rounded-md overflow-hidden"
              key={index}
            >
              <img
                src={image}
                alt="Travel Destination"
                className="w-full h-20 rounded-md "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSliderItenary;
