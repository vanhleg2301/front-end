import { useState, useEffect } from "react";
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
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/companies")
      .then((resp) => resp.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            {companies.map((c) => (
              <TableRow hover>
                <TableCell>{c._id}</TableCell>
                <TableCell>{c.companyName}</TableCell>
                <TableCell>
                  <Select value={c.companyStatus}>
                    <MenuItem value={1}>Bronze</MenuItem>
                    <MenuItem value={2}>Silver</MenuItem>
                    <MenuItem value={3}>Gold</MenuItem>
                    <MenuItem value={4}>Platinum</MenuItem>
                    <MenuItem value={5}>Diamond</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="info">
                    View Detail
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" color="error">
                    Deactive
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>1234567</TableCell>
              <TableCell>Company A</TableCell>
              <TableCell>
                <Select value="Bronze">
                  <MenuItem value={"Bronze"}>Bronze</MenuItem>
                  <MenuItem value={"Silver"}>Silver</MenuItem>
                  <MenuItem value={"Gold"}>Gold</MenuItem>
                  <MenuItem value={"Platinum"}>Platinum</MenuItem>
                  <MenuItem value={"Diamond"}>Diamond</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="info">
                  View Detail
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
