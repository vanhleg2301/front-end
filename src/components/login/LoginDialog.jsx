import React from "react";
import Login from "./Login";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function LoginDialog({ open, handleClose }) {
  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          sx={{ textAlign: "center" }}>
          
          <DialogContent sx={{padding: 8}}>
            <Login />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
}
