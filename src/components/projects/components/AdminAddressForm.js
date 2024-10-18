import * as React from "react";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { FormHelperText, Dialog, 
  DialogTitle,
  DialogContent,
  CircularProgress,
 
  DialogActions } from '@mui/material';
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

export default function AdminAddressForm({ onSuccess }) {
  const teamMembers = ['Maryam', 'Aden', 'Ali Haider', 'Usman', 'Tahira', 'Umar','Aimen'];


  const [deliveryDate, setDeliveryDate] = useState(null);
  const [contractSigningDate, setContractSigningDate] = useState(null);

  // Generic handleChange function for flexibility
  const handleDateChange = (name, value) => {
    const formattedDate = dayjs(value.$d).format('YYYY-MM-DD'); // Format the date to 'YYYY-MM-DD'
    console.log("formatteddate", formattedDate)
  
    if (name === "deadline") {
      setDeliveryDate(value);
      setFormData({
        ...formData,
        deadline: formattedDate, // Add the formatted delivery date to formData
      });
    } else if (name === "contractDate") {
      setContractSigningDate(value);
      setFormData({
        ...formData,
        contractDate: formattedDate, // Add the formatted contract date to formData
      });
    }
  };

  // aden added this code 

  // const initialFormData = {
  //   clientId: "",
  //   title: "",
  //   location: "",
  //   price: "",
  //   paymentType: "fixed",
  //   description: "",
  //   deadline:"",
  //   contractDate:"",
  //   hourlyRate:"",
  //   estimatedHours:"",
  //   contractDate:"",
  //   user: [],
  //   userId: [],
    
  //   // Add other fields here as needed
  // };

  // const [formData, setFormData] = useState(initialFormData);

  
  
  const [formData, setFormData] = useState({
    clientId: "",
    title: "",
    location: "",
    price: "",
    paymentType: "fixed",
    description: "",
    deadline:"",
    contractDate:"",
    hourlyRate:"",
    estimatedHours:"",
    contractDate:"",
    user: [],
    userId: [],
    status:'lead'



  });
  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    console.log("name and value", name, value)
  
    setFormData((prevFormData) => {
      switch (name) {
        case "userId":
          console.log("in userid case", value)
          return {
            
            ...prevFormData,
            userId: value, // Update the Business Developer selection
          };
        case "user":
          const selectedUsers = users.filter((user) => value.includes(user.userId));

                  return {
            ...prevFormData,
            user: selectedUsers, // Update Team Members selection
          };
        case "clientId":
          return {
            ...prevFormData,
            clientId: value, // Update Client selection
          };
        case "paymentType":
          return {
            ...prevFormData,
            paymentType: value, // Update Payment Type selection
          };
          default:
            return {
              ...prevFormData,
              [name]: value, // Generic update for any other fields
            };
        }
      });
      

    
    
    
    };
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value,
    // }));
    
  
  
  const [deliveryError, setDeliveryError] = useState(false);
  const [contractError, setContractError] = useState(false);


  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      toast.error("Auth token is missing.");
      return;
    }
  
    let userId;
    try {
      const decodedToken = jwtDecode(authToken);
      userId = decodedToken.userId;
    } catch (error) {
      toast.error("Invalid authentication token.");
      return;
    }
  
    if (!formData.deadline) {
      setDeliveryError(true);
      toast.error("Please select a delivery date.");
      return;
    } else {
      setDeliveryError(false);
    }
  
    if (!formData.contractDate) {
      setContractError(true);
      toast.error("Please select a contract signing date.");
      return;
    } else {
      setContractError(false);
    }
  
    // Conditionally set data based on paymentType
    let payload = {
      userId:formData.userId,
      clientId: formData.clientId,
      title: formData.title,
      location: formData.location,
      description: formData.description,
      deadline: formData.deadline,
      contractDate: formData.contractDate,
      paymentType: formData.paymentType,
      status: formData.status,
      membersArray: formData.user
      .map((user) => user.userId) // keep only userId for each user
    };
  
    if (formData.paymentType === 'fixed') {

      payload.price = formData.price;
    } else if (formData.paymentType === 'hourly') {
      payload.hourlyRate = formData.hourlyRate;
      payload.estimatedHours = formData.estimatedHours;
    }
  
    try {
      console.log("data", payload)
      const response = await fetch(`${apiUrl}/api/project/createProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success("Project created successfully!");
        console.log("Project saved:", data);
        if (onSuccess) {
          onSuccess();
        }
     
      } else {
        toast.error("Error saving project.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while saving the project.");
    }

    // aden's code
    setFormData({
    clientId: "",
    title: "",
    location: "",
    price: "",
    paymentType: "fixed",
    description: "",
    deadline:"",
    contractDate:"",
    hourlyRate:"",
    estimatedHours:"",
    contractDate:"",
    user: [],
    userId: [],
    status: "lead",
    });

    // setFormData(initialFormData);
    setDeliveryDate(null);
    setContractSigningDate(null);
  
  };
  
  
  const handleDelete = (memberToDelete) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: prevFormData.user.filter(
        (member) => member !== memberToDelete
      ),
    }));
  };
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/clients/getAllClients`); // Replace with your API endpoint
      const data = await response.json();
      console.log("client data", data.response)
      setClients(data.response); // Access the 'response' array inside the returned data
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/getAllUsers`); // Replace with your API endpoint
      const data = await response.json();
      console.log("user data", data.response)
      setUsers(data.response); // Access the 'response' array inside the returned data
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    



  };

  // Fetch data from the API
  useEffect(() => {
    
    fetchClients();
    fetchUsers();

  }, []);

  const [open, setOpen] = useState(false); // State to control modal
  const [newClient, setNewClient] = useState({ clientName: "", clientUrl: "" }); // State for new client form
  const [loading, setLoading] = useState(false); // State to handle loading spinner
  const [error, setError] = useState(null); // State to handle errors

  // Function to handle opening the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setNewClient({ clientName: "", clientUrl: "" }); // Reset form after closing
    setError(null); // Reset error state
  };

  // Function to handle adding a new client via API
  const handleAddClient = async () => {
    console.log("new client", newClient)
    if (!newClient.clientName || !newClient.clientUrl) {
      setError("Client Name and Url are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
console.log("in try")
const response = await fetch(`${apiUrl}/api/clients/createclient`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newClient),
});
  console.log("in response", response)
      if (response.ok) {
        fetchClients()
        handleClose(); 
      }
    } catch (err) {
      setError("Failed to add client. Please try again.");
    } finally {
      setLoading(false);
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
          

          <FormGrid size={{ xs: 12, md: 3 }}>
            <FormLabel
              className="!m-0 !p-0"
              htmlFor="project-title"
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
            >
              Project title
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>
            <OutlinedInput
              id="project-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the project title"
              required
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
        htmlFor="clientId"
        className="!m-0 !p-0"
      >
        Select Client
      </FormLabel>

      <p className="text-xs mb-2 text-gray-500"></p>
      </div>
      <div>
      <p className='cursor-pointer bg-[#6941C6] bg-opacity-15 text-[#6941C6] px-2 py-1 mt-[-5px] rounded-lg ' onClick={handleOpen}>
            Add Client
          </p>
          </div>
      </div>

      <FormControl fullWidth size="small">
  <Select
    labelId="clientId"
    id="clientId"
    name="clientId"
    value={formData.clientId}
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
    {clients.length === 0 ? (
      <MenuItem disabled value="">
        No Clients Available
      </MenuItem>
    ) : (
      clients.map((client) => (
        <MenuItem key={client.clientId} value={client.clientId}>
          {client.clientName} {/* Assuming each client has `clientId` and `clientName` fields */}
        </MenuItem>
      ))
    )}
  </Select>
</FormControl>


      {/* Modal for adding a new client */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
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
        htmlFor="clientName"
        className="!m-0 !p-0"
      >
        Client Name
      </FormLabel>
        <OutlinedInput
              id="clientName"
              type="text"
              value={newClient.clientName}
              onChange={(e) => setNewClient({ ...newClient, clientName: e.target.value })}
              placeholder="Enter the client name"
              required
              sx={{
                width:'100%', 
                               fontSize:'14px',
                borderRadius: '10px',
                marginY:'5px',

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
               <FormLabel
        sx={{
          fontSize: "14px",
          marginTop:'5px',

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
        htmlFor="clientUrl"
        className="!m-0 !p-0 mt-5"
      >
        Client Url
      </FormLabel>
           <OutlinedInput
              id="clientUrl"
              type="text"
              value={newClient.clientUrl}
              onChange={(e) => setNewClient({ ...newClient, clientUrl: e.target.value })}
              placeholder="Enter the client url"
              required
              sx={{
                width:"100%",
                fontSize:'14px',
                borderRadius: '10px',
                marginY:'5px',



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
         

          {error && <p style={{ color: "red" }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="">
            Cancel
          </Button>
          <Button onClick={handleAddClient} color="" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Add Client"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormGrid>


          <FormGrid size={{ xs: 12, md: 3 }}>
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
              htmlFor="project-location"
              className="!m-0 !p-0"
            >
              Project Location
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>

            <OutlinedInput
              id="project-location"
              name="location"
              value={formData.location}
              type="text"
              onChange={handleChange}
              placeholder="Enter the project location"
              required
              size="small"
              // sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6941C6 !important' }, }}
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

          <FormGrid size={{ xs: 12, md: 3 }}>
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
    htmlFor="delivery-deadline"
    className="!m-0 !p-0"
  >
    Deadline (Date of Delivery)
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
        name="deadline"
        value={deliveryDate} // Delivery date state
        onChange={(newValue) =>
          handleDateChange("deadline", newValue)
        } // Update deliveryDate
        renderInput={(params) => (
          <TextField
            required // Marking TextField as required
            {...params}
            variant="outlined"
            error={deliveryError} // Show error state
            helperText={deliveryError ? "Please select a delivery date." : ""} // Error message
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
            Please select a delivery date.
          </FormHelperText>
        )}
  </LocalizationProvider>
</FormGrid>


          <FormGrid size={{ xs: 12, md: 3 }}>
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
                    textField: { size:"small", placeholder: "Select a Date", InputProps: {
                      style: { fontSize: '14px', padding:'0px !important' }, // Font size for input text
                    } },
                  }}
                  sx={{
                    width: '100%',
                    fontSize:'14px',
    backgroundColor: 'white !important',
                    "& .MuiInputBase-root": {
          borderRadius: "10px", // Add border-radius here for MuiInputBase-root
        
        },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#6941C6 !important",
                      },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "lightgray !important",
                    },
                  }}
                  name="contractDate"
                  value={contractSigningDate} // Contract signing date state
                  onChange={(newValue) =>
                    handleDateChange("contractDate", newValue)
                  } // Update contractSigningDate
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      error={contractError} // Show error state
            helperText={contractError ? "Please select a contract date." : ""} // Error message
                      slotProps={{
                        inputLabel: { shrink: false, notched: false },
                        htmlInput: { placeholder: "Placeholder" },
                      }}
                      inputProps={{
                        style: { fontSize: "14px" }, // Font size for the input field
                      }}
                      InputLabelProps={{
                        style: { fontSize: "14px" }, // Font size for the placeholder (label)
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
              {contractError && (
          <FormHelperText contractError className='text-red-500'>
            Please select a contract date.
          </FormHelperText>
        )}
            </LocalizationProvider>
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 3 }}>
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
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            defaultValue="fixed"
            required
            sx={{
              borderRadius: '10px',
              fontSize: '14px',
              backgroundColor: "white !important",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6941C6 !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
            }}
          >
            <MenuItem value="fixed">Fixed</MenuItem>
            <MenuItem value="hourly">Hourly</MenuItem>
          </Select>
        </FormControl>
      </FormGrid>
     

      {/* Conditional Inputs */}
      {formData.paymentType === 'fixed' ? (
        // Project Price Input (Visible for "fixed" selection)
        <FormGrid size={{ xs: 12, md: 3 }}>
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
            htmlFor="project-price"
            className="!m-0 !p-0"
          >
            Project Price
          </FormLabel>
          <p className="text-xs mb-2 text-gray-500"></p>

          <OutlinedInput
            id="project-price"
            name="price"
            type="number"
            value={formData.price}  // I added this
            onChange={handleChange}
            inputProps={{
              pattern: "[0-9]*",
              title: "Please enter a valid number",
            }}
            placeholder="Enter project price"
            required
            size="small"
            sx={{
              fontSize: '14px',
              borderRadius: '10px',
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6941C6 !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
              "& input": {
                borderRadius: '10px',
                backgroundColor: "white !important",
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset !important",
                  boxShadow: "0 0 0 1000px white inset !important",
                  backgroundColor: "white !important",
                },
              },
            }}
          />
        </FormGrid>
      ) : (
        // Hourly Rate and Hours Worked Inputs (Visible for "hourly" selection)
        <>
        <FormGrid size={{ xs: 12, md: 3 }}>
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
            htmlFor="hourly-rate"
            className="!m-0 !p-0"
          >
            Hourly Rate
          </FormLabel>
          <p className="text-xs mb-2 text-gray-500"></p>

          <OutlinedInput
           id="hourly-rate"
              name="hourlyRate"
            type="number"
            onChange={handleChange}
            inputProps={{
              pattern: "[0-9]*",
              title: "Please enter a valid number",
            }}
            placeholder="Enter hourly rate"
            required
            size="small"
            sx={{
              fontSize: '14px',
              borderRadius: '10px',
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6941C6 !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
              "& input": {
                borderRadius: '10px',
                backgroundColor: "white !important",
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset !important",
                  boxShadow: "0 0 0 1000px white inset !important",
                  backgroundColor: "white !important",
                },
              },
            }}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 3 }}>
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
            htmlFor="hours-worked"
            className="!m-0 !p-0"
          >
            Est. Hours
          </FormLabel>
          <p className="text-xs mb-2 text-gray-500"></p>

          <OutlinedInput
            id="estimated-hours"
              name="estimatedHours"
            type="number"
            onChange={handleChange}
            inputProps={{
              pattern: "[0-9]*",
              title: "Please enter a valid number",
            }}
            placeholder="Enter estimated hours"
            required
            size="small"
            sx={{
              fontSize: '14px',
              borderRadius: '10px',
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6941C6 !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
              "& input": {
                borderRadius: '10px',
                backgroundColor: "white !important",
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset !important",
                  boxShadow: "0 0 0 1000px white inset !important",
                  backgroundColor: "white !important",
                },
              },
            }}
          />
        </FormGrid>
         

         
          </>
      )}
          <FormGrid size={{ xs: 12, md: 3 }}>
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
          htmlFor="status"
          className="!m-0 !p-0"
        >
          Project Status        </FormLabel>
        <p className="text-xs mb-2 text-gray-500"></p>

        <FormControl fullWidth size="small">
          <Select
            labelId="status"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            defaultValue="lead"
            required
            sx={{
              borderRadius: '10px',
              fontSize: '14px',
              backgroundColor: "white !important",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6941C6 !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23) !important",
              },
            }}
          >
            <MenuItem value="lead">Lead</MenuItem>
            <MenuItem value="notsecured">Not Secured</MenuItem>
            <MenuItem value="ongoingproject">Ongoing Project</MenuItem>
            <MenuItem value="projectcancelled">Project Cancelled</MenuItem>
            <MenuItem value="successfullycompleted">Completed</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>

          </Select>
        </FormControl>
      </FormGrid>

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
        htmlFor="userId"
        className="!m-0 !p-0"
      >
        Select Business Developer
      </FormLabel>

      <p className="text-xs mb-2 text-gray-500"></p>
      </div>
    
      </div>

      <FormControl fullWidth size="small">
  <Select
    labelId="userId"
    id="userId"
    name="userId"
    value={formData.userId}
    onChange={handleChange}
    required
    sx={{
      maxHeight:'40px',
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
    {users.length === 0 ? (
      <MenuItem disabled value="">
        No Internees Available
      </MenuItem>
    ) : (
      users.map((user) => (
        <MenuItem key={user.userId} value={user.userId}>
          {user.name} {/* Assuming each client has `clientId` and `clientName` fields */}
        </MenuItem>
      ))
    )}
  </Select>
</FormControl>


      {/* Modal for adding a new client */}
   
    </FormGrid>
    <FormGrid size={{ xs: 12, md: 12 }}>
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
        htmlFor="user"
        className="!m-0 !p-0"
      >
        Team Members
      </FormLabel>            <p className="text-xs mb-2 text-gray-500"></p>
            <FormControl fullWidth size="small">
              <Select
                name="user" // This ensures 'teamMember' is used as the key
                multiple
                value={formData.user.map((member) => member.userId)} // Display selected IDs
                onChange={handleChange}
                input={
                  <OutlinedInput
                    size="small"
                    multiline={true}
                    rows={1}
                    sx={{
                      maxHeight: "70px",
                      borderRadius: '10px',
                      fontSize: '14px',
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
                    }}
                   
                  />
                }
                renderValue={(selected) => (
                  <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    maxHeight: "50px",
                    overflow: "auto",
                  }}
                >
                  {formData.user.map((member) => (
        <Chip
          key={member.userId}
          label={member.name} // Show name here
          onDelete={() => handleDelete(member)}
          onMouseDown={(event) => event.stopPropagation()}
          sx={{ height: "24px", fontSize: "0.75rem", padding: "2px 4px" }}
        />
      ))}
                </Box>
                
                )}
                required
              >
               {users.map((user) => (
    <MenuItem
      key={user.userId}
      value={user.userId}
      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      {user.name}
      {formData.user.some((member) => member.userId === user.userId) && (
        <CheckIcon sx={{ color: "green", ml: 2 }} />
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
            >
              Project Description
            </FormLabel>
            <p className="text-xs mb-2 text-gray-500"></p>
            <OutlinedInput
              id="project-description"
              name="description"
              value={formData.description}
              type="text"
              onChange={handleChange}
              placeholder="Enter the project description"
              required
              multiline
              // maxRows={4}
              rows={4}
              sx={{
                fontSize:'14px',
                borderRadius: '10px',

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
