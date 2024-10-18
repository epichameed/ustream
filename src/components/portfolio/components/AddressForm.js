import * as React from "react";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";

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

// const theme = createTheme({
//   overrides: {
//     MuiOutlinedInput: {
//       root: {
//         "&:hover $notchedOutline": {
//           borderColor: 'purple',
//         },
//         "&$focused $notchedOutline": {
//           borderColor: 'purple',
//         },
//       },
//       notchedOutline: {
//         borderColor: 'purple',
//       },
//     },
//   },
// });

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ teamMembers }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientUpworkUrl: "",
    projectTitle: "",
    projectLocation: "",
    projectPrice: "",
    currency: "usd",
    priceType: "fixed",
    amountReceived: "",
    projectDescription: "",
    teamMember: [],
  });

  const [deliveryDate, setDeliveryDate] = useState(null);
  const [contractSigningDate, setContractSigningDate] = useState(null);

  // Generic handleChange function for flexibility
  const handleDateChange = (name, value) => {
    if (name === "deliveryDate") {
      setDeliveryDate(value);
    } else if (name === "contractSigningDate") {
      setContractSigningDate(value);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log(deliveryDate);
    console.log(contractSigningDate);
    // try {
    //   const response = await fetch(`${apiUrl}/api/projects`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("Project saved:", data);
    //     // Optionally reset the form or show a success message
    //   } else {
    //     console.error("Error saving project");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const handleDelete = (memberToDelete) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      teamMember: prevFormData.teamMember.filter(
        (member) => member !== memberToDelete
      ),
    }));
  };

  return (
    <ThemeProvider theme={theme}>
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
          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
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
                // borderRadius: '10px',
                backgroundColor: "white !important", // Always white background
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

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              htmlFor="client-upwork-url"
              className="!m-0 !p-0"
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
            >
              Client's Upwork URL
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>
            <OutlinedInput
              id="client-upwork-url"
              name="clientUpworkUrl"
              type="url"
              onChange={handleChange}
              placeholder="Client's Upwork URL"
              required
              sx={{
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
                "& input": {
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

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              className="!m-0 !p-0"
              htmlFor="project-title"
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
            >
              Project title
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>
            <OutlinedInput
              id="project-title"
              name="projectTitle"
              type="text"
              onChange={handleChange}
              placeholder="Enter the project title"
              required
              sx={{
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
                "& input": {
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

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
              htmlFor="project-location"
              className="!m-0 !p-0"
            >
              Project Location
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>

            <OutlinedInput
              id="project-location"
              name="projectLocation"
              type="text"
              onChange={handleChange}
              placeholder="Enter the project location"
              required
              size="small"
              // sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6941C6 !important' }, }}
              sx={{
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
                "& input": {
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

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
              htmlFor="delivery-deadline"
              className="!m-0 !p-0"
            >
              Deadline(Date of Delivery)
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomizedDayPicker>
                <DatePicker
                  slotProps={{
                    textField: { size: "small", placeholder: "Select a Date" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#6941C6 !important",
                      },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "lightgray !important",
                    },
                  }}
                  name="deliveryDate"
                  value={deliveryDate} // Delivery date state
                  onChange={(newValue) =>
                    handleDateChange("deliveryDate", newValue)
                  } // Update deliveryDate
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      slotProps={{
                        inputLabel: { shrink: false, notched: false },
                        htmlInput: { placeholder: "Placeholder" },
                      }}
                      sx={{
                        boxSizing: "border-box",
                        height: "40px !important",
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
            </LocalizationProvider>
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
              htmlFor="contract-signing-date"
              className="!m-0 !p-0"
            >
              Contract Signing Date
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomizedDayPicker>
                <DatePicker
                  slotProps={{
                    textField: { size: "small", placeholder: "Select a Date" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#6941C6 !important",
                      },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "lightgray !important",
                    },
                  }}
                  name="contractSigningDate"
                  value={contractSigningDate} // Contract signing date state
                  onChange={(newValue) =>
                    handleDateChange("contractSigningDate", newValue)
                  } // Update contractSigningDate
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      slotProps={{
                        inputLabel: { shrink: false, notched: false },
                        htmlInput: { placeholder: "Placeholder" },
                      }}
                      sx={{
                        boxSizing: "border-box",
                        height: "40px !important",
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
            </LocalizationProvider>
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
              htmlFor="project-price"
              className="!m-0 !p-0"
            >
              Project Price
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>

            <OutlinedInput
              id="project-price"
              name="projectPrice"
              type="number"
              onChange={handleChange}
              inputProps={{
                pattern: "[0-9]*", // Restrict input to numbers
                title: "Please enter a valid number", // Tooltip for invalid input
              }}
              placeholder="Enter project price"
              required
              size="small"
              sx={{
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
                "& input": {
                  backgroundColor: "white !important", // Ensure input background stays white
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset !important", // Override autofill background
                    boxShadow: "0 0 0 1000px white inset !important",
                    backgroundColor: "white !important", // Ensure autofill background stays white
                  },
                  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "&[type=number]": {
                    MozAppearance: "textfield", // Hide arrows in Firefox
                  },
                },
              }}
            />
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
              htmlFor="currency"
              className="!m-0 !p-0"
            >
              Currency
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>

            <FormControl fullWidth size="small">
              {/* <InputLabel id="price-type-label">Price Type</InputLabel> */}
              <Select
                labelId="currency"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                defaultValue="usd"
                required
                sx={{
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
                <MenuItem value="usd">USD</MenuItem>
                <MenuItem value="gbp">GBP</MenuItem>
                <MenuItem value="eur">EUR</MenuItem>
                <MenuItem value="cad">CAD</MenuItem>
                <MenuItem value="cad">PKR</MenuItem>
              </Select>
            </FormControl>
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
              htmlFor="price-type"
              className="!m-0 !p-0"
            >
              Price Type
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>

            <FormControl fullWidth size="small">
              <Select
                labelId="price-type-label"
                id="price-type"
                name="priceType"
                value={formData.priceType}
                onChange={handleChange}
                defaultValue="fixed"
                required
                sx={{
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
                <MenuItem value="fixed">Fixed</MenuItem>
                <MenuItem value="hourly">Hourly</MenuItem>
              </Select>
            </FormControl>
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
              htmlFor="amount-received"
              className="!m-0 !p-0"
            >
              Amount Received
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>

            <OutlinedInput
              id="amount-received"
              name="amountReceived"
              placeholder="Enter the amount you received"
              type="number"
              onChange={handleChange}
              inputProps={{
                pattern: "[0-9]*", // Restrict input to numbers
                title: "Please enter a valid number", // Tooltip for invalid input
                inputMode: "numeric", // Ensure numeric keyboard for mobile devices
              }}
              required
              size="small"
              sx={{
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
                "& input": {
                  backgroundColor: "white !important", // Ensure input background stays white
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset !important", // Override autofill background
                    boxShadow: "0 0 0 1000px white inset !important",
                    backgroundColor: "white !important", // Ensure autofill background stays white
                  },
                  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "&[type=number]": {
                    MozAppearance: "textfield", // Hide arrows in Firefox
                  },
                },
              }}
            />
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel>Team Members</FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>
            <FormControl fullWidth size="small">
              <Select
                name="teamMember" // This ensures 'teamMember' is used as the key
                multiple
                value={formData.teamMember}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    size="small"
                    multiline={true}
                    rows={1}
                    sx={{
                      // overflow: 'hidden !important',
                      height: "40px",
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
                  />
                }
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      maxHeight: "40px",
                      overflow: "auto",
                    }}
                  >
                    {selected.map((member) => (
                      <Chip
                        key={member}
                        label={member}
                        onDelete={() => handleDelete(member)}
                        onMouseDown={(event) => event.stopPropagation()} // Prevent the dropdown from opening when clicking delete
                        sx={{
                          height: "24px", // Set height for the chip
                          fontSize: "0.75rem", // Adjust font size
                          padding: "2px 4px", // Adjust padding
                        }}
                      />
                    ))}
                  </Box>
                )}
                required
              >
                {teamMembers.map((member) => (
                  <MenuItem
                    key={member}
                    value={member}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {member}
                    {formData.teamMember.indexOf(member) > -1 && (
                      <CheckIcon sx={{ color: "green", ml: 2 }} /> // Conditionally render the green check icon
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 12 }}>
            <FormLabel
              className="!m-0 !p-0"
              htmlFor="project-description"
              sx={{
                "&.MuiFormLabel-root": {
                  position: "relative",
                  "&:after": {
                    content: '"*"',
                    color: "#6941C6", // Change this to the desired color
                    position: "absolute",
                    marginLeft: "4px",
                    fontSize: "1rem", // Adjust size as needed
                  },
                },
              }}
            >
              Project Description
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>
            <OutlinedInput
              id="project-description"
              name="projectDescription"
              type="text"
              onChange={handleChange}
              placeholder="Enter the project description"
              required
              multiline
              // maxRows={4}
              rows={4}
              sx={{
                backgroundColor: "white !important",
                height: "100px",
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
