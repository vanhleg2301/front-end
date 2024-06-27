import React, { useState, useEffect } from "react";
import { Box, Typography, InputBase, Button, Grid, Paper, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RequestGet } from "../../util/request";
import { APICOMPANY } from "../../util/apiEndpoint";

export default function ActCompany({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

      try {
        const response = await RequestGet(`${APICOMPANY}/search?name=${searchQuery}`);
        console.log("searchQuery", response);
        onSearch(response);
        setSearchQuery("")
      } catch (error) {
        console.error("Error searching companies:", error);
      }
    
  };

  const fetchSuggestions = async (query) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    try {
      const response = await RequestGet(`${APICOMPANY}/search?name=${query}`);
      console.log("fetchSuggestions", response);
      setSuggestions(response);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions(searchQuery);
  }, [searchQuery]);

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={12}>
            <Paper
              component="form"
              elevation={0}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                position: "relative"
              }}
              onSubmit={handleSearch}
            >
              <SearchIcon sx={{ mr: 1 }} />
              <InputBase
                placeholder="Enter company name..."
                inputProps={{ "aria-label": "search company" }}
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // fix lỗi nhấp 2 lần
                onFocus={() => setShowSuggestions(true)}  
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ whiteSpace: "nowrap" }}
              >
                Tìm kiếm
              </Button>
              {showSuggestions && suggestions.length > 0 && (
                <Paper 
                  elevation={3} 
                  sx={{ position: "absolute", top: 48, left: 0, right: 0, zIndex: 1 }}
                >
                  <List>
                    {suggestions.map((company) => (
                      <ListItem 
                        button 
                        key={company._id} 
                        onClick={() => {
                          setSearchQuery(company.companyName);
                          setShowSuggestions(false);
                        }}
                      >
                        <ListItemText primary={company.companyName} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
