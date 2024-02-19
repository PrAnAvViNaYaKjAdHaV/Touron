import React from "react";
import { Route, Routes } from "react-router-dom";
import Destination from "./Destination";
import ArrivalStation from "./ArrivalStation";
import TravelWith from "./TravelWith";
import DateAndItenary from "./DateAndItenary";
import QuerySubmission from "./QuerySubmission";
import NotFoundPage from "../common/NotFoundPage";
import TravelType from "./TravelType";
import { useSelector } from "react-redux";
import { selectTravelType } from "../../redux/features/customize/customizeSlice";
import City from "./City";
import NearestBranch from "./NearestBranch";

const CustomizeBody = () => {
  const travelType = useSelector(selectTravelType);
  return (
    <div>
      <Routes>
        <Route index path="/" element={<TravelType />} />
        {/* <Route path="/destination" element={<Destination />} /> */}
        {/* {travelType === "Domestic" && <Route path="/city" element={<City />} />} */}
        <Route path="/travel-with" element={<TravelWith />} />
        <Route path="/Departure-station" element={<ArrivalStation />} />
        <Route path="/date-itenary" element={<DateAndItenary />} />
        {/* <Route path="/nearest-branch" element={<NearestBranch />} /> */}
        <Route path="/query-submission" element={<QuerySubmission />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default CustomizeBody;
