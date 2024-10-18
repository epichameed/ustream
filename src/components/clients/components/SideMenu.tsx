import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import { IoLogoEdge } from "react-icons/io5";
import Search from "./Search";
const drawerWidth = 280;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    height: "100%", // Ensure the drawer takes up the full height
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "white",
          border: "none",
        },
      }}
    >
      {/* Full height container for the Drawer */}
      <Box
        sx={{
          px: 2.5,
          display: "flex",
          flexDirection: "column",
          height: "100%", // Ensure the Box takes the full height
          justifyContent: "space-between", // Push content to the top and bottom
        }}
      >
        {/* Top section: Logo and Search */}
        <Box>
          <Box
            sx={{
              display: "flex",
              py: 1.3,
              pt: 3.5,
              alignItems: "center",
            }}
          >
            <IoLogoEdge fontSize={"25px"} color={"#6941C6"} />
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, lineHeight: "16px", padding: "10px" }}
            >
              UStreams
            </Typography>
          </Box>

          {/* Search Component */}
          <Box
            sx={{
              display: "flex",
              pb: 0.7,
              alignItems: "center",
            }}
          >
            <Search />
          </Box>
        </Box>

        {/* Menu Content: It will grow to fill the available space */}
        <Box sx={{ flexGrow: 1 }}>
          <MenuContent />
        </Box>

        {/* Bottom section: Avatar and Options */}
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/images/avatar-5.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              Riley Carter
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              riley@email.com
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Box>
    </Drawer>
  );
}
