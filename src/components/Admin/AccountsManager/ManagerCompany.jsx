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
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import {} from "@mui/icons-material";
const CompanyManager = () => {
  const [account, setAccount] = useState([]);
  return (
    <Container className="text-align-center">
      <Grid container justifyContent={"end"}>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            label="Search Company by Name"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <h2>Companies</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell colSpan={2} align="center" className="width30">
                Action
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1234567</TableCell>
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
              <TableCell align="right">
                <Button variant="contained" color="info">
                  See Detail
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" color="error">
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

export default CompanyManager;
