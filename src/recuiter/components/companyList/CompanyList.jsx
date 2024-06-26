import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { RequestGet } from "../../../util/request";
import { APICOMPANY } from "../../../util/apiEndpoint";
import { Container } from "@mui/system";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

export default function CompanyList() {
  // const { recuiterId } = useParams();
  const { userLogin } = useContext(AuthContext);

  const recruiterID = userLogin.user._id; // 611c9c198208053c147edc79
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RequestGet(`${APICOMPANY}/`);
        const sortedCompanies = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (response) {
          setCompanies(sortedCompanies);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>List company of Recuiter</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>companyName</TableCell>
              <TableCell>location</TableCell>
              <TableCell>taxNumber</TableCell>
              <TableCell>NumberOfEmployees</TableCell>
              <TableCell>Business License</TableCell>
              <TableCell>Function</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow hover>
                <TableCell>
                  <Link style={{ textDecoration: "none" }} to={company._id}>
                    {company._id}
                  </Link>
                </TableCell>
                <TableCell>{company.logo}</TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.taxNumber}</TableCell>
                <TableCell>{company.NumberOfEmployees}</TableCell>
                <TableCell>{company.businessLicense}</TableCell>
                <TableCell>
                  <Button color="primary" variant="contained">
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
