import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import DestinationContainer from "./DestinationContainer";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../common/NotFoundPage";
import DestinationStateContainer from "./DestinationStateContainer";

const DestinationLayout = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index path="/" element={<DestinationContainer />} />
        <Route path="/states" element={<DestinationStateContainer />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default DestinationLayout;
