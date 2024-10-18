import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { height, styled } from "@mui/system";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import CustomDatePicker from "./CustomDatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';


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
  connects: Yup.number()
    .required("Connects used today is required")
    .min(0, "Must be at least 0"),
  proposals: Yup.number()
    .required("Proposals sent today is required")
    .min(0, "Must be at least 0"),
  views: Yup.number()
    .required("Views on proposals is required")
    .min(0, "Must be at least 0"),
  interviews: Yup.number()
    .required("Interviews secured is required")
    .min(0, "Must be at least 0"),
  projects: Yup.number()
    .required("Projects captured is required")
    .min(0, "Must be at least 0"),
  date: Yup.string().required("Date is required"), // Add validation for date
});

export default function DailyReportForm({ onSuccess }) {
  const [loading, setLoading] = useState(false); // Loading state
  const initialValues = {
    connects: "",
    proposals: "",
    views: "",
    interviews: "",
    projects: "",
    date: dayjs(),
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true); // Start loading when the form is submitted
      const authToken = Cookies.get("authToken");
      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.userId;

      const dataToSend = {
        ...values,
        userId,
      };

      const response = await fetch(`${apiUrl}/api/createReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error);
        setLoading(false); // Stop loading on error
        return;
      }

      toast.success("Report submitted successfully!");
      resetForm(); // Reset the form on success
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Error submitting the report. Please try again.");
    } finally {
      setLoading(false); // Stop loading after the response
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

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => {
          setFieldValueRef.current = setFieldValue; // Store setFieldValue in the ref

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
                    // marginBottom: '5px',
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
                  htmlFor="connects">Connects</FormLabel>
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  <Field
                    as={OutlinedInput}
                    id="connects"
                    name="connects"
                    type="number"
                    placeholder="Enter the number of connects used"
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
                    name="connects"
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
                  
                  htmlFor="proposals">Proposals</FormLabel>
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  <Field
                    as={OutlinedInput}
                    id="proposals"
                    name="proposals"
                    type="number"
                    placeholder="Enter the number of proposals sent"
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
                    name="proposals"
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
                  
                  htmlFor="views">Views</FormLabel>
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  <Field
                    as={OutlinedInput}
                    id="views"
                    name="views"
                    type="number"
                    placeholder="Enter the number of views you received on proposals"
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
                    name="views"
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
                  
                  htmlFor="interviews">Interviews</FormLabel>
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  <Field
                    as={OutlinedInput}
                    id="interviews"
                    name="interviews"
                    type="number"
                    placeholder="Enter the number of interviews"
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
                    name="interviews"
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
                  
                  htmlFor="projects">Projects</FormLabel>
                  <p className="text-xs mb-2 text-gray-500 "></p>
                  <Field
                    as={OutlinedInput}
                    id="projects"
                    name="projects"
                    type="number"
                    placeholder="Enter the number of projects you won"
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
                    name="projects"
                    component="div"
                    style={{ color: "red" }}
                  />
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
    htmlFor="date"
    className="!m-0 !p-0"
  >
    Report Date
  </FormLabel>
  <p className="text-xs mb-2 text-gray-500"></p>

  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CustomizedDayPicker>
      <Field name="date">
        {({ field, form }) => (
          <DatePicker
            required
            value={field.value ? dayjs(field.value) : null} // Convert to dayjs object if value exists
            defaultValue={dayjs()} 
            onChange={handleDateChange}
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
</FormGrid>


{/* /// This is the original date field down */}
                {/* <FormGrid size={{ xs: 6 }}>
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
                  
                  htmlFor="date">Report Date</FormLabel>
                  <p className="text-xs mb-2 text-gray-500"></p>
                  <Field name="date"
                  style = {{border: '2px solid red'}}
                  
                  >
                    {({ field }) => (

                    <CustomDatePicker 
                        value={field.value}
                        onDateChange={handleDateChange} // Call only handleDateChange

                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="date"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormGrid>


                //  New code for date
                /// */}

                <div className="flex justify-end w-full">
                  <FormGrid
                    size={{ xs: 2 }}
                    sx={{ alignSelf: "flex-end", display: "flex" }} // Align the button to the right
                  >
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: "#6941C6",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#53389E",
                        },
                      }}
                      disabled={loading} // Disable the button while loading
                    >
                      {loading ? <CircularProgress size={24} /> : "Submit"}
                    </Button>
                  </FormGrid>
                </div>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </ThemeProvider>
  );
}
