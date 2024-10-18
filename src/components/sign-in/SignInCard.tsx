import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Tooltip from "@mui/material/Tooltip";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { useRouter } from "next/navigation";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IoLogoEdge } from "react-icons/io5";
import ForgotPassword from "./ForgotPassword";
import Cookies from "js-cookie";
import Checkbox from "@mui/material/Checkbox";
import { SvgIcon, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RoleContext } from "../../../context/context";

const CustomCheckboxIcon = styled(SvgIcon)(({ theme }) => ({
  borderRadius: "6px",
  border: "2px solid lightgray",
  backgroundColor: "transparent",
  "& path": {
    fill: "transparent",
    stroke: "black",
    strokeWidth: "2px",
  },
}));

const CustomCheckedIcon = styled(SvgIcon)(({ theme }) => ({
  borderRadius: "6px",
  border: "2px solid #04d91a",
  backgroundColor: "#04d91a",
  "& path": {
    fill: "#04d91a",
    stroke: "#ffffff",
    strokeWidth: "3px",
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  backgroundColor: "white",
  padding: theme.spacing(12),
  gap: theme.spacing(0),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [, setRole] = React.useContext(RoleContext);
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles the click event on the "Forgot Password" button.
   * Sets the state of the open dialog to true.
   */
  /******  9dd0c573-f60f-49d2-acd7-60a9dffa082b  *******/
  const handleClickOpen = () => {
    setOpen(true);
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      console.log("in role");
      const formData = {
        email: data.get("email"),
        password: data.get("password"),
        role: "user",
      };

      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
          setLoading(false);
        }

        const result = await response.json();
        if (result.error) {
          console.log("result", result.error);
          toast.error(result.error);
          setLoading(false);
        } else if (result.response.token) {
          if (rememberMe) {
            localStorage.setItem("authToken", result.response.token);
          } else {
            sessionStorage.setItem("authToken", result.response.token);
          }
          Cookies.set("authToken", result.response.token, { path: "/" });
          setRole(result.response.role);
          window.location.href = "/dashboard";
          // router.push("/dashboard");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to Login. Please try again.");
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <div className="p-16">
      <ToastContainer />
      {/* <IoLogoEdge className="mb-4" color="#6941C6" fontSize="28px" /> */}
      <img src='images/SC-Symbol.png' alt='logo' width='28px' height='28px'
      style={{paddingBottom: '10px'}} />

      <Typography
        variant="h5"
        sx={{
          width: "100%",
          fontWeight: 500,
        }}
      >
        Sign In
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          color: "gray",
          marginBottom: 3,
          marginTop: 1,
        }}
      >
        Welcome Back! Please enter your details.
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
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
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
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
                  marginTop: "7px",
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
          <Box
            sx={{
              position: "relative",
              my: 0,
            }}
          >
            <TextField
              name="password"
              placeholder="Enter your password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
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
                  marginTop: "7px",
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 0,
            paddingTop: "0px",
            paddingBottom: 0,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                icon={<CustomCheckboxIcon />}
                checkedIcon={
                  <CustomCheckedIcon>
                    <path d="M6 13l4 4L18 7" />
                  </CustomCheckedIcon>
                }
                sx={{
                  transform: "scale(0.78)",
                  paddingRight: "4px",
                }}
              />
            }
            label="Remember me"
            sx={{
              padding: "0px",
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
              },
              "& .MuiCheckbox-root": {
                marginLeft: "0px",
              },
            }}
          />
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            sx={{
              color: "#6941C6",
              textDecoration: "none",
              fontSize: "14px",
              textDecorationColor: "rgba(105, 65, 198, 0.5)",
              "&:hover": {
                textDecoration: "underline",
                textDecorationColor: "#6941C6",
              },
            }}
          >
            Forgot your password?
          </Link>
        </div>
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          disabled={loading}
          onClick={validateInputs}
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
              <FaLongArrowAltRight color="#04d91a" /> <p>Sign In</p>
            </>
          ) : (
            <>
              <CircularProgress size={20} sx={{ color: "white" }} />
              <p className="text-white">Signing in</p>
            </>
          )}
        </Button>
        <Typography sx={{ textAlign: "center", fontSize: "14px" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Link
              href="/signup"
              sx={{
                alignSelf: "center",
                color: "#6941C6",
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>
          </span>
        </Typography>
      </Box>
    </div>
  );
}
