import React from "react";
import Box from "@mui/material/Box";
import { useSelector,useDispatch} from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate,Link} from "react-router-dom";
import Button from '@mui/material/Button';
import { setlogoutHandler,setLocationHandler } from "../store/auth";
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 250,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 1,
};
const Sidebar = () => {
 
  const loc= useSelector((state) => state.authData.location);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const logoutHandler=()=>{
    dispatch(setlogoutHandler());
    navigate("/")
  }
  const checkLocationHandler=(val)=>{
   
    dispatch(setLocationHandler(val));
  
  }
  return (
    <>
       <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display:"flex",justifyContent:"center",mt:"45px"}}>
        <img
              src="icons/modal_logout.png" width="60px" alt="icon"/>
           </Box>
           <Box sx={{display:"flex",justifyContent:"center",mt:1.5}}>
           <Typography sx={{fontWeight:600,fontSize:"18px",fontFamily:"Montserrat"}}>Are you sure</Typography>
           </Box>
           <Box>
           <Box sx={{display:"flex",justifyContent:"center",mt:3,mb:3}}>
           <Button onClick={handleClose} variant="outlined" sx={{textTransform: "capitalize",mr:1,borderColor:"#1F2533",px:3,borderRadius: '10px'}}>Cancel</Button>
           <Button onClick={logoutHandler} variant="contained"  sx={{textTransform: "capitalize",backgroundColor:"#1F2533",px:3,borderRadius: '10px',"&:hover": {
              backgroundColor: "#1F2533",
              color:"#ffffff",
             
            },}}>Log out</Button>
           </Box>
           </Box>
        </Box>
      </Modal>
    </div>
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
        <Box >
        <Link to="/applyforleaves" style={{textDecoration:"none",}}>
          <Box
           onClick={()=>checkLocationHandler("/applyforleaves")}
            sx={{
              mt: "70%",
               // color: "#00E5D9",
               color: loc === "/applyforleaves" ? "#00E5D9" : "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={loc === "/applyforleaves" ?"icons/applyForLeaveMenuIcon.png":"icons/applyForLeaveMenuActive.png"}
              style={{ marginRight: "5px" ,color: "#ffffff", }}
              alt="icon"
            />
            Apply for Leave
          </Box>
          </Link>
          <Link to="/myleaves" style={{textDecoration:"none",}}>
          <Box
          onClick={()=>checkLocationHandler("/myleaves")}
            sx={{
              mt: "20%",
             
              color: loc === "/myleaves" ?  "#00E5D9": "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              
              alignItems: "center",
            }}
          >
           
            <img
              src={loc === "/myleaves"?"icons/myLeavesMenuIcon.png":"icons/myLeaveMenuActive.png"}
              style={{ marginRight: "5px", marginLeft: "8px",color:"#00E5D9", }}
              alt="icon"
            />
            My Leave
           
          </Box>
          </Link>
          <Link to="/userlist" style={{textDecoration:"none",}}>
          <Box
          onClick={()=>checkLocationHandler("/userlist")}
            sx={{
              mt: "20%",
             
              color: loc === "/userlist" ?  "#00E5D9": "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              
              alignItems: "center",
            }}
          >
           
            <img
              src={loc === "/userlist"?"icons/myLeavesMenuIcon.png":"icons/myLeaveMenuActive.png"}
              style={{ marginRight: "5px", marginLeft: "8px",color:"#00E5D9", }}
              alt="icon"
            />
           userlist
           
          </Box>
          </Link>
          <Link to="/employeesleaves" style={{textDecoration:"none",}}>
          <Box
          onClick={()=>checkLocationHandler("/employeesleaves")}
            sx={{
              mt: "20%",
             
              color: loc === "/employeesleaves" ?  "#00E5D9": "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              
              alignItems: "center",
            }}
          >
           
            <img
              src={loc === "/employeesleaves"?"icons/myLeavesMenuIcon.png":"icons/myLeaveMenuActive.png"}
              style={{ marginRight: "5px", marginLeft: "8px",color:"#00E5D9", }}
              alt="icon"
            />
           Employee Leaves
           
          </Box>
          </Link>
          <Link to="/createnewemployee" style={{textDecoration:"none",}}>
          <Box
          onClick={()=>checkLocationHandler("/createnewemployee")}
            sx={{
              mt: "20%",
             
              color: loc === "/createnewemployee" ?  "#00E5D9": "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              
              alignItems: "center",
            }}
          >
           
            <img
              src={loc === "/createnewemployee"?"icons/myLeavesMenuIcon.png":"icons/myLeaveMenuActive.png"}
              style={{ marginRight: "5px", marginLeft: "8px",color:"#00E5D9", }}
              alt="icon"
            />
           new employee
           
          </Box>
          </Link>
          <Link to="/changepassword" style={{textDecoration:"none",}}>
          <Box
          onClick={()=>checkLocationHandler("/changepassword")}
            sx={{
              mt: "20%",
             
              color: loc === "/changepassword" ?  "#00E5D9": "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              
              alignItems: "center",
            }}
          >
           
            <img
              src={loc === "/changepassword"?"icons/myLeavesMenuIcon.png":"icons/myLeaveMenuActive.png"}
              style={{ marginRight: "5px", marginLeft: "8px",color:"#00E5D9", }}
              alt="icon"
            />
          OnBehalf Leave
           
          </Box>
          </Link>
          <Link to="/changepassword" style={{textDecoration:"none",}}>
          <Box
          onClick={()=>checkLocationHandler("/onbehalfleave")}
            sx={{
              mt: "20%",
             
              color: loc === "/changepassword" ?  "#00E5D9": "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              
              alignItems: "center",
            }}
          >
           
            <img
              src={loc === "/changepassword"?"icons/myLeavesMenuIcon.png":"icons/myLeaveMenuActive.png"}
              style={{ marginRight: "5px", marginLeft: "8px",color:"#00E5D9", }}
              alt="icon"
            />
          Change password
           
          </Box>
          </Link>
        </Box>

        <Box sx={{ mt: "130%" }}>
          <Box
            sx={{
              mt: "20%",
              color: "#ffffff",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
cursor:"pointer",
              alignItems: "center",
            }}
            onClick={handleOpen}
          >
            <img
              src="icons/logout.png"
              style={{ marginRight: "5px", marginLeft: "8px" }}
              alt="logouticon"
            />
            Logout
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
