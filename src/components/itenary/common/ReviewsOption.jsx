import React from 'react'
import aboutusImg from "../../../assets/images/about-us/about-us.jpg";


const ReviewsOption = ({ itinery }) => {
  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="flex items-center">
            {/* Replace with actual image */}
            {/* <img className="h-10 w-10 rounded-full mr-4" src={aboutusImg} alt="Avatar" /> */}
            <div className=' border border-primary bg-primary px-3 py-1 rounded-full text-white text-xl font-bold mr-4'>{itinery?.name?.slice(0,1)}</div>
            <div className="text-sm">
              <p className="text-gray-900 text-lg font-semibold leading-none">{itinery.name}</p>
              <p className="text-gray-600">{ itinery.title }</p>
            </div>
          </div>
          {/* <blockquote className="mt-4 text-lg">
            <p className="text-gray-500">“Exceptional”</p>
          </blockquote> */}
          <p className="mt-2 text-gray-500">
            {itinery.comment}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewsOption