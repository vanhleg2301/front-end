import {} from "react";
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

const CVManage = () => {
  return (
    <Container className="text-align-center">
      <h3>CV List</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CV ID</TableCell>
              <TableCell colspan={2} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link href="#">12345678</Link>
              </TableCell>
              <TableCell align="right">
                <Button
                  color="success"
                  variant="contained"
                  style={{ marginRight: 20 }}
                >
                  Approve
                </Button>
                <Button color="error" variant="contained">
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CVManage;
