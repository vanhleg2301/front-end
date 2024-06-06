import { useState } from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Container,
  Table,
  Link,
  Grid,
  TextField,
} from "@mui/material";
import {} from "@mui/icons-material";

const AccountsManagerApplicant = () => {
  const [applicants, setApplicants] = useState([]);
  return (
    <Container className="text-align-center">
      <Grid container justifyContent={"end"} paddingTop={2}>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            label="Search Account by Name"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <h3>Applicant</h3>
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
                <Button color="error" variant="contained">
                  Deactive
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AccountsManagerApplicant;
