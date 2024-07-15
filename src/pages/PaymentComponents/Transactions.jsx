import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { formatDate } from "../../util/formatHelpers";
import { Box } from "@mui/system";

export default function Transactions({ data }) {
  // console.log("data: ", data);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Account number</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Transaction date time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.transactions.map((t, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{t.accountNumber}</TableCell>
                  <TableCell>{t.amount}</TableCell>
                  <TableCell>{t.amount}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>{formatDate(t.transactionDateTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
