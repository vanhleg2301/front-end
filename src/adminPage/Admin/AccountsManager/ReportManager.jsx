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
const ReportManager = () => {
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
      <h2>Reports</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report ID</TableCell>
              <TableCell>Report title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Found by</TableCell>
              <TableCell>Found date</TableCell>
              <TableCell colSpan={2} align="center" className="width30">
                Action
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1234567</TableCell>
              <TableCell>Company have problem</TableCell>
              <TableCell>Problem when company X had a fake job</TableCell>
              <TableCell>Nguyen Anh B</TableCell>
              <TableCell>6/6/2024</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="info">
                  View Detail
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" color="error">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReportManager;
