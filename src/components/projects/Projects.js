import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import getDashboardTheme from "./theme/getDashboardTheme";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";
import SideMenu from "../SideMenu";

export default function Projects() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      setMode(systemPrefersDark ? "light" : "light");
    }
  }, []);

  return (
    <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", backgroundColor: "white" }}>
        <SideMenu />
        <Box
          sx={{
            mt: 2,
            borderWidth: "1px",
            borderColor: "border-gray-200",
            borderRight: 0,
            borderBottom: 0,
            borderTopLeftRadius: "28px",
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          <AppNavbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: "white", // Set background to white
              overflow: "auto",
            }}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
                mx: 3,
                pb: 10,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              <MainGrid />
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );

  // return (
  //   <div style={{ height: '100%', display: 'flex', alignItems: 'center'}}>
  //     <h1 className='font-bold text-[40px]'>We're building this page for you. Please check back later!</h1>
  //   </div>
  // );
}
