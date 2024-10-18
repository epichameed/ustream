import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Stack } from "@mui/material";
import { TbReport } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlinePictureInPictureAlt } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { RoleContext } from "../../context/context";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { BiDialpadAlt } from "react-icons/bi";
import { GoProjectRoadmap } from "react-icons/go";
import { TbTransactionDollar } from "react-icons/tb";
import { PiPictureInPictureFill } from "react-icons/pi";

// List Items with Routes
const mainListItems = [
  {
    text: "Overview",
    icon: <LuLayoutDashboard fontSize="18px" />,
    route: "/dashboard",
  },
  {
    text: "Reports",
    icon: <TbReport fontSize="18px" />,
    route: "/reports",
  },
  {
    text: "Projects",
    icon: <GoProjectRoadmap fontSize="18px" />,
    route: "/projects",
  },
  {
    text: "Portfolio",
    icon: <PiPictureInPictureFill fontSize="18px" />,
    route: "/portfolio",
  },
  {
    text: "Connects",
    icon: <BiDialpadAlt fontSize="18px" />,
    route: "/connects",
  },
  {
    text: "Clients",
    icon: <AiOutlineUsergroupDelete fontSize="18px" />,
    route: "/clients",
  },
  {
    text: "Transactions",
    icon: <TbTransactionDollar fontSize="18px" />,
    route: "/transactions",
  },
  {
    text: "Projects",
    icon: <GoProjectRoadmap fontSize="18px" />,
    route: "/adminProjects",
  },
  {
    text: "Clients",
    icon: <AiOutlineUsergroupDelete fontSize="18px" />,
    route: "/adminClients",
  },
  {
    text: "Leads",
    icon: <TbTransactionDollar fontSize="18px" />,
    route: "/adminLeads",
  },
  {
    text: "Portfolio",
    icon: <PiPictureInPictureFill fontSize="18px" />,
    route: "/adminPortfolio",
  },
];


const secondaryListItems = [
  {
    text: "About",
    icon: <AiOutlineInfoCircle fontSize="18px" />,
    route: "/about",
  },
  {
    text: "Settings",
    icon: <IoSettingsOutline fontSize="18px" />,
    route: "/settings",
  },
];

export default function MenuContent({ selectedRoute, onSelectRoute,expanded }) {
  const [role] = React.useContext(RoleContext);
  console.log(role, "=======role");
  console.log(selectedRoute, "=======route");

  return (
    <Stack
      sx={{ flexGrow: 1, justifyContent: "space-between", height: "100%" }}
    >
      <List dense sx={{ padding: 0, paddingTop: "10px" }}>
        {mainListItems
          .filter((item) => {
            if (!role) return false; // Return false if there's no role

            // If role is "admin", only return items where the text is "Overview"
            if (role === "admin")
              return item.text === "Overview" || item.text === "Connects" || item.route == "/adminProjects" || item.route=='/adminClients' || item.route=='/adminPortfolio' || item.route=='/adminLeads' ;

            // If role is "user", exclude "Overview"; otherwise, include everything
            return (
              role !== "user" ||
              (item.text !== "Overview" && item.text !== "Connects" && item.route !== '/adminProjects' && item.route !== '/transactions'&& item.route !== '/adminClients' && item.route !== '/adminPortfolio' && item.route !== '/adminLeads')
            );
          })

          .map((item) => (
            <ListItem
              key={item.route}
              sx={{ display: "block", padding: 0, py: "2px" }}
            >
              {console.log("item.route", item.route, item.text)}

              <ListItemButton
        sx={{
          padding: "9px",
          "&.Mui-selected": { backgroundColor: "#F9FAFB !important" },
          "&:hover": { backgroundColor: "#F9FAFB" },
        }}
        selected={selectedRoute === item.route} // Pass selected state from Dashboard
        onClick={() => onSelectRoute(item.route)} // Call parent's handler
        disabled={
          item.route === "/adminLeads" || item.route === "/adminPortfolio"
        } // Disable specific items
      >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <div
        className={`overflow-hidden transition-all duration-700 ease-in-out`}
        style={{
          width: expanded ? '100%' : '0%',
        }}
      >
        <ListItemText primary={item.text} />
      </div>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <List dense sx={{ mt: "auto", padding: 0 }}>
        {secondaryListItems.map((item) => (
          <ListItem
            key={item.route}
            sx={{ display: "block", padding: 0, py: "2px" }}
          >
            <ListItemButton
              // selected={selectedRoute === item.route}
              // onClick={() => onSelectRoute(item.route)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <div
        className={`overflow-hidden transition-all duration-700 ease-in-out`}
        style={{
          width: expanded ? '100%' : '0%',
        }}
      >
        <ListItemText primary={item.text} />
      </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
