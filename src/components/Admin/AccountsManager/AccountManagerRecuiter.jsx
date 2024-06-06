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
  Link,
  Grid,
  TextField,
} from "@mui/material";
import {} from "@mui/icons-material";
const AccountManagerRecuiter = () => {
  const [account, setAccount] = useState([]);
  return (
    <Container align="center">
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
      <h3>Recuiter</h3>
      <TableContainer style={{ paddingTop: 30 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Account ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>
                <Link href="#" style={{ textDecoration: "none" }}>
                  12345678
                </Link>
              </TableCell>
              <TableCell>Phòng tuyển dụng vị trí X</TableCell>
              <TableCell>Công ty AAA</TableCell>
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

export default AccountManagerRecuiter;
