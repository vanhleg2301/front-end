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
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const AccountsManagerApplicant = () => {
  const [applicants, setApplicants] = useState([]);
  const [cvs, setCVs] = useState({});

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

  useEffect(() => {
    const getAmountCv = async () => {
      try {
        const cvsData = {};
        for (let applicant of applicants) {
          const res = await fetch(`http://localhost:9999/cv/${applicant._id}`);
          const data = await res.json();
          cvsData[applicant._id] = data.length;
        }
        setCVs(cvsData);
      } catch (error) {
        console.log(error);
      }
    };
    if (applicants.length > 0) {
      getAmountCv();
    }
  }, [applicants]);

  const handleDeactive = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this item?"
    );

    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:9999/user/${id}/deactive`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        window.alert("Deactivation successful");
        setApplicants((prev) => prev.filter((a) => a._id !== id));
      } else {
        window.alert("Failed to deactivate item.");
      }
    } catch (error) {
      console.error("Error deactivating item:", error);
      alert("An error occurred");
    }
  };

  const handleActive = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/user/${id}/active`, {
        method: "PATCH",
      });

      if (response.ok) {
        window.alert("Activation successful");
        setApplicants((prev) =>
          prev.map((a) => (a._id === id ? { ...a, active: true } : a))
        );
      } else {
        window.alert("Failed to activate item.");
      }
    } catch (error) {
      console.error("Error activating item:", error);
      alert("An error occurred");
    }
  };

  return (
    <Container className='text-align-center'>
      <h3>Applicants</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>CVs</TableCell>
              <TableCell>Status</TableCell>
              <TableCell colSpan={2} align='center'>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants?.map((a, index) => (
              <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{a?.fullName}</TableCell>
                <TableCell>{a?.email}</TableCell>
                <TableCell>{a?.phoneNumber}</TableCell>
                <TableCell>
                  <Button component={Link} to={`${a?._id}`}>
                    {cvs[a?._id] || 0} cv
                  </Button>
                </TableCell>
                <TableCell>{a?.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <Button
                    color='success'
                    variant='contained'
                    onClick={() => handleActive(a?._id)}>
                    Active
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color='error'
                    variant='contained'
                    onClick={() => handleDeactive(a?._id)}>
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
