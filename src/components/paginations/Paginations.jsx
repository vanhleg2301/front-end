/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginations({ currentPage, totalPages, onPageChange }) {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <>
      <Stack spacing={2} sx={{ alignItems: "center", marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}
