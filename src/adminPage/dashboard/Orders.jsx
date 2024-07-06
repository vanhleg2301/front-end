import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 May, 2024",
    "Hoang Cao Viet Anh",
    "Dong Da, Ha Noi",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 May, 2024",
    "Ta Duc Hai",
    "Quoc Oai, Ha Noi",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 May, 2024",
    "Dinh Trong Tan",
    "Ha Dong, Ha Noi",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 May, 2024",
    "Doan Sy Son",
    "Cau Giay, Ha Noi",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 May, 2024",
    "Phan Manh Quan",
    "Nam Tu Liem, Ha Noi",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Typography>Recent Orders</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
