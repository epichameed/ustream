// import * as React from "react";
// import { useRouter } from "next/navigation"; // Import useRouter
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Stack from "@mui/material/Stack";
// import { TbReport } from "react-icons/tb";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { GoProjectSymlink } from "react-icons/go";
// import { MdOutlinePictureInPictureAlt } from "react-icons/md";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import { IoSettingsOutline } from "react-icons/io5";

// // Updated mainListItems and secondaryListItems with route properties
// const mainListItems = [
//   {
//     text: "Overview",
//     icon: <LuLayoutDashboard fontSize="18px" />,
//     route: "/dashboard",
//   },
//   {
//     text: "Daily Reports",
//     icon: <TbReport fontSize="18px" />,
//     route: "/reports",
//   },
//   {
//     text: "Projects",
//     icon: <GoProjectSymlink fontSize="18px" />,
//     route: "/projects",
//   },
//   {
//     text: "Portfolio",
//     icon: <MdOutlinePictureInPictureAlt fontSize="18px" />,
//     route: "/portfolio",
//   },
// ];

// const secondaryListItems = [
//   {
//     text: "About",
//     icon: <AiOutlineInfoCircle fontSize="18px" />,
//     route: "/about",
//   },
//   {
//     text: "Settings",
//     icon: <IoSettingsOutline fontSize="18px" />,
//     route: "/settings",
//   },
// ];

// export default function MenuContent() {
//   const [selectedIndex, setSelectedIndex] = React.useState(1);
//   const router = useRouter(); // Initialize useRouter

//   const handleListItemClick = (index, route) => {
//     setSelectedIndex(index);
//     router.push(route); // Navigate to the route
//   };

//   return (
//     <Stack
//       sx={{
//         flexGrow: 1,
//         justifyContent: "space-between",
//         height: "100%",
//         padding: "0px !important",
//       }}
//     >
//       <List dense sx={{ padding: 0, paddingTop: "10px" }}>
//         {mainListItems.map((item, index) => (
//           <ListItem
//             key={index}
//             sx={{ display: "block", padding: 0, py: "2px" }}
//           >
//             <ListItemButton
//               sx={{
//                 padding: "9px",
//                 "&.Mui-selected": {
//                   backgroundColor: "#F9FAFB !important",
//                 },
//                 "&:hover": {
//                   backgroundColor: "#F9FAFB",
//                 },
//               }}
//               selected={index === selectedIndex}
//               onClick={() => handleListItemClick(index, item.route)} // Pass route to handleListItemClick
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       <List dense sx={{ mt: "auto", padding: 0 }}>
//         {secondaryListItems.map((item, index) => (
//           <ListItem
//             key={index}
//             sx={{ display: "block", padding: 0, py: "2px" }}
//           >
//             <ListItemButton
//               onClick={() => handleListItemClick(index, item.route)} // Pass route to handleListItemClick
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Stack>
//   );
// }


import * as React from "react";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { TbReport } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlinePictureInPictureAlt } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

// Updated mainListItems and secondaryListItems with route properties
const mainListItems = [
  {
    text: "Overview",
    icon: <LuLayoutDashboard fontSize="18px" />,
    route: "/dashboard",
  },
  {
    text: "Daily Reports",
    icon: <TbReport fontSize="18px" />,
    route: "/reports",
  },
  {
    text: "Projects",
    icon: <GoProjectSymlink fontSize="18px" />,
    route: "/projects",
  },
  {
    text: "Portfolio",
    icon: <MdOutlinePictureInPictureAlt fontSize="18px" />,
    route: "/portfolio",
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

export default function MenuContent() {
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname(); // Get current route

  const handleListItemClick = (route) => {
    router.push(route); // Navigate to the route
  };

  return (
    <Stack
      sx={{
        flexGrow: 1,
        justifyContent: "space-between",
        height: "100%",
        padding: "0px !important",
      }}
    >
      <List dense sx={{ padding: 0, paddingTop: "10px" }}>
        {mainListItems.map((item) => (
          <ListItem key={item.route} sx={{ display: "block", padding: 0, py: "2px" }}>
            <ListItemButton
              sx={{
                padding: "9px",
                "&.Mui-selected": {
                  backgroundColor: "#F9FAFB !important",
                },
                "&:hover": {
                  backgroundColor: "#F9FAFB",
                },
              }}
              selected={pathname === item.route} // Compare current route with item route
              onClick={() => handleListItemClick(item.route)} // Handle click
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense sx={{ mt: "auto", padding: 0 }}>
        {secondaryListItems.map((item) => (
          <ListItem key={item.route} sx={{ display: "block", padding: 0, py: "2px" }}>
            <ListItemButton
              selected={pathname === item.route} // Highlight based on route
              onClick={() => handleListItemClick(item.route)} // Handle click
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

