import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../../util/constants";
import "./Act.css";

export default function Action({ onSearch }) {
  const [value, setValue] = useState("");
  const [jobs, setJobs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const onChange = (event) => {
    const searchTerm = event.target.value;
    setValue(searchTerm);
    setShowDropdown(true);
    onSearch(searchTerm); // Call the search handler from parent component
  };

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/job`)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleDropdownClick = (searchTerm) => {
    setValue(searchTerm);
    setShowDropdown(false);
    onSearch(searchTerm); // Call the search handler from parent component
  };

  return (
    <div className="search-container">
      <h1>Search</h1>
      <div className="search-inner">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter search term..."
        />
        <button onClick={() => handleDropdownClick(value)}>Search</button>
      </div>
      {showDropdown && (
        <div className="dropdown">
          {jobs
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const des = item.title.toLowerCase();

              return (
                searchTerm && des.includes(searchTerm) && des !== searchTerm
              );
            })
            .slice(0, 6)
            .map((item) => (
              <div
                onClick={() => handleDropdownClick(item.title)}
                className="dropdown-row"
                key={item._id}
              >
                {item.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
