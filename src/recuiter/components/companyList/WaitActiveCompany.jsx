import { CircularProgress, Typography } from '@mui/material'
import React from 'react'

export default function WaitActiveCompany() {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}>
    <Typography variant='h5' style={{ margin: "16px" }}>
      Waiting for acceptance from admin...
    </Typography>
    <CircularProgress />
  </div>
  )
}
