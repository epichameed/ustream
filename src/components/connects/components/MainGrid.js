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
import { useState } from "react";

export default function ConnectsGrid() {
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleFormSuccess = () => {
    setSubmissionStatus("Form submitted successfully!");
    console.log("Form was submitted successfully");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h5" sx={{ mb: 1 }}>
        Connects Form
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
        Please fill in your connects report here for freelancing data.
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <AddressForm onSuccess={handleFormSuccess} />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h5" sx={{ mb: 1, mt: 4 }}>
        Connects Reports
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
        Here you will find your connects report of freelancing data.
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12} lg={12}>
          {/* Pass the submissionStatus to CustomizedDataGrid */}
          <CustomizedDataGrid submissionStatus={submissionStatus} />
        </Grid>
      </Grid>
      {/* <Copyright sx={{ my: 4 }} /> */}
    </Box>
  );
}
