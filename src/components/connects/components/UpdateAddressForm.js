import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import CustomDatePicker from "./CustomDatePicker";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
// import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';





// Styled Grid component
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

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
            // height: '30px',
          },
          "&.MuiPickersDay-today": {
            borderColor: "purple",
            backgroundColor: "white !important",
            // height: '30px',
          },
        },
      },
    },
  },
});



// Yup validation schema
const validationSchema = Yup.object().shape({
  numberOfConnects: Yup.number()
    .required("Connects purchased is required")
    .min(0, "Must be at least 0"),
  cost: Yup.number()
    .required("Cost in dollars is required")
    .min(0, "Must be at least 0"),
  sourceOfPayment: Yup.string().required("Source of payment is required"), // Add validation for sourceOfPayment
  date: Yup.string().required("Date is required"), // Add validation for date
});

export default function UpdateAddressForm({ open, onClose, connectsId, onSuccess }) {
  console.log("Connectsid", connectsId)
  const [loading, setLoading] = useState(false); // Add loading state


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
        ...prevData,
            [name]: name === "cost" || name=== 'numberOfConnects'? Number(value) : value,

    }));
};
const [formData, setFormData] = useState({
  numberOfConnects: null,
  cost: null,
  sourceOfPayment: "", // Add initial value for sourceOfPayment
  date: dayjs(),
});
  const initialValues = {
    numberOfConnects: "",
    cost: "",
    sourceOfPayment: "", // Add initial value for sourceOfPayment
    date: dayjs(),
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [connects, setConnects] = React.useState('');

  useEffect(() => {
    const fetchConnectData = async () => {
      if (connectsId) {
        setLoading(true);
        try {
          const response = await axios.get(`${apiUrl}/api/connects/getConnectsByConnectsId?connectsId=${connectsId}`);
          if (response.data.response.connect) {
            setFormData(response.data.response.connect); // Assuming the response has an address field
          } else {
            console.warn("No data found for connectsID:", connectsId);
          }
        } catch (error) {
          console.error("Error fetching connects data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchConnectData();
  }, [connectsId]); // Run effect when connectsId or modal open state changes

  const handleSubmit = async (values) => {
    setLoading(true); // Set loading state to true

    try {
      const authToken = Cookies.get("authToken");
      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.userId;
const {createdAt, deletedAt, updatedAt, ...necessaryData}= formData;
      const dataToSend = {
        ...necessaryData,
        date: formData.date ? dayjs(formData.date).format("YYYY-MM-DD") : null, // Format the date if it exists
            };

      const response = await fetch(`${apiUrl}/api/connects/updateConnects`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error);
        return;
      }

      console.log("updated")

      toast.success("Connects updated successfully!");
      if (onSuccess) {
        onSuccess();
        onClose()
      }
    } catch (error) {
      toast.error("Error updating the connects. Please try again.");
    }
    finally {
      setLoading(false); // Reset loading state
      if (onSuccess) {
        onSuccess();
        onClose()
      }
      // onClose()
    }
  };

  // Using a ref to store the setFieldValue function
  const setFieldValueRef = useRef(null);

  // Function to handle date change
  const handleDateChange = (newDate) => {
    if (setFieldValueRef.current) {
      setFieldValueRef.current("date", newDate.format("MM-DD-YY")); // Update Formik field value
    }
  };

  const currencies = [
    {
      value: "card",
      label: "Card",
    },
    {
      value: "upwork",
      label: "Upwork",
    },
  ];

  return (
    <>
     <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Connects</DialogTitle>
      <DialogContent>   <ThemeProvider theme={theme}>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => {
          setFieldValueRef.current = setFieldValue; 

          return (
            <Form>
              <Grid
                container
                spacing={3}
                sx={{
                  backgroundColor: "#F9FAFB",
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
                  
                  htmlFor="numberOfConnects">Connects Purchased</FormLabel>


                  {/* <FormLabel htmlFor="numberOfConnects">
                    Connects Purchased
                  </FormLabel> */}
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  <Field
                    as={OutlinedInput}
                    id="numberOfConnects"
                    name="numberOfConnects"
                    type="number"
                    value={formData.numberOfConnects}
                    onChange={handleChange} // Update state on change
                    placeholder='Enter the number of connects you purchased'
                    required
                    sx={{
                      fontSize:'14px',
                      borderRadius: '10px',
                      height: '38px',
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
                      boxSizing: 'border-box',
      
                        backgroundColor: "white !important", // Ensure input background stays white
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px white inset !important", // Override autofill background
                          boxShadow: "0 0 0 1000px white inset !important",
                          backgroundColor: "white !important", // Ensure autofill background stays white
                        },
                      },
                    }}
                  />
                  <ErrorMessage
                    name="numberOfConnects"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormGrid>

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
                  
                  htmlFor="cost">Cost in Dollars</FormLabel>
                  


                  {/* <FormLabel htmlFor="cost">Cost in Dollars</FormLabel> */}
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  <Field
                    as={OutlinedInput}
                    id="cost"
                    name="cost"
                    type="number"
                    placeholder='Enter the cost used to purchase the connects'
                    value={formData.cost}
                    onChange={handleChange} // Update state on change
                    required
                    sx={{
                      fontSize:'14px',
                      borderRadius: '10px',
                      height: '38px',
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
                      boxSizing: 'border-box',
      
                        backgroundColor: "white !important", // Ensure input background stays white
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px white inset !important", // Override autofill background
                          boxShadow: "0 0 0 1000px white inset !important",
                          backgroundColor: "white !important", // Ensure autofill background stays white
                        },
                      },
                    }}
                    
                  />
                  <ErrorMessage
                    name="cost"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormGrid>

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
                  
                  htmlFor="sourceOfPayment">Source of Payment</FormLabel>



                  {/* <FormLabel htmlFor="sourceOfPayment">
                    Source of Payment
                  </FormLabel> */}
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  

<Field name="sourceOfPayment">
    {({ field, form }) => (
      <FormControl fullWidth 
      variant="outlined"     
      >
        {/* <InputLabel id="sourceOfPayment-label">Please select source of payment</InputLabel> */}
        <Select
          {...field}
          labelId="sourceOfPayment-label"
          id="sourceOfPayment"
          // value={field.value || ""}
          value={formData.sourceOfPayment}
          required
          onChange={handleChange} // Update state on change

          displayEmpty
          sx={{
            fontSize: '14px',
            borderRadius: '10px',
            height: '38px',
            backgroundColor:'white !important',
            
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
              boxSizing: 'border-box',
              backgroundColor: "white !important", // Ensure input background stays white
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset !important",
                boxShadow: "0 0 0 1000px white inset !important",
                backgroundColor: "white !important",
              },
            },
            
          }}
        >
          <MenuItem value="" disabled>
            <span style={{ color: 'gray' }}>Please select source of payment</span>
          </MenuItem>
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  </Field>

                  <ErrorMessage
                    name="sourceOfPayment"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormGrid>

                <FormGrid size={{ xs: 6 }}>

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
                  
                  htmlFor="date">Date Purchased</FormLabel>



                  {/* <FormLabel htmlFor="date">Date Purchased</FormLabel> */}
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  {/* <Field name="date">
                    {({ field }) => (
                      <CustomDatePicker
                        value={field.value}
                        onDateChange={handleDateChange} // Call only handleDateChange
                      />
                    )}
                  </Field> */}

<LocalizationProvider dateAdapter={AdapterDayjs}>
    <CustomizedDayPicker>
      <Field name="date">
        {({ field, form }) => (
          <DatePicker
            required
            value={formData.date ? dayjs(formData.date) : null} // Convert to dayjs object if value exists
            // defaultValue={dayjs()} 
            onChange={(date) => {
              const formattedDate = date ? date.format("YYYY-MM-DD") : null; // Format to "YYYY-MM-DD"
              setFormData({
                ...formData,
                date: formattedDate, // Store formatted date
              });
              console.log(formattedDate);
            }}
                  //   (date) => {
            //   form.setFieldValue(field.name, date ? date.toISOString() : ''); // Update with ISO string
            // }
          // }
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
                borderColor: "#6941C6 !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgray !important",
              },
            }}
            name="date"
          />
        )}
      </Field>
      <ErrorMessage
        name="date"
        component="div"
        style={{ color: "red" }}
      />
    </CustomizedDayPicker>
  </LocalizationProvider>




                  <ErrorMessage
                    name="date"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormGrid>

                <div className="flex justify-end w-full">
                 
                </div>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      </ThemeProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
