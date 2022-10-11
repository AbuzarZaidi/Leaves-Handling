import React from 'react'
import {
    Box,
    Typography,
    // TextField,
    Button,
  } from "../../utlis/materialUIComponents";
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
const SingleUser = ({userName,id,userDeleteHandler}) => {
  const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
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
             src="icons/deleteformodal.png" width="60px" alt="icon"/>
          </Box>
          <Box sx={{display:"flex",justifyContent:"center",mt:1}}>
          <Typography sx={{fontWeight:600,fontSize:"18px",fontFamily:"Montserrat"}}>Delete...</Typography>
          </Box>
          <Box sx={{display:"flex",justifyContent:"center",mt:0.5}}>
          <Typography sx={{fontWeight:600,fontSize:"14px",fontFamily:"Montserrat"}}>Are you sure</Typography>
          </Box>
          <Box>
          <Box sx={{display:"flex",justifyContent:"center",mt:3,mb:3}}>
          <Button onClick={handleClose} variant="outlined" sx={{textTransform: "capitalize",mr:1,borderColor:"#1F2533",px:3,borderRadius: '10px'}}>Cancel</Button>
          <Button 
          onClick={()=>userDeleteHandler(id)} 
           variant="contained"  sx={{textTransform: "capitalize",backgroundColor:"#1F2533",px:3,borderRadius: '10px',"&:hover": {
             backgroundColor: "#1F2533",
             color:"#ffffff",
            
           },}}>Yes, Delete It</Button>
          </Box>
          </Box>
       </Box>
     </Modal>
   </div>
     <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor:"#F5F5F5",
            width: "80%",
            p: 1,
            mt:2
           
          }}
        >
          <Box sx={{ display: "flex", ml: 2 }}>
            <Typography >1</Typography>
            <Typography sx={{ ml: 4,width:"270px" }}>{userName}</Typography>
          </Box>
          <Box sx={{ display: "flex", mr: 4 }}>
            <Typography sx={{ fontWeight: "bold", mr: 4,cursor:"pointer" }} onClick={ handleOpen} ><img alt="delete" src="/icons/userlistdeletebutton.png"></img></Typography>
            <Typography sx={{ fontWeight: "bold",cursor:"pointer" }}><img alt="edit" src="/icons/userlisteditbutton.png"></img></Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SingleUser