import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import getDashboardTheme from "./dashboard/theme/getDashboardTheme";
import DashboardHeader from "./dashboard/components/Header";
import DashboardGrid from "./dashboard/components/MainGrid";
import ProjectsHeader from "./projects/components/Header";
import ProjectsGrid from "./projects/components/MainGrid";
import AdminProjectsGrid from "./projects/components/AdminMainGrid";
import ReportsHeader from "./reports/components/Header";
import ReportsGrid from "./reports/components/MainGrid";
import ClientsHeader from "./clients/components/Header";
import AdminClientsGrid from "./clients/components/AdminMainGrid";
import ClientsGrid from "./clients/components/MainGrid";
import Portfolio from "./portfolio/portfolio"
import ConnectsHeader from "./connects/components/Header";
import ConnectsGrid from "./connects/components/MainGrid";
import TransactionsHeader from "./transactions/components/Header";
import TransactionsGrid from "./transactions/components/MainGrid";
import { useState } from "react";
import SideMenu from "./SideMenu";
import { RoleContext, SelectedRouteContext } from "../../context/context";
import Projects from './projects/Projects';

export default function Dashboard() {
  const [role] = React.useContext(RoleContext);
  const [selectedRoute, setSelectedRoute] =
    React.useContext(SelectedRouteContext);
  const handleMenuItemSelect = (route) => {
    console.log(route,"=======check1")
    setSelectedRoute(route); // Update selected route in Dashboard
    console.log("Route selected", route);
  };

  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [expanded, setExpanded] = React.useState(true);




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

  // Helper function to render content based on the selected route
  const renderContent = () => {
    if (!role) return;
    switch (selectedRoute) {
      case "/dashboard":
        return (
          <>
            <DashboardHeader />
            <DashboardGrid />
          </>
        );
      case "/reports":
        return (
          <>
            <ReportsHeader />
            <ReportsGrid />
          </>
        );
        case "/connects":
          return (
            <>
              <ConnectsHeader />
              <ConnectsGrid />
            </>
          );
      case "/projects":
        return (
          <>
            <ProjectsHeader />
            <ProjectsGrid />
            
            
          </>
        );
        case "/adminProjects":
        return (
          <>
            <ProjectsHeader />
            <AdminProjectsGrid />
          </>
        );
        case "/clients":
          return (
            <>
              <ClientsHeader />
              <ClientsGrid />
            </>
          );

          case "/adminClients":
            return (
              <>
                <ClientsHeader />
                <AdminClientsGrid />
              </>
            );         
             case "/portfolio":
          return (
            <Portfolio />
          );
          case "/transactions":
            return (
              <>
<TransactionsHeader />
              <TransactionsGrid />   
              </>      
               );
      default:
        return (
          <>
            <DashboardHeader />
            <DashboardGrid />
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", backgroundColor: "white", height: '100vh' }}>
        <SideMenu
        expanded = {expanded}
        setExpanded={setExpanded}
          selectedRoute={selectedRoute}
          onSelectRoute={handleMenuItemSelect}
        />
        
        <Box
          sx={{
            pt: 1.2,
            width: '85%',
            borderWidth: "1px",
            borderColor: "border-gray-200",
            // borderRight: 0,
            // borderBottom: 0,
            // borderTopLeftRadius: "28px",
            overflow: "hidden",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            width:'85%'
          }}
        >
          
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
                height:'100%',
                alignItems: "center",
                mx: 3,
                pb: 10,
                mt: { xs: 8, md: 0 },
              }}
            >
              {/* Conditionally render the content based on selectedRoute */}
              {renderContent()}
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
