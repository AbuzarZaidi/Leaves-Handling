import React from "react";
import LogoutModal from "../UI/Modals/LogoutModal";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import {  Typography, Box } from "../utlis/materialUIComponents";
import { setlogoutHandler, setLocationHandler } from "../store/auth";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Sidebar = () => {
  const loc = useSelector((state) => state.authData.location);
  const type = useSelector((state) => state.authData.type);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const logoutHandler = () => {
    dispatch(setlogoutHandler());
    navigate("/");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openUserMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserClose = () => {
    setAnchorEl(null);
  };
  const checkLocationHandler = (val) => {
    dispatch(setLocationHandler(val));
  };
  return (
    <>
    <LogoutModal open={open} handleClose={handleClose} logoutHandler={logoutHandler}/>
      
      <Box sx={{ mt: 4, mx: "auto" }}>
        <Box sx={{ ml: 5 }}>
          <img src="/icons/logo.png" alt="" />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "25px",
              color: "#00A1BB",
              mr: 1,
            }}
          >
            Mikro
          </Typography>
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "25px",
              color: "#00B7AD",
              ml: 0.5,
            }}
          >
            St
          </Typography>
          <img src="/icons/star.png" style={{ marginTop: "10px" }} alt="icon" />
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "25px",
              color: "#00B7AD",
              ml: "-10px",
            }}
          >
            r
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column", mt: "-2px" }}>
            <img src="/icons/logoLine.png" width="85px" alt="icon"></img>
            <Typography
              sx={{
                fontFamily: "Serpentine-Light",
                fontWeight: 400,
                fontSize: "8px",
                color: "#ffffff",
                mt: "-5px",
              }}
            >
              You name it, We make it
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "25px",
              color: "#ffffff",
              mt: "-10px",
            }}
          >
            Tech
          </Typography>
        </Box>
        <Box sx={{mt:type==="employee"?"70%":"40%"}}>
          <Link to="/applyforleaves" style={{ textDecoration: "none" }}>
            <Box
              onClick={() => checkLocationHandler("/applyforleaves")}
              sx={{
                mt: "10%",
                // color: "#00E5D9",
                color: loc === "/applyforleaves" ? "#00AAFF" : "#ffffff",
                fontFamily: "Montserrat",
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={
                  loc === "/applyforleaves"
                    ? "icons/applyForLeaveMenuActive.png"
                    : "icons/applyForLeaveMenu.png"
                }
                style={{ marginRight: "8px", color: "#ffffff" }}
                alt="icon"
              />
              Apply for Leave
            </Box>
          </Link>
          <Link to="/myleaves" style={{ textDecoration: "none" }}>
            <Box
              onClick={() => checkLocationHandler("/myleaves")}
              sx={{
                mt: "20%",

                color: loc === "/myleaves" ? "#00AAFF" : "#ffffff",
                fontFamily: "Montserrat",
                fontSize: "14px",
                display: "flex",

                alignItems: "center",
              }}
            >
              <img
                src={
                  loc === "/myleaves"
                    ? "icons/myLeaveMenuActive.png"
                    : "icons/myLeaveMenu.png"
                }
                style={{
                  marginRight: "1px",
                  marginLeft: "10px",
                  color: "#00E5D9",
                }}
                alt="icon"
              />
              My Leave
            </Box>
          </Link>
          {type!=="employee"? <>
          <Link to="/employeesleaves" style={{ textDecoration: "none" }}>
            <Box
              onClick={() => checkLocationHandler("/employeesleaves")}
              sx={{
                mt: "20%",

                color: loc === "/employeesleaves" ? "#00AAFF" : "#ffffff",
                fontFamily: "Montserrat",
                fontSize: "14px",
                display: "flex",

                alignItems: "center",
              }}
            >
              <img
                src={
                  loc === "/employeesleaves"
                    ? "icons/employeeleaveactive.png"
                    : "icons/employeeleave.png"
                }
                style={{
                  marginRight: "5px",
                  marginLeft: "8px",
                  color: "#00E5D9",
                }}
                alt="icon"
              />
              Employee Leaves
            </Box>
          </Link>
          <Box
              sx={{
                mt: "20%",

                color: loc === "/userlist" ? "#00AAFF" : "#ffffff",
                fontFamily: "Montserrat",
                fontSize: "14px",
                display: "flex",
cursor:"pointer",
                alignItems: "center",
              }}
              onClick={handleClick}
              aria-expanded={openUserMenu ? 'true' : undefined}
              aria-controls={openUserMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
            >
              <img
                src={
                  loc === "/onbehalfleave"
                    ? "icons/usermenuactive.png"
                    : "icons/usermenu.png"
                }
                style={{
                  marginRight: "5px",
                  marginLeft: "8px",
                  color: "#00E5D9",
                }}
                alt="icon"
              />
Users

</Box>
<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openUserMenu}
        onClose={handleUserClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#0A1833",
        
          },
        }}
     
      >
        <MenuItem onClick={handleUserClose}> <Link to="/userlist" style={{ textDecoration: "none" }}>
            <Box
              onClick={() => checkLocationHandler("/userlist")}
              sx={{
                mt: "20%",

                color: loc === "/userlist" ? "#00AAFF" : "#ffffff",
                fontFamily: "Montserrat",
                fontSize: "14px",
                display: "flex",

                alignItems: "center",
              }}
            >
              <img
                src={
                  loc === "/userlist"
                    ? "icons/userlistmenu.png"
                    : "icons/userlistmenuactive.png"
                }
                style={{
                  marginRight: "5px",
                  marginLeft: "8px",
                  color: "#00E5D9",
                }}
                alt="icon"
              />
              userlist
            </Box>
          </Link></MenuItem>
        <MenuItem onClick={handleUserClose}><Link to="/createnewemployee" style={{ textDecoration: "none" }}>
            <Box
              onClick={() => checkLocationHandler("/createnewemployee")}
              sx={{
                mt: "5%",

                color: loc === "/createnewemployee" ? "#00AAFF" : "#ffffff",
                fontFamily: "Montserrat",
                fontSize: "14px",
                display: "flex",

                alignItems: "center",
              }}
            >
              <img
                src={
                  loc === "/createnewemployee"
                    ? "icons/addemployeemenu.png"
                    : "icons/addemployeemenuactive.png"
                }
                style={{
                  marginRight: "5px",
                  marginLeft: "8px",
                  color: "#00E5D9",
                }}
                alt="icon"
              />
              new employee
            </Box>
          </Link> </MenuItem>
        <MenuItem onClick={handleUserClose}><Link to="/onbehalfleave" style={{ textDecoration: "none" }}>
            <Box
              onClick={() => checkLocationHandler("/onbehalfleave")}
              sx={{
                mt: "5%",

                color: loc === "/onbehalfleave" ? "#00AAFF" : "#ffffff",
                fontFamily: "Montserrat",
                fontSize: "14px",
                display: "flex",

                alignItems: "center",
              }}
            >
              <img
                src={
                  loc === "/onbehalfleave"
                    ? "icons/onbehalfmenuactive.png"
                    : "icons/onbehalfmenu.png"
                }
                style={{
                  marginRight: "5px",
                  marginLeft: "8px",
                  color: "#00E5D9",
                }}
                alt="icon"
              />
              OnBehalf Leave
            </Box>
          </Link> </MenuItem>
      </Menu>
          
          <Link to="/changepassword" style={{ textDecoration: "none" }}>
            <Box
              onClick={() => checkLocationHandler("/changepassword")}
              sx={{
                mt: "20%",

                color: loc === "/changepassword" ? "#00AAFF" : "#ffffff",
                fontFamily: "Montserrat",
                fontSize: "14px",
                display: "flex",

                alignItems: "center",
              }}
            >
              <img
                src={
                  loc === "/changepassword"
                    ? "icons/reset-password-active.png"
                    : "icons/reset-password-icon.png"
                }
                style={{
                  marginRight: "5px",
                  marginLeft: "8px",
                  color: "#00E5D9",
                }}
                alt="icon"
              />
              Change password
            </Box>
          </Link> </>:""}
        </Box>

        <Box sx={{ mt: "130%" }}>
          <Box
            sx={{
              position: "fixed",
              bottom: "0",
              mb: 3,
              color: "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              justifyContent:"center",
              cursor: "pointer",
              // alignItems: "center",
            }}
            onClick={handleOpen}
          >
            <img
              src="icons/logout.png"
              style={{ marginRight: "5px", marginLeft: "8px" }}
              alt="logouticon"
            />
            <Typography sx={{ml:1,fontFamily: "Montserrat",}}> Log out</Typography>
           
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
