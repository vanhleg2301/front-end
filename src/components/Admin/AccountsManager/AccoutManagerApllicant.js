import {} from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Container,
} from "@mui/material";
import {} from "@mui/icons-material";
import "./AccountsManagerApplicant.css";
const AccountsManagerApplicant = () => {
  returṇ̣̣(
    <Container className="text-align-center">
      <h2>Applicant Account</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
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
              <TableCell>Nguyen Van A</TableCell>
              <TableCell>Male</TableCell>
              <TableCell>abc@gmail.com</TableCell>
              <TableCell>012345678</TableCell>
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

export default AccountsManagerApplicant;
