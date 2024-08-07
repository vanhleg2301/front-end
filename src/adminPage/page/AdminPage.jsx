import React, { useState } from "react";
import { Container } from "@mui/system";
import { Grid, Paper } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import Chart from "../dashboard/chart";
import Deposits from "../dashboard/Deposits";
import Orders from "../dashboard/Orders";

export default function AdminPage() {
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [totalTime, setTotalTime] = React.useState(0); // Assuming you want to track time
  const [transactions, setTransactions] = React.useState([]);

  const updateTransaction = (newTransaction) => {
    setTransactions(newTransaction);
  };

  // Function to update total amount
  const updateTotalAmount = (newAmount) => {
    setTotalAmount(newAmount);
  };

  // Function to update total time
  const updateTotalTime = (newTime) => {
    setTotalTime(newTime);
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}>
            <Chart transactions={transactions} time={totalTime}/>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}>
            <Deposits transaction={transactions} amount={totalAmount} time={totalTime} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders
            setTransaction={updateTransaction}
              setTotalAmount={updateTotalAmount}
              setTime={updateTotalTime}
            />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
