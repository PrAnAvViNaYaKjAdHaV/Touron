import React from "react";
import AboutusInfo from "./AboutusInfo";
import TeamContainer from "./TeamContainer";
import AboutCEO from "./AboutCEO";
import InviteTeamMembers from "./InviteTeamMembers";

const AboutusContainer = () => {
  return (
    <div className=" px-2">
      <AboutusInfo />
      <AboutCEO />
      <TeamContainer />
      {/* <InviteTeamMembers /> */}
    </div>
  );
};

export default AboutusContainer;
