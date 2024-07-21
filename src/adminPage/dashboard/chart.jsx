import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import { Typography, Button, Box } from "@mui/material";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

export default function Chart({ transactions, time }) {
  const theme = useTheme();

  // State for selected date
  const [selectedDate, setSelectedDate] = React.useState(new Date(time));

  // Function to format time to hours and minutes
  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  // Filter transactions for the selected date
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const filteredTransactions = transactions.filter(transaction =>
    new Date(transaction.when) >= startOfDay && new Date(transaction.when) <= endOfDay
  );

  // Generate data for each transaction
  const data = filteredTransactions.map((transaction) => ({
    time: formatTime(transaction.when),
    amount: transaction.amount ?? 0,
  }));

  // Ensure the data starts with a zero amount at the beginning
  data?.unshift(createData("00:00", 0));

  // Handle date navigation
  const handlePrevious = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    setSelectedDate(previousDate);
  };

  const handleNext = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate);
  };

  return (
    <React.Fragment>
      <Typography>Selected Date: {formatDate(selectedDate)}</Typography>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: "Sales (VND)",
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              tickValues: [0, 2000, 10000, 20000], // Custom tick values
              tickNumber: 1,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
