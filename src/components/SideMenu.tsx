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
import Search from "./dashboard/components/Search";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";


// const drawerWidth = 280;

// const Drawer = styled(MuiDrawer)({
//   width: drawerWidth,
//   flexShrink: 0,
//   boxSizing: "border-box",
//   [`& .${drawerClasses.paper}`]: {
//     width: drawerWidth,
//     height: "100%",
//     boxSizing: "border-box",
//   },
// });

// Define the structure of the decoded JWT payload
interface DecodedToken {
  name: string;
  email: string;
}

export default function SideMenu({ selectedRoute, onSelectRoute, expanded, setExpanded }: any) {

// const num = 280


// var drawerWidth = 280;
// const collapsedWidth = 70;

// {expanded ? drawerWidth=280: drawerWidth= 70}


// const Drawer = styled(MuiDrawer)({
//   flexShrink: 0,
//   boxSizing: "border-box",
//   // transition: "width 2s ease", // Add transition for smooth effect
//   // overflowX: "hidden",
//   [`& .${drawerClasses.paper}`]: {
//     // width: drawerWidth,
//     height: "100%",
//     // transition: "width 2s ease",
//     boxSizing: "border-box",
//   },
// });






  const [userInfo, setUserInfo] = React.useState<DecodedToken | null>(null);

  // const [expanded, setExpanded] = React.useState(true);

  React.useEffect(() => {
    // Retrieve the JWT from the 'authToken/' cookie
    const token = Cookies.get("authToken");

    if (token) {
      try {
        // Decode the JWT to extract user information
        const decodedToken: DecodedToken = jwtDecode(token);
        console.log(decodedToken);
        setUserInfo(decodedToken); // Set the decoded info in the state
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (

  //   <WrapperBox // Use the wrapper to control width and add transition
  //   sx={{
  //     display: { xs: "none", md: "block" },
  //   }}
  // >
    <div 
    // variant="permanent"
      // sx={{
      //   zIndex:90,
      //   display: { xs: "none", md: "block" },
      //   [`& .${drawerClasses.paper}`]: {
      //     backgroundColor: "white",

      //     border: "none",
      //   },
      // }}
      className= {`${expanded? "w-[230px]": "w-[70px]"} transition-all ease-in-out duration-700 z-[90] relative`}
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
        <Box
        // sx={{
        //   display: 'flex',
        //   justifyContent: 'center'
        // }}
        >
          <div
        className={`absolute left-[90%] top-[20px] mt-5 cursor-pointer transition-all duration-1000 ease-in-out`}
        style={{
          opacity: expanded ? 0 : 1, // Fade out when expanded
          transform: expanded ? 'scale(0)' : 'scale(1)', // Scale down when expanded
        }}
      >
        <FaArrowAltCircleRight
          onClick={() => setExpanded((curr:any) => !curr)}
          // className='mr-[-25px] z-[80]' 
          fontSize={'15px'} 
          color='#cccccc' 
        />
      </div>
        {/* <div></div> */}
        {/* {!expanded ? <FaArrowAltCircleRight
          onClick={() => setExpanded((curr) => !curr)}
          className='mt-5 mr-[-25px] fixed z-[200] left-[65px] top-[12px] cursor-pointer' fontSize={'15px'} color='#6941c6' /> : null} */}
          <Box
            sx={{
              display: "flex",
              py: 1.3,
              pt: 3.5,
              alignItems: "center",
              justifyContent: `${expanded ? "": ""}`
            }}
            // onClick={() => setExpanded((curr) => !curr)}
            className='cursor-pointer'
          >
            <img src='./images/SC-Symbol.png' height='25px' width='25px' alt={'logo'}/>
            <div
        className={`overflow-hidden transition-all duration-700 ease-in-out`}
        style={{
          width: expanded ? '100%' : '0%',
        }}
      >
 <Typography
              variant="h5"
              sx={{ fontWeight: 500, lineHeight: "16px", 
                padding: "10px" // I changed this from 10 - 0
              
              }}
            >
              SConsultants
            </Typography>
                  </div>
          </Box>

          <div
        className={`absolute left-[98%] top-[20px] mt-5 cursor-pointer transition-all duration-1000 ease-in-out`}
        style={{
          opacity: expanded ? 1 : 0, // Fade in when expanded
          transform: expanded ? 'scale(1)' : 'scale(0)', // Scale up when expanded
        }}
      >
        <FaArrowAltCircleLeft
          onClick={() => setExpanded((curr:any) => !curr)}
          className='mr-[-25px] z-[80]' 
          fontSize={'15px'} 
          color='#cccccc' 
        />
      </div>

          {/* {expanded? 
          <FaArrowAltCircleLeft
          onClick={() => setExpanded((curr) => !curr)}
          
          className='cursor-pointer mt-5 mr-[-25px] fixed z-[100] left-[275px] top-[15px]' fontSize={'15px'} color='#6941c6' />
          : null } */}

          {/* Search Component */}
          <Box
            sx={{
              display: "flex",
              pb: 0.7,
              alignItems: "center",
            }}
          >
            {/* <Search /> */}
          </Box>
        </Box>

        {/* Menu Content: It will grow to fill the available space */}
        <Box sx={{ flexGrow: 1, pb: 1.3 }}>
          <MenuContent
          expanded={expanded}
            selectedRoute={selectedRoute}
            onSelectRoute={onSelectRoute}
          />
        </Box>

        {/* Bottom section: Avatar and Options */}
        {/* <Stack
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
            alt={userInfo?.name}
            src="/images/avatar-5.jpg" // Replace with dynamic image if available
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                lineHeight: "16px",
                textTransform: "capitalize",
              }} // Added textTransform
            >
              {userInfo?.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", wordBreak: "break-all" }}
            >
              {userInfo?.email}
            </Typography>
          </Box>
          {/* <OptionsMenu /> */}
        {/* </Stack> */}
      </Box>
      </div>
    // </WrapperBox>
  );
}




