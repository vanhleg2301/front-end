import axios from "axios";
// import Cookies from "js-cookie";
import { ENDPOINT } from "./constants";

export const Request = async (payload, uri) => {
  const accessToken = "vanhvanh";
  document.cookie = `accessToken=${accessToken}; path=/`;
  // const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    const res = await axios.post(
      `${ENDPOINT}/${uri}`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 403) {
      return null;
    }

    const { data } = res;
    return data;
  }

  return null;
};

export const RequestGet = async (uri) => {
  // const accessToken = localStorage.getItem("accessToken");
  const res = await axios.get(`${ENDPOINT}/${uri}`);

  const { data } = res;
  return data;
};

export const requestPut = async (payload, uri) => {
  if (localStorage.getItem("accessToken")) {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.put(`${ENDPOINT}/${uri}`, JSON.stringify(payload), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 403) {
        return null;
      }
    }

    const { data } = res;
    return data;
  }

  return null;
};

export const requestPatch = async (payload, uri) => {
  if (localStorage.getItem("accessToken")) {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.patch(
      `${ENDPOINT}/${uri}`,
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      if (res.status === 403) {
        return null;
      }
    }

    const { data } = res;
    return data;
  }

  return null;
};

export const RequestDelete = async (uri) => {
  if (localStorage.getItem("accessToken")) {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.delete(`${ENDPOINT}/${uri}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const { data } = res;
    return data;
  }

  return null;
};
