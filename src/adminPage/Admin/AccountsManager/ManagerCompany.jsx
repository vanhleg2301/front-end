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
  Typography,
} from "@mui/material";
import {} from "@mui/icons-material";
import { handleOpenFile } from "../../../util/handleOpenFile";
const CompanyManager = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/company")
      .then((resp) => resp.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleActive = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:9999/company/${id}/active`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        window.alert("Active successful");
        window.location.reload();
      } else {
        window.alert("Failed to Active item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred");
    }
  };

  const handleDeactive = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:9999/company/${id}/deactive`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        window.alert("deactive successful");
        window.location.reload();
      } else {
        window.alert("Failed to deactive item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred");
    }
  };

  return (
    <Container className='text-align-center'>
      <Grid container justifyContent={"end"}>
        <Grid item xs={4}>
          <TextField
            variant='outlined'
            label='Search Company by Name'
            fullWidth
            size='small'
          />
        </Grid>
      </Grid>
      <h2>Companies</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Tax number</TableCell>
              <TableCell>Business License</TableCell>
              <TableCell>Status</TableCell>
              <TableCell colSpan={2} align='center' className='width30'>
                Action
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((c, index) => (
              <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={c?.logo}
                    alt='Company Logo'
                    style={{ maxWidth: "50px", marginBottom: "10px" }}
                  />
                </TableCell>
                <TableCell>{c?.companyName}</TableCell>
                <TableCell>{c?.taxNumber}</TableCell>
                <TableCell>
                  <Typography
                    color='primary'
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleOpenFile(c?.businessLicense)}>
                    Business license
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  {c?.companyStatus === 1
                    ? "Pending"
                    : c?.companyStatus === 0
                    ? "Accepted"
                    : "Rejected"}
                </TableCell>
                <TableCell align='right'>
                  <Button
                    variant='contained'
                    color='info'
                    onClick={(e) => handleActive(e.target.value)}
                    value={c?._id}>
                    ACTIVE
                  </Button>
                </TableCell>
                <TableCell align='left'>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={(e) => handleDeactive(e.target.value)}
                    value={c?._id}>
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

export default CompanyManager;
