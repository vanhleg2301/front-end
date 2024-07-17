import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { BANKS, TRANSACTIONS } from "../../util/constants";

// Generate Order Data
function createData(id, date, name, paymentMethod, amount) {
  return { id, date, name, paymentMethod, amount };
}

const packageName = ["Bronze package", "Silver package", "Gold package"];

export default function Orders({ setTotalAmount, setTime, setTransaction }) {
  const [transactions, setTransactions] = React.useState([]);
  const [banks, setBanks] = React.useState([]);
  const [showAll, setShowAll] = React.useState(false);

  React.useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetch(`${TRANSACTIONS}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey AK_CS.ce65abe0413011ef90c3c9ff66e60f20.aXIXXch3XSkZRZxMbbGw8SEXsAl9oW1BG6KkZjNBsnxGiJGS2wExBhmQL3VxYUrOXfDEja4Z`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const dataSort = data.data.records.sort(
          (a, b) => new Date(b.when) - new Date(a.when)
        );
        setTransactions(dataSort);
        setTransaction(dataSort);
        console.log(data);
        setShowAll(data.data.records.length > 5); // Show more if transactions > 5
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
        // Handle error state or retry logic if needed
      }
    };

    const getBank = async () => {
      try {
        const response = await fetch(`${BANKS}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey AK_CS.ce65abe0413011ef90c3c9ff66e60f20.aXIXXch3XSkZRZxMbbGw8SEXsAl9oW1BG6KkZjNBsnxGiJGS2wExBhmQL3VxYUrOXfDEja4Z`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBanks(data.data.bankAccs);
        // console.log(data.data.bankAccs);
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
        // Handle error state or retry logic if needed
      }
    };

    getBank();
    getTransactions();
  }, []);

  React.useEffect(() => {
    const amount = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    setTotalAmount(amount);

    const latestTransaction = transactions.reduce((latest, transaction) => {
      if (!latest || new Date(transaction.when) > new Date(latest)) {
        return transaction.when;
      }
      return latest;
    }, null);
    setTime(latestTransaction);
  }, [transactions, setTotalAmount, setTime]);

  const getPackageName = React.useCallback((description) => {
    return (
      packageName.find((pkg) =>
        description.toUpperCase().includes(pkg.toUpperCase())
      ) || "No package found"
    );
  }, []);

  return (
    <React.Fragment>
      <Typography>Recent Orders</Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align='right'>Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions
            .slice(0, showAll ? transactions.length : 5)
            .map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{transaction.when}</TableCell>
                <TableCell>{getPackageName(transaction.description)}</TableCell>
                <TableCell>{banks[0].bank?.fullName} - {banks[0].bankSubAccId}</TableCell>
                <TableCell align='right'>{`${transaction.amount} VND`}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {transactions.length > 5 && !showAll && (
        <Link
          color='primary'
          href='#'
          sx={{ mt: 3 }}
          onClick={() => setShowAll(true)}>
          See more orders
        </Link>
      )}
    </React.Fragment>
  );
}
