import { Dialog, DialogContent, DialogTitle, Icon, IconButton } from "@material-ui/core";
import React from "react";
import CustomButton from "./CustomButton";
import CustomPaper from "./CustomPaper";

const Popup = (props) => {
  const { children, title, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div>
          {title}
          <IconButton onClick={()=> {
              setOpenPopup(false);
          }}>
            <CustomButton text="X" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <CustomPaper>{children}</CustomPaper>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
