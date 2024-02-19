import { Avatar, Box, styled } from "@mui/material";
import { DoneAll } from "@mui/icons-material";
import { formatDistanceToNowStrict } from "date-fns"; // CUSTOM COMPONENTS

// import { Paragraph, Small, Span } from "../../../minicomponents/typography";
import { FlexBetween, FlexBox, FlexRowAlign } from "../../../minicomponents/flexbox"; // STYLED COMPONENT

const Wrapper = styled(FlexBox)(({
  theme
}) => ({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.selected
  }
})); 


const ChatItem = props => {
  const {
    name,
    time,
    image,
    lastMsg,
    unseenMsg,
    lastMsgSeen,
    isLastMsgIncoming
  } = props;
  return <Wrapper gap={1.5} p={2}>
      <Avatar src={image} />

      <Box flexGrow={1}>
        <FlexBetween>
          {/* <Paragraph fontWeight={500}>{name}</Paragraph> */}
          <p className=" font-medium">{name}</p>
          {/* <Paragraph fontSize={12} color="text.secondary"> */}
            {/* {formatDistanceToNowStrict(new Date(time))} ago */}
          {/* </Paragraph> */}
          {/* <p className=" text-sm text-stone-800">{formatDistanceToNowStrict(new Date(time))} ago</p> */}
        </FlexBetween>

        <FlexBetween mt={0.5}>
          {/* <Paragraph fontSize={12} color="text.secondary">
            {!isLastMsgIncoming && <Span color="text.primary">You: </Span>}
            {lastMsg}
          </Paragraph> */}
          <p className=" text-sm text-stone-700">
            {!isLastMsgIncoming && <span className=" text-stone-800 font-medium">You: </span>}
            {lastMsg}
          </p>

          {unseenMsg ? <FlexRowAlign sx={{
          width: 18,
          height: 18,
          color: "white",
          borderRadius: "50%",
          backgroundColor: "primary.main"
        }}>
              {/* <Small fontWeight={500}>{unseenMsg}</Small> */}
              <p className=" text-xs font-medium">{unseenMsg}</p>
            </FlexRowAlign> : <DoneAll sx={{
          fontSize: 18,
          color: lastMsgSeen ? "primary.main" : "grey.400"
        }} />}
        </FlexBetween>
      </Box>
    </Wrapper>;
};

export default ChatItem;