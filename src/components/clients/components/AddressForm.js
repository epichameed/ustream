import * as React from "react";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie'; // Assuming you're using js-cookie for cookie handling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select"; // Ensure this import is correct
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { OutlinedInput, FormLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomizedDayPicker = styled("div")(({ theme }) => ({
  ".MuiPickersDay-day": {
    color: "white", // Customize the text color of the days
    backgroundColor: "red !important", // Customize the background color of the day cells
  },
  ".MuiPickersDay-day:hover": {
    backgroundColor: "#004ba0", // Customize the hover color
  },
  ".Mui-selected": {
    backgroundColor: "#ff5722", // Customize the selected day color
  },
  ".Mui-selected:hover": {
    backgroundColor: "#e64a19", // Customize the hover color of the selected day
  },
}));

const theme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "purple !important",
            color: "white",
          },
          "&.MuiPickersDay-today": {
            borderColor: "purple",
            backgroundColor: "white !important",
          },
        },
      },
    },
  },
});


const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ onSuccess }) {
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientUrl: '',
  });
  
  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${apiUrl}/api/clients/createClient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Client saved:", data);
        toast.success("Client created successfully!"); // Success toast
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("Error saving client."); // Error toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while saving the client.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
          <ToastContainer />

      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: "#F9FAFB",
            // border: "1px solid lightgray !important",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel
              sx={{
                fontSize:'14px',
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "14px", // Adjust size as needed
                  },
                },
              }}
              htmlFor="client-name"
              className="!m-0 !p-0"

            >
              Client's Name
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500 "></p>

            <OutlinedInput
              id="client-name"
              name="clientName"
              type="name"
              onChange={handleChange}
              placeholder="Enter client's name"
              required
              size="small"
              sx={{
                fontSize:'14px',
                borderRadius: '10px',

                // backgroundColor: "white !important", // Always white background
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23) !important", // Default border color
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6941C6 !important", // Focus border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23) !important", // Hover color
                },
                "& input": {
                borderRadius: '10px',

                  backgroundColor: "white !important", // Ensure input background stays white
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset !important", // Override autofill background
                    boxShadow: "0 0 0 1000px white inset !important",
                    backgroundColor: "white !important", // Ensure autofill background stays white
                  },
                },
              }}
            />
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel
              htmlFor="client-upwork-url"
              className="!m-0 !p-0"
              sx={{
                fontSize:'14px',
                "&.MuiFormLabel-root": {
                  position: "relative",
                  // "&:after": {
                  //   content: '"*"',
                  //   color: "#6941C6", // Change this to the desired color
                  //   position: "absolute",
                  //   marginLeft: "4px",
                  //   fontSize: "14px", // Adjust size as needed
                  // },
                },
              }}
            >
              Client's Upwork URL
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500 "></p>

            <OutlinedInput
              id="client-upwork-url"
              name="clientUrl"
              type="url"
              onChange={handleChange}
              placeholder="Enter client's Upwork URL"
              sx={{
                fontSize:'14px',
                borderRadius: '10px',

                // backgroundColor: "white !important", // Always white background
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23) !important", // Default border color
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6941C6 !important", // Focus border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23) !important", // Hover color
                },
                "& input": {
                borderRadius: '10px',

                  backgroundColor: "white !important", // Ensure input background stays white
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset !important", // Override autofill background
                    boxShadow: "0 0 0 1000px white inset !important",
                    backgroundColor: "white !important", // Ensure autofill background stays white
                  },
                },
              }}
              size="small"
            />
          </FormGrid>

          
          <FormGrid size={{ xs: 12 }}>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#6941C6",
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#53389E",
                  },
                  width: "24px !important",
                }}
              >
                Submit
              </Button>
            </div>
          </FormGrid>
        </Grid>
      </form>
    </ThemeProvider>
  );
}
