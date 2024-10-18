import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BsStars } from "react-icons/bs";
import { BiSelectMultiple, BiCustomize } from "react-icons/bi";
import { GoListUnordered } from "react-icons/go";
import { BsCardChecklist } from "react-icons/bs";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const items = [
  {
    icon: <BiSelectMultiple style={{ color: "#6941C6" }} />,
    title: "Easy Template Selection",
    description:
      "Browse and choose from a diverse range of professional resume templates that match your personal style and career goals.",
  },
  {
    icon: <BiCustomize style={{ color: "#6941C6" }} />,
    title: "Customizable Sections",
    description:
      "Modify each section of your resume effortlessly, allowing you to tailor your document to highlight your skills and achievements effectively.",
  },
  {
    icon: <GoListUnordered style={{ color: "#6941C6" }} />,
    title: "Organized Layout",
    description:
      "Ensure your resume is well-organized and visually appealing, with a layout that clearly presents your information in a structured way.",
  },
  {
    icon: <BsCardChecklist style={{ color: "#6941C6" }} />,
    title: "Professional Quality",
    description:
      "Craft a resume that meets professional standards, featuring tools and options designed to help you create a standout document for your job search.",
  },
];

export default function Content() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: "url('/images/upwork-signin-test2.jpg')", // Update with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
      }}
    >
      {/* Color Mask */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.85,
          backgroundColor: "#432782", // Purple color with opacity
          zIndex: 1,
        }}
      />

      {/* Content Box */}
      <Stack
        sx={{
          zIndex: 2,
          // maxWidth: `700px`,
          textAlign: "center",
          position: "absolute", //aden
          // border: '2px solid red', //aden
          display: "flex",
          alignItems: "center",
          paddingX: 2,

          // paddingY: 0,
        }}
      >
        <div className="text-white px-24 py-0">
          {/* <BsStars fontSize={"70px"} className="my-12 py-0 mt-0" /> */}

          <h1 className="text-6xl flex gap-3 mb-4 text-white ">
            <p className="text-left text leading-[80px]">
              <span className="font-bold"> SConsultants</span> - Freelancer Activity
              Tracker
              {/* <span className="text-[#F3F4F6]"> Resume Builder</span> */}
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
