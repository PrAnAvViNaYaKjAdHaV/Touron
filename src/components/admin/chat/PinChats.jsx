import Box from "@mui/material/Box"; // CUSTOM ICON COMPONENT

// import PushPin from "@/icons/PushPin"; // CUSTOM COMPONENTS
import { AiFillPushpin } from "react-icons/ai";

import ChatItem from "./ChatItem";
import { FlexBox } from "../../../minicomponents/flexbox";
// import { Paragraph } from "../../../minicomponents/typography"; // CUSTOM DUMMY DATA

import { PIN_CHATS } from "../../../data/__fakeData__/chats";

const PinChats = () => {
  return <Box>
      <FlexBox alignItems="center" gap={1} px={3} mb={1}>
        {/* <PushPin sx={{
        fontSize: 19,
        color: "grey.500"
      }} /> */}
      <AiFillPushpin
        style={{
          fontSize: 19,
          color: "grey.500"
        }}
      />
        {/* <Paragraph fontSize={16} color="text.secondary">
          Pinned
        </Paragraph> */}
        <p className=" text-stone-800">Pinned</p>
      </FlexBox>

      {PIN_CHATS.map(item => <ChatItem id={item.id} key={item.id} name={item.name} time={item.time} image={item.image} lastMsg={item.lastMsg} unseenMsg={item.unseenMsg} lastMsgSeen={item.lastMsgSeen} isLastMsgIncoming={item.isLastMsgIncoming} />)}
    </Box>;
};

export default PinChats;