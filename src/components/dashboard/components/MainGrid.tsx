import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./StatCard";
import SessionsChart from "./SessionsChart";
import PageViewsBarChart from "./PageViewsBarChart";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie"; // Import js-cookie
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useRef } from 'react';

const data = [
  {
    title: "Users",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: "Conversions",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220,
    ],
  },
  {
    title: "Event count",
    value: "200k",
    interval: "Last 30 days",
    trend: "up",
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function DashboardGrid() {
  const [userName, setUserName] = useState<string>("");
 
  useEffect(() => {
    console.log("in use effect");
    const token = Cookies.get("authToken"); // Adjust to get token from cookies
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const fullName = decoded.name; // assuming 'name' contains the full name
        const firstSpaceIndex = fullName.indexOf(" "); // find the index of the first space
        const firstName =
          firstSpaceIndex !== -1
            ? fullName.slice(0, firstSpaceIndex)
            : fullName; // extract the first name

        setUserName(firstName);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" , height:'100%'} }}>
      {/* cards */}
      <Typography sx={{ fontSize: "30px" }} component="h4" variant="h4">
        Welcome back, <span className="capitalize">{userName}</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "gray" }}>
        Track and manage your freelance projects and tasks efficiently.
      </Typography>

      <div
    style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "2200px", // Set a fixed height or use "100vh"
        overflow: "hidden",
        position: "relative",
    }}
>
    <iframe
        title="latest"
        width="100%" // Make the width responsive
        src="https://app.powerbi.com/view?r=eyJrIjoiM2M0MjYxYTItNTE0Yy00ZGEwLWE4YjQtZDE5ZmFhYjhjNjkzIiwidCI6IjM4ZTIwZGJlLTYwOGQtNDJkMi04YjdkLTA5YjdjNzc5MzRhMSIsImMiOjl9"                       style={{
            height: "155%", // Set height greater than container
            marginBottom: "-5%", // Move the iframe up by 5%
            marginTop: "0", // Ensure no extra space from the top
        }}
    />
</div>



    </Box>
  );
}
