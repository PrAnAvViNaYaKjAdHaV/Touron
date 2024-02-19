import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { RiTeamLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AuthPopup = ({ open, setOpen, handleClose, handleClickOpen }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className=" flex flex-col gap-5 bg-white rounded-md py-5 px-5 w-96">
        sad
      </div>
    </Dialog>
  );
};

export default AuthPopup;
