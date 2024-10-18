import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { BsStars } from "react-icons/bs";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function Content() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: "url('/images/upwork-signin-test2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.78,
          backgroundColor: "#432782",
          zIndex: 1,
        }}
      />

      <Stack
        sx={{
          zIndex: 2,
          textAlign: "center",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          paddingX: 2,
        }}
      >
        <div className="text-white px-24 py-0">
          {/* <BsStars fontSize={"70px"} className="my-12 py-0 mt-0" /> */}

          <h1 className="text-6xl flex gap-3 mb-4 text-white ">
            <p className="text-left text leading-[80px]">
              <span className="font-bold"> SConsultants</span> - Freelancer Activity
              Tracker
            </p>
          </h1>
          <p className="mb-8 text-white text-left opacity-80">
            Boost your freelance career with real-time analytics and actionable
            insights. Track progress and stay ahead in the marketplace.
          </p>
          <div className="items-left flex gap-3">
            <AvatarGroup
              renderSurplus={(surplus) => (
                <span>+{surplus.toString()[0]}k</span>
              )}
            >
              <Avatar alt="Remy Sharp" src="/images/avatar-1.jpg" />
              <Avatar alt="Travis Howard" src="/images/avatar-2.jpg" />
              <Avatar alt="Agnes Walker" src="/images/avatar-3.jpg" />
              <Avatar alt="Trevor Henderson" src="/images/avatar-4.jpg" />
              <Avatar alt="Trevor Henderson" src="/images/avatar-5.jpg" />
            </AvatarGroup>
            <div>
              <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                <Rating
                  name="text-feedback"
                  value={5}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Box sx={{ ml: 2 }}>5.0</Box>
              </Box>

              <p className="text-left opacity-80">from 200+ reviews</p>
            </div>
          </div>
        </div>
      </Stack>
    </Box>
  );
}
