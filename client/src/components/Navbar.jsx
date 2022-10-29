import * as React from "react";
import {  Link } from "react-router-dom";
import { useSelector} from "react-redux";
import {Box,AppBar,Toolbar,IconButton,Typography,Menu,MenuIcon,Container,Avatar,Tooltip,MenuItem,Badge,NotificationsIcon} from '../utlis/materialUIComponents'

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userName= useSelector((state) => state.authData.userName);
  const type= useSelector((state) => state.authData.type);
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1F2533" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, alignItem: "center" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWVuJTIwZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{display:"flex",flexDirection:"column",ml:2 }}>
          <Typography variant="button" gutterBottom sx={{m:0,p:0,mb:0.5,fontWeight:  500, fontSize: 16}}>
       {userName}
      </Typography>
      <Typography variant="caption"  sx={{m:0,p:0,mt:-1,fontSize: 12}}>
        {type}
      </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "right",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
                 <MenuItem  onClick={handleCloseNavMenu}>
                  <Link to="/applyforleaves" style={{ textDecoration: "none",color:"#000000" }}><Typography textAlign="center">Apply for Leave</Typography></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link to="/myleaves" style={{ textDecoration: "none",color:"#000000" }}><Typography textAlign="center">My Leave</Typography></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link to="/employeesleaves" style={{ textDecoration: "none",color:"#000000" }}><Typography textAlign="center">Employee Leaves</Typography></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link to="/userlist" style={{ textDecoration: "none",color:"#000000" }}><Typography textAlign="center">UsersList</Typography></Link>
                </MenuItem>

                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link to="/createnewemployee" style={{ textDecoration: "none",color:"#000000" }}><Typography textAlign="center">new employee</Typography></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link to="/onbehalfleave" style={{ textDecoration: "none",color:"#000000" }}><Typography textAlign="center">OnBehalf Leave</Typography></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link to="/changepassword" style={{ textDecoration: "none",color:"#000000" }}><Typography textAlign="center"> Change password</Typography></Link>
                </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
            }}
          >
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
