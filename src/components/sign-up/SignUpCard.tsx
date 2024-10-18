import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Tooltip from "@mui/material/Tooltip";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { IoLogoEdge } from "react-icons/io5";
import { CircularProgress, MenuItem } from "@mui/material";
import Link from "@mui/material/Link";
import { FormHelperText } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import {useState} from "react";

// import MenuItem from "@mui/material/MenuItem";

export default function SignUpCard() {
  const router = useRouter();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [batchError, setBatchError] = React.useState(false);
  const [batchErrorMessage, setBatchErrorMessage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordValidations, setPasswordValidations] = React.useState({
    minLength: false,
    hasSpecialChar: false,
  });
  const [loading, setLoading] = React.useState(false);

  const [selectedBatch, setSelectedBatch] = useState(""); // State to track selected batch

  const handleBatchChange = (event:any) => {
    console.log("batch", event.target.value);
    setSelectedBatch(event.target.value);
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const batchInput = document.getElementById("batch") as HTMLInputElement;

    

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!nameInput.value) {
      setNameError(true);
      setNameErrorMessage("Please enter your name.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    const containsSpecialChar = hasSpecialChar(passwordInput.value);
    if (!passwordInput.value || passwordInput.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else if (!containsSpecialChar) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must contain at least one special character."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!selectedBatch) {
      setBatchError(true);
      setBatchErrorMessage("Please select your batch.");
      isValid = false;
    } else {
      setBatchError(false);
      setBatchErrorMessage("");
    }

    return isValid;
  };

  const hasSpecialChar = (value: string) => {
    const specialChars = "!@#$%^&*(),.?-_;/`|<>";
    return value.split("").some((char) => specialChars.includes(char));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      console.log(
        "values",
        data.get("email"),
        data.get("name"),
        data.get("password"),
        selectedBatch,
        // data.get("batch")
      );

      const formData = {
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("name"),
        batch: selectedBatch,
        
        // data.get("batch"),
      };

      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/createUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        console.log("response", response);
        setLoading(false);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response Data:", result); // Add this line to log the response

        if (result.error) {
          toast.error(result.error);
        }
        if (result.response) {
          toast.success("User created successfully!");
          window.location.href = "/";
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to create user. Please try again.");
      }
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    const hasMinLength = value.length >= 6;
    const containsSpecialChar = hasSpecialChar(value);

    setPasswordValidations({
      minLength: hasMinLength,
      hasSpecialChar: containsSpecialChar,
    });
  };

  const batches = [
    {
      value: "2",
      label: "Batch-2",
    },
    {
      value: "3",
      label: "Batch-3",
    },
  ];

  

  return (
    <div className="py-0 px-16">
      <ToastContainer />
      {/* <IoLogoEdge className="mb-4" color="#6941C6" fontSize="28px" /> */}
      {/* <img
        src="images/SC-Symbol.png"
        alt="logo"
        width="35px"
        height="35px"
        // className="pb-2"
      /> */}

<img src='images/SC-Symbol.png' alt='logo' width='28px' height='28px'
      style={{paddingBottom: '10px',

        marginTop: '20px',
      }} />

      <Typography
        variant="h5"
        sx={{
          width: "100%",
          fontWeight: 500,
          marginBottom: 1, // I changed this from 3 - 1
          // marginTop: 1,  // I added this
        }}
      >
        Sign Up
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          color: "gray",
          marginBottom: 2, // I changed this from 3 - 1
          marginTop: 1,
        }}
      >
        Fill in your details below to create your account.
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 1.5, // I changed this from 2 - 1
          // marginBottom: 1,  // I added this
        }}
      >
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel className="text-[13px] text-black" htmlFor="name">
              Name
            </FormLabel>
          </Box>
          <Box sx={{ position: "relative" }}>
            <TextField
              name="name"
              placeholder="Enter your name"
              type="text"
              id="name"
              autoComplete="off"
              required
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: nameError && (
                  <Tooltip title={nameErrorMessage} arrow>
                    <WarningRoundedIcon
                      sx={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ),
                sx: {
                  marginTop: "4px", // I changed this from 7 - 1
                  fontSize: "14px",
                  border: "1px solid lightgray",
                  borderRadius: "8px",
                  "& .MuiInputBase-input": {
                    paddingX: "12px",
                    paddingY: "8px",
                    border: "none",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              }}
            />
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel className="text-[13px] text-black" htmlFor="email">
            Email
          </FormLabel>
          <Box sx={{ position: "relative" }}>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              fullWidth
              autoComplete="off"
              InputProps={{
                endAdornment: emailError && (
                  <Tooltip title={emailErrorMessage} arrow>
                    <WarningRoundedIcon
                      sx={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ),
                sx: {
                  fontSize: "14px",
                  border: "1px solid lightgray",
                  marginTop: "7px", // I changed this from 7 - 4
                  borderRadius: "8px",
                  "& .MuiInputBase-input": {
                    paddingX: "12px",
                    paddingY: "8px",
                    border: "none",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              }}
            />
          </Box>
        </FormControl>

        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel className="text-[13px] text-black" htmlFor="password">
              Password
            </FormLabel>
          </Box>
          <Box sx={{ position: "relative" }}>
            <TextField
              name="password"
              placeholder="Create a password"
              type="password"
              id="password"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
              InputProps={{
                endAdornment: passwordError && (
                  <Tooltip title={passwordErrorMessage} arrow>
                    <WarningRoundedIcon
                      sx={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ),
                sx: {
                  fontSize: "14px",
                  marginTop: "7px", // I changed this from 7 - 4
                  border: "1px solid lightgray",
                  borderRadius: "8px",
                  "& .MuiInputBase-input": {
                    paddingX: "12px",
                    paddingY: "8px",
                    border: "none",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              }}
              onChange={handlePasswordChange}
            />
          </Box>
          <Typography
            sx={{
              gap: 1,
              display: "flex",
              marginTop: "13px", // I changed this from 13 - 7
              alignItems: "center",
              fontSize: "13px",
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                color: passwordValidations.hasSpecialChar
                  ? "#04bf17"
                  : "#dedede",
                transition: "color 0.3s ease",
                fontSize: "15px", // I changed this from 15 - 13
              }}
            />
            Must contain one special character or number.
          </Typography>
          <Typography
            sx={{
              gap: 1,
              display: "flex",
              marginTop: "8px", //I changed this from 8 - 7
              alignItems: "center",
              fontSize: "13px",
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                color: passwordValidations.minLength ? "#04bf17" : "#dedede",
                fontSize: "15px",
                transition: "color 0.3s ease",
              }}
            />
            Must be at least 6 characters long.
          </Typography>
        </FormControl>

<FormControl>
          <FormLabel className="text-[13px] text-black" htmlFor="batch" 
          sx={{marginBottom:"7px",
              "&.Mui-focused": {
                color: "black",
              },
          
          }}
          >
            Batch
          </FormLabel>
          <Box sx={{ position: "relative" }}>
          
            <Select
              id="batch"
              name="batch"
              fullWidth
              variant="outlined"
              value={selectedBatch}
              onChange={handleBatchChange}
              // placeholder="Select your batch"
              displayEmpty
              required
              size="small"
              error={batchError}
              sx={{
                fontSize: "14px",
                marginTop: "0px",  //I changed it from 7 - 0
                marginBottom: "5px",
                border: "1px solid lightgray",
                borderRadius: "8px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  paddingX: "12px",
                  paddingY: "8px",
                  border: "none",
                  "&:focus": {
                    backgroundColor: "transparent",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              <MenuItem value="" disabled
              
              >
          <span style={{ color: 'gray' }}>Select your batch</span>
        
      </MenuItem>
              {batches.map((batch) => (
                <MenuItem
                  key={batch.value}
                  style={{
                    fontSize: "13px", // Adjust font size of options
                    backgroundColor: "transparent", // Background color for options
                    
                  }}
                  value={batch.value}
                >
                  {batch.label}
                </MenuItem>
              ))}
            </Select>
            {batchError && (
              <FormHelperText error>{batchErrorMessage}</FormHelperText>
            )}
          </Box>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: loading ? "#ebebeb" : "#6941C6",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: loading ? "#ebebeb" : "#53389E",
            },
            gap: 1,
          }}
        >
          {!loading ? (
            <>
              <FaLongArrowAltRight color="#04d91a" /> <p>Get started</p>
            </>
          ) : (
            <>
              <CircularProgress size={20} sx={{ color: "white" }} />
              <p className="text-white">Signing up</p>
            </>
          )}
        </Button>
        <Typography sx={{ textAlign: "center", fontSize: "14px",
          marginBottom: '9px'


         }}>
          Already have an account?{" "}
          <span>
            <Link
              href="/"
              sx={{
                alignSelf: "center",
                color: "#6941C6",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </span>
        </Typography>
      </Box>
    </div>
  );
}
