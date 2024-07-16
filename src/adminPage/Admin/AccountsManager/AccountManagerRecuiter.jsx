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
import { useSocket } from "../../../context/socket";
import { filter } from "lodash";
import { APIUSER } from "../../../util/apiEndpoint";
import { RequestPost } from "../../../util/request";

const AccountManagerRecuiter = () => {
  const socket = useSocket();
  const [recuiters, setRecuiters] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/user/user")
      .then((resp) => resp.json())
      .then((data) => {
        setRecuiters(data.filter((a) => a.roleID === 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const getCompanyNames = async () => {
      try {
        const responses = await Promise.all(
          recuiters.map((r) =>
            fetch(`http://localhost:9999/company/com/${r._id}`)
          )
        );

        const data = await Promise.all(responses.map((res) => res.json()));

        const companyData = data.reduce((acc, companyList, index) => {
          const recruiterId = recuiters[index]._id;
          const company = companyList.find(
            (item) => item.recruiterID === recruiterId
          );
          acc[recruiterId] = company ? company.companyName : "Sign up not yet";
          return acc;
        }, {});

        setCompanies(companyData);
      } catch (error) {
        console.error("Error fetching company names:", error);
        alert("An error occurred");
      }
    };

    if (recuiters.length > 0) {
      getCompanyNames();
    }
  }, [recuiters]);

  const sendmail = async (userId, message) => {
    //sendmail to recruiter
    try {
      const response = await RequestPost(`${APIUSER}/sendMailFrame`, {
        userId: userId,
        message: message,
      });
      console.log("Send email for applicant successfully: ", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleDeactive = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:9999/user/${id}/deactive`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        setRecuiters((prev) =>
          prev.map((r) => (r._id === id ? { ...r, isActive: false } : r))
        );

        const mess = "Your account has been deactive";
        sendmail(id, mess)

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
      await fetch(`http://localhost:9999/user/${id}/active`, {
        method: "PATCH",
      });

      setRecuiters((prev) =>
        prev.map((r) => (r._id === id ? { ...r, isActive: true } : r))
      );
      socket.emit("activeRecruiter", {
        id,
        isActive: true,
      });

      const mess = "Your account has been activated";
      sendmail(id, mess)

      window.alert("Active successful");
    } catch (error) {
      console.error("Error active item:", error);
      alert("An error occurred");
    }
  };

  return (
    <Container align='center'>
      <h3>Recuiter</h3>
      <TableContainer style={{ paddingTop: 30 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Account ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Active</TableCell>
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
                    to={"recuiter/" + r._id}>
                    {r._id}
                  </Link>
                </TableCell>
                <TableCell>{r.fullName}</TableCell>
                <TableCell>{r.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>{companies[r._id]}</TableCell>
                <TableCell>
                  <Button
                    color='success'
                    variant='contained'
                    onClick={(e) => handleActive(e.target.value)}
                    value={r._id}>
                    Active
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color='error'
                    variant='contained'
                    onClick={(e) => handleDeactive(e.target.value)}
                    value={r._id}>
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
