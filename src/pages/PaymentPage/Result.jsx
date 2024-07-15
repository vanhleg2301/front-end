import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Toolbar } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import PaymentFieldsTableDemo from "../PaymentComponents/PaymentFieldsTableDemo";
import OrderTableDemo from "../PaymentComponents/OrderTableDemo";
import { getOrder } from "../PaymentApi/payosApi";
import Transactions from "../PaymentComponents/Transactions";

export default function Result() {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  let orderCode = null;
  let paramsValue = new URLSearchParams(location.search);

  console.log("params: ", paramsValue);
  if (paramsValue.size === 0) {
    orderCode = location.state?.orderCode;
  }else{
    orderCode = paramsValue.get("orderCode")
  }

  console.log("order: ", order);

  useEffect(() => {
    if (orderCode !== null) {
      getOrder(orderCode)
        .then(data => {
          if (data.error == 0) {
            setOrder(data.data);
          } else if (data.error == -1) {
            toast.warning('Không tìm thấy đơn hàng');
          }
          console.log(data);
          setLoading(false);
        })
        .catch(error => {
          toast.error('Có lỗi xảy ra');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  console.log("order2: ", order);
  return (
    <Box>
      <ToastContainer />
      {loading ? (
        <LinearProgress />
      ) : (
        <Box>
          <OrderTableDemo data={order} />
          {/*<PaymentFieldsTableDemo data={order} />*/}
          {/*<Box><Transactions data={order}/></Box>*/}
        </Box>
        
      )}
    </Box>
  );
}