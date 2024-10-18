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
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const CustomizedDayPicker = styled("div")(({ theme }) => ({
  ".MuiPickersDay-day": {
    color: "white",
    backgroundColor: "red !important",
  },
  ".MuiPickersDay-day:hover": {
    backgroundColor: "#004ba0",
  },
  ".Mui-selected": {
    backgroundColor: "#ff5722",
  },
  ".Mui-selected:hover": {
    backgroundColor: "#e64a19",
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

export default function TransactionsForm({ projectId, open, onClose, onSuccess }) {
  
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryError, setDeliveryError] = useState(false);
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/project/getAllProjects`);
      const data = await response.json();
      console.log("project data", data.response)
      setProjects(data.response);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDateChange = (name, value) => {
    const formattedDate = dayjs(value.$d).format('YYYY-MM-DD');
    console.log("formatteddate", formattedDate);
  
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
  
    if (!deliveryDate || !formData.amount) {
      setDeliveryError(true);
      toast.error("Please fill in all required fields.");
      return;
    }

    const dataToSend={
      ...formData, projectId
    }

    try {
      const response = await fetch(`${apiUrl}/api/transaction/createTransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Transaction saved:", data);
        toast.success("Transaction created successfully!");
        if (onSuccess) {
          onSuccess();
        }
        onClose()
        setFormData({ date: "",
          amount: "",
          projectId: ""})
      } else {
        toast.error("Error saving transaction.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while saving the transaction.");
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Transactions</DialogTitle>
      <DialogContent>
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
              <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel
                  sx={{
                    fontSize: '14px',
                    "&.MuiFormLabel-root": {
                      position: "relative",
                      "&:after": {
                        content: '"*"',
                        color: "#6941C6",
                        position: "absolute",
                        marginLeft: "4px",
                        fontSize: "14px",
                      },
                    },
                  }}
                  htmlFor="date"
                  className="!m-0 !p-0"
                >
                  Date of Receiving Amount
                </FormLabel>
                <p className="text-xs mb-2 text-gray-500"></p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomizedDayPicker>
                    <DatePicker
                      required
                      slotProps={{
                        textField: {
                          size: "small",
                          placeholder: "Select a Date",
                          InputProps: {
                            style: { fontSize: '14px', padding: '0px !important' },
                          },
                        },
                      }}
                      sx={{
                        width: '100%',
                        backgroundColor: 'white !important',
                        borderRadius: '10px',
                        "& .MuiInputBase-root": {
                          borderRadius: "10px",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightgray !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightgray !important",
                        },
                      }}
                      name="date"
                      value={deliveryDate}
                      onChange={(newValue) =>
                        handleDateChange("date", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          variant="outlined"
                          error={deliveryError}
                          helperText={deliveryError ? "Please select a date." : ""}
                          slotProps={{
                            inputLabel: { shrink: false, notched: false },
                            htmlInput: { placeholder: "Placeholder" },
                          }}
                          sx={{
                            boxSizing: "border-box",
                            height: "40px !important",
                            "& .MuiInputBase-root": {
                              borderRadius: "10px",
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
                    <FormHelperText className='text-red-500'>
                      Please select a date.
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </FormGrid>

              <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel
                  sx={{
                    fontSize: '14px',
                    "&.MuiFormLabel-root": {
                      position: "relative",
                      "&:after": {
                        content: '"*"',
                        color: "#6941C6",
                        position: "absolute",
                        marginLeft: "4px",
                        fontSize: "14px",
                      },
                    },
                  }}
                  htmlFor="amount"
                  className="!m-0 !p-0"
                >
                  Amount Received
                </FormLabel>
                <p className="text-xs mb-2 text-gray-500"></p>

                <OutlinedInput
                  id="amount"
                  name="amount"
                  type="number"
                  onChange={handleChange}
                  value={formData.amount}
                  placeholder="Enter Amount"
                  sx={{
                    width: '100%',
                    fontSize:'15px' ,
                    height: "38px !important",
                    backgroundColor: 'white !important',
                    borderRadius: '10px',
                    borderColor: "#6941C6 !important",
                    '&:focus': {
                      borderColor: '#FF5722 !important', // Change this to your desired focus color
                      boxShadow: '0 0 0 0.2rem rgba(255, 87, 34, 0.25)', // Optional: Add a shadow effect on focus
                    },
                    '&:hover': {
                      borderColor: 'lightgray !important', // Change this to your desired focus color
                      // boxShadow: '0 0 0 0.2rem rgba(255, 87, 34, 0.25)', // Optional: Add a shadow effect on focus
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'lightgray !important',
                    },
                    '&:focus .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FF5722 !important', // Change this to your desired focus color
                    },

                  }}
                  required
                />
              </FormGrid>

              
            </Grid>
          </form>
        </ThemeProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!deliveryDate || !formData.amount}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
