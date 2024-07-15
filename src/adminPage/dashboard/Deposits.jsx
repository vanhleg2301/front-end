import * as React from "react";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts";
import { Box } from "@mui/system";

const packageName = ["Bronze package", "Silver package", "Gold package"];

export default function Deposits({ transaction, amount, time }) {
  const getPackageName = React.useCallback((description) => {
    return (
      packageName.find((pkg) =>
        description.toUpperCase().includes(pkg.toUpperCase())
      ) || "No package found"
    );
  }, []);

  const countPackageOccurrences = (transactions) => {
    const packageCounts = {
      "Bronze package": 0,
      "Silver package": 0,
      "Gold package": 0,
    };

    transactions.forEach((transaction) => {
      const pkgName = getPackageName(transaction.description);
      if (packageCounts.hasOwnProperty(pkgName)) {
        packageCounts[pkgName]++;
      }
    });

    return packageCounts;
  };

  const packageOccurrences = countPackageOccurrences(transaction);

  return (
    <React.Fragment>
      <Box>
        <Box>
          <Typography variant='h6' gutterBottom>
            Revenue
          </Typography>
          <Typography component='p' variant='h4'>
            {amount} VND
          </Typography>
          <Typography color='text.secondary'>on {time}</Typography>
        </Box>
        <Box>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: packageOccurrences["Bronze package"], label: "Bronze", },
                  { id: 1, value: packageOccurrences["Silver package"], label: "Silver", color: 'gray'},
                  { id: 2, value: packageOccurrences["Gold package"], label: "Gold",color: 'yellow' },
                ],
              },
            ]}
            width={220}
            height={110}  
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
