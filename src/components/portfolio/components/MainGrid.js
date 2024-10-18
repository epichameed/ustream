import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./StatCard";
import SessionsChart from "./SessionsChart";
import PageViewsBarChart from "./PageViewsBarChart";
import CustomizedDataGrid from "./CustomizedDataGrid";
import CustomizedTreeView from "./CustomizedTreeView";
import ChartUserByCountry from "./ChartUserByCountry";
import Copyright from "../internals/components/Copyright";
import Stack from "@mui/material/Stack";
import AddressForm from "./AddressForm";
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

export default function ProjectsGrid() {
  const teamMembers = ['Maryam', 'Aden', 'Ali Haider', 'Usman', 'Tahira', 'Umar','Aimen'];
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h5" sx={{ mb: 1 }}>
        Project Form
      </Typography>
      {/* New line added here */}
      <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
        Please fill in your project details here for freelancing data.
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <AddressForm teamMembers={teamMembers}/>
        </Grid>
        {/* <Grid item xs={4}> */}
          {/* <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <ChartUserByCountry />
          </Stack> */}
        {/* </Grid> */}
      </Grid>

      {/* cards */}
      {/* <Typography sx={{fontSize:'30px'}} component="h4" variant="h4">
        Welcome back, Riley
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "gray" }}>
        Track and manage your freelance projects and tasks efficiently.
      </Typography>

      <Grid container spacing={2} sx={{ mb: (theme) => theme.spacing(2) }}>
        {data.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid item sm={12} md={6}>
          <SessionsChart />
        </Grid>
        <Grid item sm={12} md={6}>
          <PageViewsBarChart />
        </Grid>
      </Grid> */}
      <Typography component="h2" variant="h5" sx={{ mb: 1, mt: 4 }}>
        Project Reports
      </Typography>
      {/* New line added here */}
      <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
        Here you will find your project report of freelancing data.
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12} lg={12}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
      {/* <Copyright sx={{ my: 4 }} /> */}
    </Box>
  );
}
