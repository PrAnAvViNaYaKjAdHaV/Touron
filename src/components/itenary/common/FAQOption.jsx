import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQOption = ({ countryData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="space-y-2 pt-12" id="faq">
      <h1 className=" font-semibold text-stone-800 text-xl mb-3">FAQ</h1>
      {countryData?.faq?.map((faq, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg hover:bg-white duration-300 bg-stone-50"
        >
          <div
            className="flex justify-between items-center cursor-pointer text-stone-800"
            onClick={() => toggleFAQ(index)}
          >
            <h5 className="text-lg font-semibold">{faq.question}</h5>
            <button>
              <span>
                <FaChevronDown
                  className={`${
                    activeIndex === index ? " rotate-180" : ""
                  } duration-300 `}
                />
              </span>
            </button>
          </div>
          <div
            className={activeIndex === index ? "mt-2 text-gray-700" : "hidden"}
          >
            {faq.answer}
          </div>
        </div>
      ))}
      {/* {countryData?.faq.length > 3 && (
        <button className="text-stone-600 hover:text-stone-800 pt-3">
          Show 10+ more FAQ's
        </button>
      )} */}
    </div>
  );
};

export default FAQOption;
