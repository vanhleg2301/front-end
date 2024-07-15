import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import { Typography } from "@mui/material";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

export default function Chart({ transactions, time }) {
  const theme = useTheme();

  // Function to format time to hours and minutes
  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatTimeToday = (timeStr) => {
    const date = new Date(timeStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth()+1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  // Generate data for each transaction
  const data = transactions.map((transaction) => ({
    time: formatTime(transaction.when),
    amount: transaction.amount ?? 0, // Assuming amount can be null or undefined
  }));

  // Ensure the data starts with a zero amount at the beginning
  data.unshift(createData("00:00", 0));

  return (
    <React.Fragment>
      <Typography>Today: {formatTimeToday(time)}</Typography>
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
              tickValues: [0, 2000, 10000, 20000], // Đây là mốc đã định sẵn
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
    </React.Fragment>
  );
}
