import React from "react";
import TimelineContent from "@mui/lab/TimelineContent";

const TimelineContentCustomize = ({ morning, afternoon, evening, night }) => {
  return (
      <TimelineContent>
        <div className={` flex flex-col gap-2 ${morning && afternoon && evening && night ? "pb-10" : "py-5"} `}>
          {morning && (
            <div>
              <h1 className=" font-medium text-stone-500">Morning</h1>
              <p className=" pl-5 text-stone-800">{morning}</p>
            </div>
          )}
          {afternoon && (
            <div>
              <h1 className=" font-medium text-stone-500">Afternoon</h1>
              <p className=" pl-5 text-stone-800">{afternoon}</p>
            </div>
          )}
          {evening && (
            <div>
              <h1 className=" font-medium text-stone-500">Evening</h1>
              <p className=" pl-5 text-stone-800">{evening}</p>
            </div>
          )}
          {night && (
            <div>
              <h1 className=" font-medium text-stone-500">Night</h1>
              <p className=" pl-5 text-stone-800">{night}</p>
            </div>
          )}
        </div>
      </TimelineContent>
  );
};

export default TimelineContentCustomize;
