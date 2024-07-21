import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RequestGet } from "../../../util/request";
import { APICV } from "../../../util/apiEndpoint";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { handleOpenFile } from "../../../util/handleOpenFile";

export default function AmountApplicantCv() {
  const { applicantId } = useParams();
  const [cvs, setCVs] = useState([]);

  useEffect(() => {
    const getCv = async () => {
      try {
        const res = await RequestGet(`${APICV}/${applicantId}`);
        setCVs(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getCv();
  }, [applicantId]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>CV Number</TableCell>
            <TableCell>Applicant Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cvs?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography>CV {index + 1}</Typography>
              </TableCell>
              <TableCell>{item?.applicantID?.fullName}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenFile(item?.fileURL)}
                >
                  View CV
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
