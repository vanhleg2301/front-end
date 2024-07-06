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
  Grid,
  TextField,
} from "@mui/material";
import {} from "@mui/icons-material";
const AccountManagerRecuiter = () => {
  const [recuiters, setRecuiters] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((resp) => resp.json())
      .then((data) => {
        setRecuiters(data.filter((a) => a.roleID === 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleDeactive = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:9999/user/${id}/deactive`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        window.alert("Deactive successful");
      } else {
        window.alert("Failed to deactive item.");
      }
    } catch (error) {
      console.error("Error deactive item:", error);
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
      console.error("Error active item:", error);
      alert("An error occurred");
    }
  };
  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c._id === companyId);
    return company ? company.companyName : "Unknown";
  };
  return (
    <Container align="center">
      <h3>Recuiter</h3>
      <TableContainer style={{ paddingTop: 30 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Account ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell style={{ fontWeight: "bold" }} colSpan={2}>
                Action
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recuiters.map((r) => (
              <TableRow hover key={r._id}>
                <TableCell>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"recuiter/" + r._id}
                  >
                    {r._id}
                  </Link>
                </TableCell>
                <TableCell>{r.fullName}</TableCell>
                <TableCell>{getCompanyName(r.companiesID)}</TableCell>
                <TableCell>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={(e) => handleActive(e.target.value)}
                    value={r._id}
                  >
                    Active
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
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

export default AccountManagerRecuiter;
