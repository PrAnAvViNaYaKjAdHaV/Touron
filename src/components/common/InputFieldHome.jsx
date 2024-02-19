import React from "react";

const InputFieldHome = ({
  placeholder,
  type,
  image,
  customStyles,
  customStylesInput,
  required,
  name,
  formData,
  setFormData,
}) => {
  console.log(formData);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div
      className={` flex justify-start items-center gap-2 border border-gray-2 rounded bg-gray-2 py-2 pl-[11px] overflow-x-hidden pr-3 h-fit w-full ${customStyles} `}
    >
      {image && <img src={image} alt="" />}
      <input
        className={` border-none  placeholder:text-gray-3 focus:outline-none text-gray-3 bg-gray-2 min-w-[50px] w-full ${customStylesInput} `}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
        value={formData[name]}
      />
    </div>
  );
};

export default InputFieldHome;
