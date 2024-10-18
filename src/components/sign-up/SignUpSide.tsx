import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignSideTheme from "../authTheme/getSignSideTheme";
import SignUpCard from "./SignUpCard";
import Content from "./Content";

export default function SignUpSide() {
  const SignUpSideTheme = createTheme(getSignSideTheme());
  const [slideIn, setSlideIn] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIn(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={SignUpSideTheme}>
      <CssBaseline enableColorScheme />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "space-between",
            height: { xs: "auto", md: "100vh" },
          },
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            m: "auto",
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            sx={{
              flex: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Content />
          </Stack>

          <Stack
            sx={{
              flex: 2.9,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SignUpCard />
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
