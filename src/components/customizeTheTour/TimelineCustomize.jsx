import React, { useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineContentCustomize from "./TimelineContentCustomize";

const TimelineCustomize = ({ tourPlan }) => {
  useEffect(() => {
    console.log(tourPlan);
  }, [tourPlan]);
  return (
    <div className=" flex items-center justify-center ">
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {Array.isArray(tourPlan?.days) &&
          tourPlan?.days.map((item, index) => {
            return (
              <>
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    Day {index + 1}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent></TimelineOppositeContent>
                  <TimelineSeparator className=" ml-1">
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContentCustomize
                    morning={item.morning && item.morning}
                    afternoon={item.afternoon && item.afternoon}
                    evening={item.evening && item.evening}
                    night={item.night && item.night}
                  />
                </TimelineItem>
              </>
            );
          })}

        {/* <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            Day 2
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>

        <TimelineItem className=" -mt-8">
          <TimelineOppositeContent ></TimelineOppositeContent>
          <TimelineSeparator className=" ml-1">
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContentCustomize
            morning={`Arrival and Evening at Burj Khalifa`}
            evening={`Visit Burj Khalifa's observation deck at the sunset to see the city's skyline`}
            night={`Explore Dubai Mall and Witness the Dubai Fountain show.`}
          />
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            Day 3
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem> */}
      </Timeline>
    </div>
  );
};

export default TimelineCustomize;
