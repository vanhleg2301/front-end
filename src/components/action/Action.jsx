import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../../util/constants";
import "./Action.css";
import { RequestGet } from "../../util/request";
import { Box } from "@mui/material";

export default function Action({ onSearch }) {
  const [value, setValue] = useState("");
  const [jobs, setJobs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]); // Keep track of selected jobs

  const onChange = (event) => {
    const searchTerm = event.target.value;
    setValue(searchTerm);
    setShowDropdown(true);
  };

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/jobs`)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleDropdownClick = (searchTerm) => {
    setValue(searchTerm);
    setShowDropdown(false);

    setSelectedJobs([...selectedJobs, searchTerm]); // Add selected job to list
  };

  // search
  const [afterSearch, setAfterSearch] = useState([]);

  useEffect(() => {
    const fetchFind = async () => {
      try {
        const data = await RequestGet(`jobs/find?title=${value}`);
        setAfterSearch(data);
        console.log(afterSearch);
      } catch (error) {
        console.error("Error fetching find job:", error);
      }
    };
    fetchFind();
  }, [value]);

  const handleAfterSearch = () => {
    onSearch(afterSearch);
    console.log(afterSearch);
  };
  return (
    <Box className="search-container">
      <h1>Search by title</h1>
      <Box className="search-inner">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter search term..."
        />
        <button onClick={handleAfterSearch}>Search</button>
      </Box>
      {showDropdown && (
        <Box className="dropdown">
          {jobs
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const des = item.title.toLowerCase();

              // Exclude selected jobs from dropdown
              return (
                searchTerm &&
                des.includes(searchTerm) &&
                des !== searchTerm &&
                !selectedJobs.includes(item.title)
              );
            })
            .slice(0, 6)
            .map((item) => (
              <Box
                onClick={() => handleDropdownClick(item.title)}
                className="dropdown-row"
                key={item._id}
              >
                {item.title}
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
}
