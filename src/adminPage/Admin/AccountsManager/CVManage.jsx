import {
  Button,
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const CVManage = () => {
  const [cvs, setCVs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((resp) => resp.json())
      .then((data) => {
        setApplicants(data.filter((a) => a.roleID === 1));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/cv")
      .then((resp) => resp.json())
      .then((data) => {
        setCVs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = async (id) => {
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

  const getApplicantName = (applicantId) => {
    console.log(applicantId);
    const applicant = applicants.find((a) => a._id === applicantId);
    console.log(applicants);
    console.log(applicant);
    return applicant ? applicant.fullName : "Unknown";
  };
  return (
    <Container className="text-align-center">
      <h3>CV List</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CV ID</TableCell>
              <TableCell>Applicant</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cvs.map((c) => (
              <TableRow hover>
                <TableCell>{c._id}</TableCell>
                <TableCell>{getApplicantName(c.applicantID._id)}</TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => handleDelete(e.target.value)}
                    value={c._id}
                    variant="contained"
                    color="error"
                  >
                    Delete
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

export default CVManage;
