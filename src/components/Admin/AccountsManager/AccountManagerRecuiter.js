import { useState } from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Table,
} from "@mui/material";
import {} from "@mui/icons-material";
import "./AccountManagerRecuiter.css";
const AccountManagerRecuiter = () => {
  const [account, setAccount] = useState([]);
  return (
    <Container className="text-align-center">
      <h2>Recuiter Account</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link href="#">12345678</Link>
              </TableCell>
              <TableCell>abc@gmail.com</TableCell>
              <TableCell>012345678</TableCell>
              <TableCell align="right">
                <Button className="bg-red text-white">BAN</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AccountManagerRecuiter;
