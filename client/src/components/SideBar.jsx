import React,{useState} from "react";
import Box from "@mui/material/Box";
import { useSelector,useDispatch} from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate,Link,useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import { setlogoutHandler,setLocationHandler } from "../store/auth";
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  width: 260,
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
          <Box sx={{display:"flex",justifyContent:"center",mt:2}}>
        <img
              src="icons/modal_logout.png" width="40px"/>
           </Box>
           <Box sx={{display:"flex",justifyContent:"center",mt:1.5}}>
           <Typography sx={{fontWeight:"bold",fontSize:"14px",fontFamily:"Montserrat"}}>Are you sure</Typography>
           </Box>
           <Box>
           <Box sx={{display:"flex",justifyContent:"center",mt:2,mb:3}}>
           <Button onClick={handleClose} variant="outlined" size="medium" sx={{textTransform: "capitalize",mr:1,borderColor:"#1F2533"}}>Cancel</Button>
           <Button onClick={logoutHandler} variant="contained" size="medium" sx={{textTransform: "capitalize",backgroundColor:"#1F2533"}}>Log out</Button>
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
          <img src="/icons/star.png" style={{ marginTop: "10px" }} />
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
            <img src="/icons/logoLine.png" width="85px"></img>
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
        <Box sx={{}}>
        <Link to="/applyforleaves" style={{textDecoration:"none",}}>
          <Box
           onClick={()=>checkLocationHandler("/applyforleaves")}
            sx={{
              mt: "70%",
               // color: "#00E5D9",
               color: loc === "/applyforleaves" ? "#ffffff" : "#00E5D9",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="icons/applyForLeaveMenuIcon.png"
              style={{ marginRight: "5px" ,color: "#ffffff", }}
            />
            Apply for Leave
          </Box>
          </Link>
          <Link to="/myleaves" style={{textDecoration:"none",}}>
          <Box
          onClick={()=>checkLocationHandler("/myleaves")}
            sx={{
              mt: "20%",
              color: "#00E5D9",
              color: loc === "/myleaves" ? "#ffffff" : "#00E5D9",
              fontFamily: "Montserrat",
              fontSize: "14px",
              display: "flex",
              // textDecoration:"none",
              alignItems: "center",
            }}
          >
           
            <img
              src="icons/myLeavesMenuIcon.png"
              style={{ marginRight: "5px", marginLeft: "8px",color:"#00E5D9", }}
            />
            My Leave
           
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
            />
            Logout
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
