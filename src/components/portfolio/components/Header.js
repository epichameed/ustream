import * as React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import { IoIosNotifications } from "react-icons/io";

import Search from "./Search";

export default function ProjectsHeader() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 2.4,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* <Search /> */}
        <CustomDatePicker />
        <MenuButton
          sx={{ backgroundColor: "#6941C6" }}
          showBadge
          aria-label="Open notifications"
        >
          <IoIosNotifications color="white" />
        </MenuButton>
      </Stack>
    </Stack>
  );
}
