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
  const [reports, setReports] = useState([]);
  const handleDeactive = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:9999/companies/${id}/deactive`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        window.alert("deactive successful");
      } else {
        window.alert("Failed to deactive item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred");
    }
  };
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((r) => (
              <TableRow hover>
                <TableCell>{r._id}</TableCell>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.description}</TableCell>
                <TableCell>{r.userId}</TableCell>
                <TableCell>{r.foundDate}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="info">
                    View Detail
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => handleDeactive(e.target.value)}
                    value={r._id}
                  >
                    Deactive
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReportManager;
