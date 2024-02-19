import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import TermsConditionContainer from "../../components/legals/TermsConditionContainer";

const TermsCondition = () => {
  return (
    <div>
      <Navbar />
      <TermsConditionContainer />
      <Footer />
    </div>
  );
};

export default TermsCondition;
