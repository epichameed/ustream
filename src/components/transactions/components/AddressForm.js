import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select"; // Ensure this import is correct
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { OutlinedInput, FormLabel } from "@mui/material";
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
  
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryError, setDeliveryError] = useState(false);
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/project/getAllProjects`); // Replace with your API endpoint
      const data = await response.json();
      console.log("project data", data.response)
      setProjects(data.response); // Access the 'response' array inside the returned data
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Fetch data from the API
  useEffect(() => {
    
    fetchProjects();
  }, []);

  const handleDateChange = (name, value) => {
    const formattedDate = dayjs(value.$d).format('YYYY-MM-DD'); // Format the date to 'YYYY-MM-DD'
    console.log("formatteddate", formattedDate)
  
    if (name === "date") {
      setDeliveryDate(value);
      setFormData({
        ...formData,
        date: formattedDate, 
      });
    } 
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 


  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    projectId: "",

  
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${apiUrl}/api/transaction/createTransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Transaction saved:", data);
        toast.success("Transaction created successfully!"); // Success toast
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("Error saving transaction."); // Error toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while saving the transaction.");
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
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <FormGrid size={{ xs: 12, md: 3 }}>
            <div  style={{
         display:'flex',
         justifyContent:"space-between"
          
        }} className='flex justify-between'>

       
          <div>
      <FormLabel
        sx={{
          fontSize: "14px",
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
        htmlFor="projectId"
        className="!m-0 !p-0"
      >
        Select Project
      </FormLabel>

      <p className="text-xs mb-2 text-gray-500"></p>
      </div>
    
      </div>

      <FormControl fullWidth size="small">
  <Select
    labelId="projectId"
    id="projectId"
    name="projectId"
    value={formData.projectId}
    onChange={handleChange}
    required
    sx={{
      borderRadius: '10px',
      fontSize: '14px',
      backgroundColor: "white !important",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.23) !important", // Default border color
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6941C6 !important", // Focus border color
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.23) !important", // Hover color
      },
    }}
  >
    {projects.length === 0 ? (
      <MenuItem disabled value="">
        No Projects Available
      </MenuItem>
    ) : (
      projects.map((project) => (
        <MenuItem key={project.projectId} value={project.projectId}>
          {project.title} {/* Assuming each client has `clientId` and `clientName` fields */}
        </MenuItem>
      ))
    )}
  </Select>
</FormControl>
    </FormGrid>

          <FormGrid size={{ xs: 12, md: 4 }}>
  <FormLabel
    sx={{
      fontSize: '14px',
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
    htmlFor="date"
    className="!m-0 !p-0"
  >
    Date of Receving Amount
  </FormLabel>
  <p className="text-xs mb-2 text-gray-500"></p>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CustomizedDayPicker>
      <DatePicker
        required // Marking DatePicker as required
        slotProps={{
          textField: {
            size: "small",
            placeholder: "Select a Date",
            InputProps: {
              style: { fontSize: '14px', padding: '0px !important' }, // Font size for input text
            },
          },
        }}
        sx={{
          width: '100%',
          backgroundColor: 'white !important',
          borderRadius: '10px', // Overall border radius for DatePicker
          "& .MuiInputBase-root": {
            borderRadius: "10px", // Add border-radius here for MuiInputBase-root
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6941C6 !important",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "lightgray !important",
          },
        }}
        name="date"
        value={deliveryDate} // Delivery date state
        onChange={(newValue) =>
          handleDateChange("date", newValue)
        } // Update deliveryDate
        renderInput={(params) => (
          <TextField
            required // Marking TextField as required
            {...params}
            variant="outlined"
            error={deliveryError} // Show error state
            helperText={deliveryError ? "Please select a date." : ""} // Error message
            slotProps={{
              inputLabel: { shrink: false, notched: false },
              htmlInput: { placeholder: "Placeholder" },
            }}
            sx={{
              boxSizing: "border-box",
              height: "40px !important",
              "& .MuiInputBase-root": {
                borderRadius: "10px", // Add border-radius here for MuiInputBase-root
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
                "& fieldset": { borderColor: "red" },
                "&:hover fieldset": { borderColor: "red !important" },
                "&.Mui-focused fieldset": {
                  borderColor: "red !important",
                },
              },
              "& input": {
                height: "40px !important",
                padding: "10px 14px",
              },
            }}
          />
        )}
      />
    </CustomizedDayPicker>
    {deliveryError && (
          <FormHelperText deliveryError className='text-red-500'>
            Please select a date date.
          </FormHelperText>
        )}
  </LocalizationProvider>
</FormGrid>

<FormGrid size={{ xs: 12, md: 4 }}>
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
              htmlFor="amount"
              className="!m-0 !p-0"
            >
Amount Received            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>

            <OutlinedInput
              id="amount"
              name="amount"
              type="number"
              onChange={handleChange}
              inputProps={{
                pattern: "[0-9]*", // Restrict input to numbers
                title: "Please enter a valid number", // Tooltip for invalid input
              }}
              placeholder="Enter amount"
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
