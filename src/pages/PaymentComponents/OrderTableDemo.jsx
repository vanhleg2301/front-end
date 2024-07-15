import React from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { capitalize } from "lodash"; // Example, if you're using lodash for capitalization

const packageData = ["Bronze package", "Silver package", "Gold package"];

function TableHeader({ data }) {
  return (
    <Box sx={{ p: 2,}}>
      <Typography variant="h5" >
        Mô tả đơn hàng{" "}
        {data?.status === "PAID" && (
          <CheckCircleIcon sx={{ verticalAlign: "middle" }} color="success" />
        )}
      </Typography>
    </Box>
  );
}

function OrderTableDemo({ data }) {
  const description =
    data?.transactions?.[0].description || "No description available";

  let packageName = "No package found";
  for (let i = 0; i < packageData.length; i++) {
    if (description.includes(packageData[i].toUpperCase())) {
      packageName = packageData[i];
      break;
    }
  }

  return (
    <Box sx={{ mt: 4, mb: 4, textAlign: "center" }}>
      <Typography variant="h6">
        Đơn hàng <b>{data?.id ? `#${data.id}` : "không tìm thấy"}</b>
        {data?.status
          ? data.status === "PAID"
            ? ` đã thanh toán thành công`
            : ` chưa được thanh toán`
          : ""}
      </Typography>

      <Paper sx={{ mt: 4, mb: 4, maxWidth: 800, mx: "auto" }}>
        <TableContainer>
          <Table size="small">
            <TableHeader data={data} />
            <TableBody>
              {data ? (
                <>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Mã đơn hàng
                    </TableCell>
                    <TableCell>{`#${data.id}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Trạng thái
                    </TableCell>
                    <TableCell>
                      {data.status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Sản phẩm
                    </TableCell>
                    <TableCell>
                      <ul>
                        <li>{`Description: ${capitalize(packageName.toLowerCase())}`}</li>
                        <li>{`Amount: ${data.amount}`}</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tổng tiền
                    </TableCell>
                    <TableCell>{`${data.amount} VNĐ`}</TableCell>
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Không có thông tin đơn hàng
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default OrderTableDemo;
