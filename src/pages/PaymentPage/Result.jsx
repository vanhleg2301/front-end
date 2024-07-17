import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Toolbar,
  Button,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import PaymentFieldsTableDemo from "../PaymentComponents/PaymentFieldsTableDemo";
import OrderTableDemo from "../PaymentComponents/OrderTableDemo";
import { amountPaid, getOrder } from "../PaymentApi/payosApi";
import Transactions from "../PaymentComponents/Transactions";
import { AuthContext } from "../../context/AuthProvider";
import { Container } from "@mui/system";

export default function Result() {
  const { userLogin } = useContext(AuthContext);
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  let orderCode = null;
  let paramsValue = new URLSearchParams(location.search);

  // console.log("params: ", paramsValue);
  if (paramsValue.size === 0) {
    orderCode = location.state?.orderCode;
  } else {
    orderCode = paramsValue.get("orderCode");
  }

  // console.log("order: ", order);

  useEffect(() => {
    if (orderCode !== null) {
      getOrder(orderCode)
        .then((data) => {
          if (data.error == 0) {
            setOrder(data.data);
            console.log("data from result: ", data.data, data.data.amountPaid);
            if (data.data.status === "PAID") {
              amountPaid(userLogin.user._id, data.data.amountPaid)
                .then((up) => {
                  toast.success(up.message);
                })
                .catch((err) => {
                  toast.error("Failed to upgrade user");
                  console.error(err);
                });
            } else if (data.data.status === "PENDING") {
              console.log("PENDING");
            } else if (data.data.status === "CANCELLED") {
              console.log("CANCELLED");
            }
            // Xử lý thêm
          } else if (data.error == -1) {
            toast.warning("Không tìm thấy đơn hàng");
          }

          setLoading(false);
        })
        .catch((error) => {
          toast.error("Có lỗi xảy ra");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Button component={Link} to={`/recruiter/profile`} variant="outlined" color="primary" style={{ marginBottom: 20 }}>
          Back to your profile
        </Button>
        {order && (
          <>
            <OrderTableDemo data={order} />
            {/* Uncomment if needed */}
            {/* <PaymentFieldsTableDemo data={order} /> */}
            {/* <Transactions data={order} /> */}
          </>
        )}
      </Paper>
    </Container>
  );
}
