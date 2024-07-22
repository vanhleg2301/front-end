import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { RequestGet } from "../../../util/request";
import { APICOMPANY } from "../../../util/apiEndpoint";
import { Container } from "@mui/system";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CompanyList() {
  // const { recuiterId } = useParams();
  const { userLogin } = useContext(AuthContext);

  const recruiterID = userLogin?.user?._id; // 611c9c198208053c147edc79
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RequestGet(`${APICOMPANY}/com/${recruiterID}`);
        const com = response;
        // console.log(com);
        const sortedCompanies = com.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        if (response) {
          setCompanies(sortedCompanies);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenFile = (fileURL) => {
    console.log("decodedURL:", fileURL);
    window.open(fileURL, "_blank");
  };

  return (
    <Container>
      <h2>List company of Recruiter</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>companyName</TableCell>
              <TableCell>taxNumber</TableCell>
              <TableCell>NumberOfEmployees</TableCell>
              <TableCell>Business License</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies?.map((company, index) => (
              <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={company?.logo}
                    alt='Company Logo'
                    style={{ maxWidth: "100px" }}
                  />
                </TableCell>
                <TableCell>
                  <Link style={{ textDecoration: "none" }} to={company?._id}>
                    {company?.companyName}
                  </Link>
                </TableCell>
                <TableCell>{company?.taxNumber}</TableCell>
                <TableCell>{parseInt(company?.numberOfEmployees)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenFile(company?.businessLicense)}>
                    businessLicense
                  </Button>
                </TableCell>
                <TableCell>
                  {company?.companyStatus === 1
                    ? "Pending"
                    : company?.companyStatus === 0
                    ? "Accepted"
                    : "Rejected"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
