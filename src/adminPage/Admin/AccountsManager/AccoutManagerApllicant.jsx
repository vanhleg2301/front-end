import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetch("http://localhost:9999/user/user")
      .then((resp) => resp.json())
      .then((data) => {
        setApplicants(data.filter((a) => a.roleID === 1));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDeactive = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:9999/user/${id}/deactive`,
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
  const handleActive = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/user/${id}/active`, {
        method: "PATCH",
      });

      if (response.ok) {
        window.alert("Active successful");
      } else {
        window.alert("Failed to active item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred");
    }
  };
  return (
    <Container className="text-align-center">
      <h3>Applicant</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell colSpan={2}>Action</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map((a) => (
              <TableRow hover key={a._id}>
                <TableCell>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"applicant/" + a._id}
                  >
                    {a._id}
                  </Link>
                </TableCell>
                <TableCell>{a.fullName}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell>{a.phoneNumber}</TableCell>
                <TableCell>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={(e) => handleActive(e.target.value)}
                    value={a._id}
                  >
                    Active
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={(e) => handleDeactive(e.target.value)}
                    value={a._id}
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

export default AccountsManagerApplicant;
