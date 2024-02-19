import Box from "@mui/material/Box"; // CUSTOM ICON COMPONENT

// import PushPin from "@/icons/PushPin"; // CUSTOM COMPONENTS
import { AiFillPushpin } from "react-icons/ai";

import ChatItem from "./ChatItem";
import { FlexBox } from "../../../minicomponents/flexbox";
import { Scrollbar } from "../../../minicomponents/scrollbar";
// import { Paragraph } from "../../../minicomponents/typography"; // CUSTOM DUMMY DATA

import { RECENT_CHATS } from "../../../data/__fakeData__/chats";

const AllMessages = () => {
  return <Box mt={3}>
      <FlexBox alignItems="center" gap={1} px={3} mb={1}>
        {/* <PushPin sx={{
        fontSize: 19,
        color: "grey.500"
      }} /> */}
      <AiFillPushpin style={{
        fontSize: 19,
        color: "grey.500"
      }} />
        {/* <Paragraph fontSize={16} color="text.secondary">
          All Messages
        </Paragraph> */}
        <p className=" to-stone-800 font-semibold">All Messages</p>
      </FlexBox>

      <Scrollbar style={{
      maxHeight: 400
    }}>
        {RECENT_CHATS.map(item => <ChatItem id={item.id} key={item.id} name={item.name} time={item.time} image={item.image} lastMsg={item.lastMsg} unseenMsg={item.unseenMsg} lastMsgSeen={item.lastMsgSeen} isLastMsgIncoming={item.isLastMsgIncoming} />)}
      </Scrollbar>
    </Box>;
};

export default AllMessages;