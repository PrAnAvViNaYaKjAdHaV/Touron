import React from "react";
import CustomizeBody from "./CustomizeBody";
import SidebarCustomize from "./common/SidebarCustomize";
import TopbarCustomize from "./common/TopbarCustomize";

const CustomizeContainer = () => {
  return (
    <div className=" ">
      <TopbarCustomize />
      <SidebarCustomize />
      <div>
        <CustomizeBody />
      </div>
    </div>
  );
};

export default CustomizeContainer;
