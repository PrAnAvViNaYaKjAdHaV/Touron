import { Avatar, Box } from "@mui/material"; // CUSTOM COMPONENTS

import FlexBox from "../../../minicomponents/flexbox/FlexBox";
// import { Paragraph, Span } from "../../../minicomponents/typography";

const OutgoingMsg = () => {
  return (
    <Box
      maxWidth={{
        md: "60%",
        sm: "70%",
        xs: "80%",
      }}
      alignSelf="end"
    >
      <FlexBox justifyContent="end" alignItems="center" mb={1} gap={1.5}>
        {/* <Paragraph fontWeight={600} lineHeight={1}>
          <Span ml={0.5} fontSize={12} fontWeight={400} color="text.secondary">
            11:29 AM
          </Span>{" "}
          You
        </Paragraph> */}

        <p className=" font-semibold">
          <span className=" ml-0.5 text-sm text-stone-700">11: 29 AM</span>
          You{" "}
        </p>
        <Avatar
          src="/static/user/user-11.png"
          sx={{
            width: 27,
            height: 27,
          }}
        />
      </FlexBox>

      <Box
        sx={{
          fontSize: 14,
          marginLeft: 5,
          color: "white",
          textAlign: "right",
          padding: "1rem 1.5rem",
          backgroundColor: "primary.main",
          borderRadius: "0px 1rem 1rem 1rem",
        }}
      >
        Sure! Ready to help.
      </Box>
    </Box>
  );
};

export default OutgoingMsg;
