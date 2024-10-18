import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search"
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          borderRadius: 1,
          border: "2px solid #e3e3e3",
          padding:'7px',
          height:'40px'
        }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <CiSearch fontSize="20px" color="#8f8f8f" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}
