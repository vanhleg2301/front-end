import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoneyIcon from "@mui/icons-material/Money";

const PaymentMethod = ({ selectedIndex, handleListItemClick }) => {
  return (
    <Box component={"div"} className='w-full p-5 flex flex-col'>
      <Typography className='!font-bold !text-xl'>
        Phương thức thanh toán
      </Typography>
      <List component='nav' aria-label='main mailbox folders'>
        <ListItemButton
          selected={selectedIndex === 0}
          sx={{
            borderRightWidth: selectedIndex === 0 && 5,
            borderRightColor: "gray",
            borderRightStyle: "solid",
          }}
          onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary='Thanh toán bằng tài khoản ngân hàng' />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          sx={{
            borderRightWidth: selectedIndex === 1 && 5,
            borderRightColor: "gray",
            borderRightStyle: "solid",
          }}
          onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText primary='Thanh toán khi nhận hàng' />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default PaymentMethod;
