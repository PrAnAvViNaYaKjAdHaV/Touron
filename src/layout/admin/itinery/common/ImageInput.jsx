// ImageInput.js
import React from "react";

const ImageInput = ({ handleImage, fieldName, formData, popupmode }) => {
  return (
    <div className=" mt-2">
      <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-2">
        <div className="text-center">
          {formData === "" || formData == null ? (
            "No Image"
          ) : (
            <img
              className="mx-auto h-24 w-44 object-cover"
              src={formData}
              alt="Image"
            />
          )}
          <div className="flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={fieldName}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id={fieldName}
                name={fieldName}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => handleImage(e, fieldName)}
                readOnly={popupmode === "view" ? true : false}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
