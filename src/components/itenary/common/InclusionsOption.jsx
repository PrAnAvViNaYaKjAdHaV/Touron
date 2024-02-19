import React from "react";

const InclusionsOption = ({countryData}) => {

  return (
    <div className=" flex flex-col gap-4 text-stone-800 font-noto-sans pt-10" id="inclusions">
      <h1 className=" font-semibold text-stone-800 text-xl mb-1">Inclusion option</h1>
      <p>{countryData.inclusion}</p>
    </div>
  );
};

export default InclusionsOption;
