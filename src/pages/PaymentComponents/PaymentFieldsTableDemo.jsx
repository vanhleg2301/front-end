import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const WEBHOOK_FIELD_DESC = {
  orderCode: "",
  amount: "",
  description: "",
  accountNumber: "",
  reference: "",
  transactionDateTime: "",
  paymentLinkId: "",
  code: "",
  desc: "",
  counterAccountBankId: "",
  counterAccountBankName: "",
  counterAccountName: "",
  counterAccountNumber: "",
  virtualAccountName: "",
  virtualAccountNumber: "",
};

function TableHeader() {
  return (
    <Toolbar className='!flex-1 !justify-center'>
      <Typography className='!font-semibold' component='h5' variant='h5'>
        Webhook
      </Typography>
    </Toolbar>
  );
}

export default function PaymentFieldsTableDemo({ data }) {
  let webhookData = null;
  // console.log("data: ", data);
  if (data) {
    webhookData = data;
    // xoa cac field khong co gia tri
    webhookData = Object.fromEntries(
      Object.entries(webhookData).filter(([_, v]) => v != "")
    );
  }
  return (
    <Box component={"div"} className='mx-5'>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}>
        <Paper sx={{ overflow: "hidden" }}>
          <TableHeader />
          <TableContainer>
            <Table
              aria-label='simple table'
              size='small'
              className='md:min-w-[700px]'>
              <TableHead>
                <TableRow>
                  <TableCell className='!font-bold'>Key</TableCell>
                  <TableCell className='!font-bold'>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {webhookData ? (
                  Object.keys(webhookData).map((key) => (
                    <TableRow key={key}>
                      <TableCell component='th' scope='row'>
                        {key}
                      </TableCell>
                      <TableCell align='left'>
                        {key === "transactions"
                          ? "[Transactions data is display below]"
                          : typeof webhookData[key] === "object"
                          ? JSON.stringify(webhookData[key])
                          : webhookData[key]}
                      </TableCell>
                    </TableRow>
                  ))
                  
                ) : (
                  <TableRow
                    key={0}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell colSpan={12}>
                      Không có thông tin giao dịch
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}
