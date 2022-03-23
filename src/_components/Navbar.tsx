// src/components/Navbar.tsx

import React, { FC, ReactElement } from "react";
import {
  Box,
  Button,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Avatar,
  Typography,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import MenuIcon from "@mui/icons-material/Menu";
import { APP_TITLE } from "../constants";
import "@fontsource/podkova/400.css";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

//import { routes } from "../_components/Routes";
//import { NavLink } from "react-router-dom";

import { Profile } from "../Profile/profile";


const Navbar: FC = (profile): ReactElement => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.dark",
        position: "fixed top"
      }}

    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
                <Button variant="text" sx={{ color: "white", fontFamily: 'podkova' }}>
                    <WorkspacePremiumIcon /> <h1>{APP_TITLE}</h1>
                </Button>

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Button variant="text" sx={{ color: "white", fontFamily: 'podkova' }}>
                <WorkspacePremiumIcon /> <h1>{APP_TITLE}</h1>
            </Button>

             {/** 
              <Box sx={{ mx: "right", width: '50%' }}>
                <Button>
                   <AddCircleIcon sx={{ fontSize: 50 }} color="success"></AddCircleIcon>
                </Button>
                <Button>
                    <Avatar alt="avatar" sx={{ height: 40, width: 40 }}></Avatar>
                </Button>
           </Box>
              **/}   
            

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              {/*routes.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="white"
                  underline="none"
                  variant="button"
                  sx={{ fontSize: "large", marginLeft: "2rem" }}
                >
                  {page.title}
                </Link>
              ))*/}
            </Box>
               {/** 
              <Box sx={{ mx: "right", width: '50%' }}>
                <Button>
                   <AddCircleIcon sx={{ fontSize: 50 }} color="success"></AddCircleIcon>
                </Button>
                <Button>
                    <Avatar alt="avatar" sx={{ height: 40, width: 40 }}></Avatar>
                </Button>
           </Box>
              **/}   
            


          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navbar;