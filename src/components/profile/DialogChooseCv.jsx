import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ManagerCv from "./ManagerCv";

export default function DialogChooseCv({ open, handleClose, onChooseCv }) {
  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          sx={{
            textAlign: "center",
            "& .MuiDialog-paper": {
              width: "90%", // Adjust to be responsive
              maxWidth: "800px", // Optional: max width
            },
          }}>
          <DialogContent sx={{ padding: 4 }}>
            <ManagerCv onChooseCv={onChooseCv} open={open}/>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
}
