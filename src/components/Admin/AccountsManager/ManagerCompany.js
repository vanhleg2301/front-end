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
      <h2>Companies</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link href="#">1234567</Link>
              </TableCell>
              <TableCell>Company A</TableCell>
              <TableCell>
                <Select>
                  <MenuItem value={"Bronze"}>Bronze</MenuItem>
                  <MenuItem value={"Silver"}>Silver</MenuItem>
                  <MenuItem value={"Gold"}>Gold</MenuItem>
                  <MenuItem value={"Platinum"}>Platinum</MenuItem>
                  <MenuItem value={"Diamond"}>Diamond</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
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
