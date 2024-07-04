import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useScript from "react-script-hook";
import { createPaymentLink } from "../PaymentApi/payosApi";
import { AuthContext } from "../../context/AuthProvider";
import QRCode from "qrcode.react";

export default function PaymentPage() {
  const {userLogin} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { packageName, pricePackage, descriptionPackage } =
    location.state || {};
  // console.log("packageName: ", location.state);

  const [openUICustomLoading, setOpenUICustomLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [openDialogLoading, setOpenDialogLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [listBank, setListBank] = useState([]);
  const productNameRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef(1000);
  const buyerName = userLogin.user.fullName;

  const RETURN_URL = `${window.location.href}/result`;
  const CANCEL_URL = `${window.location.href}/result`;

  const PAYOS_SCRIPT = process.env.REACT_APP_PAYOS_SCRIPT;
  const [loading, error] = useScript({
    src: PAYOS_SCRIPT,
    checkForExisting: true,
  });

  useEffect(() => {
    const fetchListBank = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_LISTS_BANK_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setListBank(data.data);
        // console.log("List of banks:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchListBank();
  }, []);

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const createPaymentLinkHandle = async function (
    callbackFunction,
    setLoading
  ) {
    setLoading(true);
    try {
      const body = JSON.stringify({
        buyerName: buyerName,
        description: descriptionPackage,
        productName: packageName,
        // price: Number(pricePackage),
        amount: Number(pricePackage),
        returnUrl: RETURN_URL,
        cancelUrl: CANCEL_URL,
      });
      const response = await createPaymentLink(body);
      // console.log("response: ", response);

      if (response.error != 0) throw new Error("Call Api failed: ");
      callbackFunction(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };

  // const openUICustom = (checkoutResponse) => {};

  const redirectPaymentLink = async function (checkoutResponse) {
    if (checkoutResponse) {
      let url = checkoutResponse.checkoutUrl;
      if (
        checkoutResponse.checkoutUrl.startsWith(
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a"
        )
      ) {
        url = checkoutResponse.checkoutUrl.replace(
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a",
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a"
        );
      }

      if (
        checkoutResponse.checkoutUrl.startsWith(
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a"
        )
      ) {
        url = checkoutResponse.checkoutUrl.replace(
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a",
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a"
        );
      }
      window.location.href = url;
    }
  };

  const openPaymentDialog = async function (checkoutResponse) {
    console.log("checkoutResponse: ", checkoutResponse);
    if (checkoutResponse) {
      let url = checkoutResponse.checkoutUrl;
      if (
        checkoutResponse.checkoutUrl.startsWith(
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a"
        )
      ) {
        url = checkoutResponse.checkoutUrl.replace(
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a",
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a"
        );
      }
      if (
        checkoutResponse.checkoutUrl.startsWith(
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a"
        )
      ) {
        url = checkoutResponse.checkoutUrl.replace(
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a",
          "https://pay.payos.vn/web/87dc4cd8892e40409c9ea9d667ee467a"
        );
      }
      // console.log(url);
      let { open } = window.PayOSCheckout.usePayOS({
        RETURN_URL: RETURN_URL,
        ELEMENT_ID: "config_root",
        CHECKOUT_URL: url,
        onExit: (eventData) => {
          console.log(eventData);
        },
        onSuccess: (eventData) => {
          console.log(eventData);
          window.location.href = `${RETURN_URL}?orderCode=${eventData.orderCode}`;
        },
        onCancel: (eventData) => {
          console.log(eventData);
          window.location.href = `${CANCEL_URL}?orderCode=${eventData.orderCode}`;
        },
      });
      open();
    }
  };

  return (
    <Box sx={{ maxWidth: "80%", mx: "auto", p: 2 }}>
      <Box
        component={"div"}
        className='flex flex-col !content-center flex-wrap gap-5'>
        <Box
          component='div'
          className='w-3/4 md:w-1/2'
          sx={{ alignSelf: "center" }}>
          <ToastContainer />
          <Typography component='h4' variant='h4' className='!font-bold'>
            Purchase package - {packageName}
          </Typography>
          <Button variant='outlined' component={Link} to={"/upgrade"}>
            Back to list
          </Button>
          <Box component='div' sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Box component='div' sx={{ width: "100%", marginTop: "10px" }}>
              <TextField
                id='outlined-basic'
                label='Name package'
                variant='outlined'
                defaultValue={packageName}
                inputRef={productNameRef}
                fullWidth
              />
            </Box>
          </Box>
          <Box component='div' sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Box component='div' sx={{ width: "100%", marginTop: "10px" }}>
              <TextField
                id='outlined-basic'
                label='Price package'
                variant='outlined'
                defaultValue={pricePackage}
                inputRef={priceRef}
                fullWidth
              />
            </Box>
          </Box>
          <Box component='div' sx={{ marginBottom: "20px" }} hidden>
            <FormControl fullWidth>
              <InputLabel id='select-bank-label'>Chọn ngân hàng</InputLabel>
              <Select
                labelId='select-bank-label'
                id='select-bank'
                value={selectedBank}
                label='Select bank'
                onChange={handleBankChange}>
                {listBank &&
                  listBank.map((bank, index) => (
                    <MenuItem
                      key={index}
                      value={bank.id}
                      sx={{ display: "flex", alignItems: "center" }}>
                      <ListItemAvatar sx={{ display: "flex" }}>
                        <Avatar alt={`logo ${bank.name}`} src={bank.logo} />
                      </ListItemAvatar>
                      <Typography variant='inherit'>{bank.name}</Typography>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          <Box component='div' sx={{ marginBottom: "20px" }}>
            <Box component='div' sx={{ width: "100%", marginTop: "10px" }}>
              <TextField
                id='outlined-basic'
                label='Description package'
                variant='outlined'
                defaultValue={descriptionPackage}
                inputRef={descriptionRef}
                fullWidth
              />
            </Box>
          </Box>
          <Box component='div' className='flex flex-col gap-3 items-center'>
            <Button
              variant='contained'
              onClick={() =>
                createPaymentLinkHandle(redirectPaymentLink, setRedirectLoading)
              }
              disabled={redirectLoading}
              className='!bg-[#5D5FEF] !normal-case'>
              Go to payment page
              {redirectLoading ? (
                <>
                  {" "}
                  &nbsp; <CircularProgress className='!text-white' size={20} />
                </>
              ) : (
                ""
              )}
            </Button>
            <Typography>Or</Typography>
            <Button
              variant='contained'
              onClick={() =>
                createPaymentLinkHandle(openPaymentDialog, setOpenDialogLoading)
              }
              disabled={openDialogLoading}
              className='!bg-[#5D5FEF] !normal-case'>
              Open payment Dialog
              {openDialogLoading ? (
                <>
                  {" "}
                  &nbsp; <CircularProgress className='!text-white' size={20} />
                </>
              ) : (
                ""
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
