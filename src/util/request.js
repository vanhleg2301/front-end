import axios from "axios";
import { ENDPOINT } from "./constants";

// Helper function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem("accessToken");

// Common headers for requests with optional Authorization header
const getHeaders = (isAuthRequired = false) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (isAuthRequired) {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return headers;
};

// Handle response status
const handleResponse = (res) => {
  if (res.status === 403) {
    return null;
  }
  return res.data;
};

// POST request function
export const Request = async (uri, payload) => {
  try {
    const res = await axios.post(
      `${ENDPOINT}/${uri}`,
      //JSON.stringify(payload),
      payload,
      { headers: getHeaders() }
    );
    return handleResponse(res);
  } catch (error) {
    console.error("Error in request:", error);
    throw error;
  }
};

// GET request function
export const RequestGet = async (uri) => {
  try {
    const res = await axios.get(`${ENDPOINT}/${uri}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Error in request:", error);
    throw error;
  }
};

// PUT request function
export const requestPut = async (uri, payload) => {
  try {
    const res = await axios.put(`${ENDPOINT}/${uri}`, JSON.stringify(payload), {
      headers: getHeaders(true),
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Error in request:", error);
    throw error;
  }
};

// PATCH request function
export const requestPatch = async (uri, payload) => {
  try {
    const res = await axios.patch(
      `${ENDPOINT}/${uri}`,
      JSON.stringify(payload),
      { headers: getHeaders(true) }
    );
    return handleResponse(res);
  } catch (error) {
    console.error("Error in request:", error);
    throw error;
  }
};

// DELETE request function
export const RequestDelete = async (uri) => {
  try {
    const res = await axios.delete(`${ENDPOINT}/${uri}`, {
      headers: getHeaders(true),
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Error in request:", error);
    throw error;
  }
};
