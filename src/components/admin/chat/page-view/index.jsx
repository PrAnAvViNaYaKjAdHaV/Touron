import { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Drawer,
  styled,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Add from "@mui/icons-material/Add"; // CUSTOM COMPONENTS

import PinChats from "../PinChats";
import AllMessages from "../AllMessages";
import Conversation from "../Conversation";
// import { H6 } from "../../../../minicomponents/typography";
import { FlexBetween } from "../../../../minicomponents/flexbox";
import { SearchInput } from "../../../../minicomponents/search-input"; // CUSTOM UTIL METHOD
import ChatItem from "../ChatItem";

// import { isDark } from "../../../../utils/constants"; // STYLED COMPONENTS

// const StyledSearchInput = styled(SearchInput)(({
//   theme
// }) => ({
//   backgroundColor: theme.palette.action.selected,
//   border: `1px solid #eeeeee`
// }));
// const StyledIconButton = styled(IconButton)(({
//   theme
// }) => ({
//   backgroundColor: theme.palette.action.selected,
//   border: `1px solid ${theme.palette.divider}`
// }));

const ChatPageView = () => {
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false);
  // const downMd = useMediaQuery(theme => theme.breakpoints.down("md"));

  const handleOpen = () => setOpenLeftDrawer(true); // RECENT CONVERSATION LIST

  const MESSAGE_CONTENT = (
    <Card
      sx={{
        height: "100%",
        pb: 1,
      }}
    >
      <Box p={3}>
        <FlexBetween mb={3}>
          {/* <H6 fontSize={18}>Messages</H6> */}
          <h2 className=" text-lg font-medium">Messages</h2>

          {/* <StyledIconButton size="small"> */}
          <Add />
          {/* </StyledIconButton> */}
        </FlexBetween>

        {/* <StyledSearchInput placeholder="Search..." /> */}
        <input type="text" placeholder="Search" />
      </Box>

      {/* PINNED ITEMS */}
      <PinChats />

      <Divider />

      {/* ALL MESSAGES */}
      <AllMessages />
    </Card>
  );
  return (
    <Box paddingLeft={40}>
      <Grid container spacing={3}>
        <Drawer
          anchor="left"
          open={openLeftDrawer}
          onClose={() => setOpenLeftDrawer(false)}
        >
          <Box width={300} padding={1}>
            {MESSAGE_CONTENT}
          </Box>
        </Drawer>{" "}
        :{" "}
        <Grid item xl={4} md={4}>
          {MESSAGE_CONTENT}
        </Grid>
        <Grid item xl={8} md={8} xs={12}>
          <Conversation handleOpen={handleOpen} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPageView;
