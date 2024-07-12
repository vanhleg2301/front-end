import {
  Box,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Table,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import BankPayment from "../PaymentComponents/BankPayment";
import PaymentMethod from "../PaymentComponents/PaymentMethod";

const Payment = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();
  const paramsValue = location.state?.checkoutResponse;
  // console.log("paramsValue", paramsValue);

  if (paramsValue === null || paramsValue.qrCode == null) {
    return <Typography>Some thing went wrong!</Typography>;
  }

  const handleListItemClick = (event, index) => {
    // setSelectedIndex(index);
  };
  const rows = [{ description: paramsValue.description, price: paramsValue.price, amount: paramsValue.amount, }];

  return (
    <>
      <Box
        component={"div"}
        className="!flex md:flex-row flex-col !flex-1 !m-10 gap-10"
      >
        <ToastContainer />

        <Box
          component={"div"}
          sx={{ flex: 2, borderWidth: 1 }}
          className="!border-gray-200 !border-solid rounded-2xl flex !flex-col shadow"
        >
          <Box
            component={"div"}
            sx={{ borderBottomStyle: "dashed" }}
            className=" w-full !h-20 border-gray-200 border-b"
          >
            <Typography className="!font-bold !text-2xl p-5">
              Thông tin đơn hàng
            </Typography>
          </Box>
          <Box
            component={"div"}
            className="w-full p-5 flex flex-col gap-5 border-gray-200 border-b"
            sx={{ borderBottomStyle: "dashed" }}
          >
            <Typography className="!font-bold !text-xl">
              {`Mã đơn hàng: #${paramsValue.orderCode}`}
            </Typography>
            <TableContainer>
              <Table aria-label="simple table" size="small" className="w-full">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="!font-bold">
                      STT
                    </TableCell>
                    <TableCell align="center" className="!font-bold">
                      Tên
                    </TableCell>
                    <TableCell align="center" className="!font-bold">
                      Giá trị
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography className="!font-bold !ml-auto">
              {`Tổng tiền: ${paramsValue.amount}`}
            </Typography>
          </Box>
        </Box>
        {selectedIndex === 0 && (
          <BankPayment props={paramsValue} toast={toast} />
        )}
      </Box>
    </>
  );
};
export default Payment;