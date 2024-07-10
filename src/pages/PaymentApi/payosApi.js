import axios from "axios";

export async function createPaymentLink(formData) {
  try {
    console.log("formData: ", formData);
    const res = await axios.post(
      `http://localhost:9999/order/create`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("res: ", res);
    return res.data;
  } catch (error) {
    console.error("Error: ", error.response);
    return error.response.data;
  }
}

export async function getListBank() {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_LISTS_BANK_URL}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getOrder(orderId) {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_ORDER_URL}/order/${orderId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function cancelOrder(orderId) {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_ORDER_URL}/order/${orderId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getTransactions() {
  try {
  } catch (error) {
    return error;
  }
}