import React, { useEffect, useState } from "react";
import TeamMember from "./TeamMember";
import axios from "axios";
// import { teamMembers } from "../../data/about-us/aboutusData";

const TeamContainer = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/api/teammembers/`)
    .then((res)=>{
      setTeamMembers(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div className="bg-white text-gray-900 my-12" id="team">
      <h2 className="text-4xl font-bold text-center text-stone-800">Our Team</h2>
      <p className="text-center text-base sm:text-lg mb-6 text-stone-600">
      tourOn consists of a close knit team of dedicated individuals, all working hard to put together your perfect holiday. Say Hello to the Team!
      </p>
      <div className=" flex gap-6 items-center flex-wrap xl:px-20 justify-center">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamContainer;
