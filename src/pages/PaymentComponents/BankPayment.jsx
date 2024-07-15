import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import io from "socket.io-client";
import CheckIcon from "@mui/icons-material/Check";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toJpeg } from "html-to-image";
import { cancelOrder, getListBank } from "../PaymentApi/payosApi";
import { useSocket } from "../../context/socket";

const BankPayment = ({ props }) => {
  const [open, setOpen] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [bank, setBank] = useState(null);
  const navigate = useNavigate();
  const socket = io.connect(process.env.REACT_APP_ORDER_URL); 
  // const socket = useSocket();

  console.log("props: ", props);
  console.log("signature: ", props.signature);

  const handleCopyText = (textToCopy) => {
    toast.success("Copy thành công");
    navigator.clipboard.writeText(textToCopy);
  };

  const cancelOrderHandle = async () => {
    cancelOrder(props.orderCode).then((res) => {
      console.log(res);
    });
    navigate(`/payment/result?orderCode=${props.orderCode}`, {
      state: {
        orderCode: props.orderCode,
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadQRCode = async () => {
    var node = document.getElementById("my-node");

    toJpeg(node, { quality: 0.95 })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = `${props.accountNumber}_${props.bin}_${props.amount}_${props.orderCode}_Qrcode.png`;
        link.href = dataUrl;
        link.click();
        link.remove();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  // Function to handle navigation to result page after payment success
  const handlePaymentSuccess = () => {
    setIsCheckout(true);
    socket.emit("leaveOrderRoom", props.orderCode);

    setTimeout(() => {
      navigate(`/payment/result?orderCode=${props.orderCode}`, {
        state: {
          orderCode: props.orderCode,
        },
      });
    }, 3000); // Adjust timeout as needed
  };

  useEffect(() => {
    if (!props?.bin) return;

    // Fetch bank information
    getListBank()
      .then((res) => {
        const bank = res.data.filter((bank) => bank.bin === props.bin);
        setBank(bank[0]);
      })
      .catch((err) => console.log(err));

    // Socket event listeners
    socket.on("paymentUpdated", (data) => {
      console.log(data)
      if (data.orderId === props.orderCode) {
        handlePaymentSuccess();
      }
    });

    socket.emit("joinOrderRoom", props.orderCode);

    return () => {
      socket.emit("leaveOrderRoom", props.orderCode);
    };
  }, []);
  // Add conditional rendering based on props.qrCode existence
  if (!props || !props.qrCode) {
    console.error("Missing or invalid QR Code props:", props);
    return <div>Loading...</div>;
  }

  return (
    <Paper>
      <Box
        sx={{
          flex: 3,
          borderWidth: 0.5,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          padding: 5,
          boxShadow: 3,
        }}>
        <Typography
          variant='h6'
          fontWeight='bold'
          color='textPrimary'
          gutterBottom>
          Thanh toán qua ngân hàng
        </Typography>
        <Box display='flex' flexDirection={{ xs: "column", md: "row" }} gap={2}>
          <Box display='flex' justifyContent='center' flex={1}>
            <Button onClick={() => setOpenQR(true)}>
              <QRCode
                value={props.qrCode}
                size={200} // Kích thước của mã QR
                bgColor='#FFFFFF' // Màu nền của mã QR
                fgColor='' // Màu của dữ liệu mã QR
                level='M' // Mức độ sửa lỗi, có thể là L, M, Q, H
                // includeMargin={true} // Bao gồm lề xung quanh mã QR
                // renderAs='svg' // Định dạng đầu ra của mã QR
                style={{ borderRadius: 10, width: "100%", height: "100%" }} // Tùy chỉnh CSS cho mã QR
              />
            </Button>
          </Box>
          <Box display='flex' flexDirection='column' flex={2} gap={2}>
            <Box display='flex' gap={2} alignItems='center'>
              <img src={bank?.logo} width={100} height={55} alt='Bank Logo' />
              <Box>
                <Typography color='textSecondary'>Ngân hàng</Typography>
                <Typography fontWeight='bold' color='textPrimary'>
                  {bank?.name}
                </Typography>
              </Box>
            </Box>
            <Box display='flex' flexDirection='column' gap={1}>
              <Box display='flex' alignItems='center'>
                <Box flex={1}>
                  <Typography color='textSecondary'>Chủ tài khoản:</Typography>
                  <Typography fontWeight='bold' color='textPrimary'>
                    {props.accountName}
                  </Typography>
                </Box>
              </Box>
              <Box display='flex' alignItems='center'>
                <Box flex={1}>
                  <Typography color='textSecondary'>Số tài khoản :</Typography>
                  <Typography fontWeight='bold' color='textPrimary'>
                    {props.accountNumber}
                  </Typography>
                </Box>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => handleCopyText(props.accountNumber)}>
                  Copy
                </Button>
              </Box>
              <Box display='flex' alignItems='center'>
                <Box flex={1}>
                  <Typography color='textSecondary'>Số tiền :</Typography>
                  <Typography fontWeight='bold' color='textPrimary'>
                    {props.amount} vnd
                  </Typography>
                </Box>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => handleCopyText(props.amount)}>
                  Copy
                </Button>
              </Box>
              <Box display='flex' alignItems='center'>
                <Box flex={1}>
                  <Typography color='textSecondary'>Nội dung :</Typography>
                  <Typography fontWeight='bold' color='textPrimary'>
                    {props.description}
                  </Typography>
                </Box>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => handleCopyText(props.description)}>
                  Copy
                </Button>
              </Box>
            </Box>
            <Typography color='textPrimary'>
              Lưu ý : Nhập chính xác nội dung{" "}
              <strong>{props.description}</strong> khi chuyển khoản
            </Typography>
            <Box display='flex' alignItems='center' gap={2}>
              {!isCheckout ? (
                <>
                  <CircularProgress size={24} />
                  <Typography variant='body1' color='textPrimary'>
                    Đơn hàng đang chờ được thanh toán
                  </Typography>
                </>
              ) : (
                <>
                  <CheckIcon color='success' />
                  <Typography variant='body1' color='textPrimary'>
                    Đơn hàng đã được thanh toán thành công
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Button
          variant='contained'
          color='error'
          onClick={handleClickOpen}
          style={{ marginTop: 16 }}>
          Hủy thanh toán
        </Button>

        {/*Dialog*/}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Huỷ bỏ đơn hàng"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc muốn huỷ đơn hàng hay không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ bỏ</Button>
            <Button onClick={cancelOrderHandle} autoFocus>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>

        {/*Dialog for QR Code*/}
        <Dialog open={openQR} onClose={() => setOpenQR(false)}>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            padding={3}
            gap={2}>
            <Typography>Mở App Ngân hàng bất kỳ để quét mã VietQR</Typography>
            <QRCode
              id='my-node'
              value={props.qrCode}
              level='M'
              includeMargin={true}
              renderAs='svg'
              fgColor={"#25174E"}
              bgColor='transparent'
              style={{ borderRadius: 10, width: "100%", height: "100%" }}
            />
            <Box display='flex' gap={2}>
              <Button
                variant='outlined'
                startIcon={<DownloadIcon />}
                onClick={downloadQRCode}>
                Tải xuống
              </Button>
              <Button variant='outlined' startIcon={<ShareIcon />}>
                Chia sẻ
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Paper>
  );
};

export default BankPayment;
