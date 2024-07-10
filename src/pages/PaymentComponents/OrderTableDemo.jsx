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
// import { useSelector } from "react-redux";

function TableHeader() {
  return (
    <Toolbar className='!flex-1 !justify-center'>
      <Typography className='!font-semibold' component='h5' variant='h5'>
        Mô tả đơn hàng
      </Typography>
    </Toolbar>
  );
}

export default function OrderTableDemo({ data }) {
  console.log("data: ", data);
  return (
    <Box component={"div"}>
      <CssBaseline />
      <Box
        sx={{ marginTop: "40px", marginBottom: "40px", textAlign: "center"}}
        >
        <Typography>
          Đơn hàng <b>{data?.id ? `#${data.id}` : "không tìm thấy"}</b>
          {data?.status
            ? data.status == "PAID"
              ? ` đã thanh toán thành công`
              : ` chưa được thanh toán`
            : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "center",
        }}>
        <Paper>
          <TableHeader />
          <TableContainer>
            <Table size='small' className='md:min-w-[700px]'>
              <TableBody>
                {data ? (
                  <>
                    <TableRow key={"id"}>
                      <TableCell align='left'>
                        <Typography>Mã đơn hàng</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <b>#{data["id"]}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow key={"status"}>
                      <TableCell align='left'>Trạng thái</TableCell>
                      <TableCell align='left'>
                        {data["status"] == "PAID"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </TableCell>
                    </TableRow>
                    <TableRow key={"items"}>
                      <TableCell align='left'>Sản phẩm</TableCell>
                      <TableCell align='left'>
                        <ul>
                          <li>{`Description: ${data["description"]}`}</li>
                          <li>{`Amount: ${data["amount"]}`}</li>
                          <li>{`Price: ${data["price"]} VNĐ`}</li>
                        </ul>
                      </TableCell>
                    </TableRow>
                    <TableRow key={"amount"}>
                      <TableCell align='left'>Tổng tiền</TableCell>
                      <TableCell align='left'>
                        {data["price"] * data["amount"]} VNĐ
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow
                    key={0}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align='center' colSpan={12}>
                      Không có thông tin đơn hàng
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
