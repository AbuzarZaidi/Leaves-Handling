import React from 'react'
import {
    Box,
    Typography,
    // TextField,
    // Button,
  } from "../../utlis/materialUIComponents";
const SingleUser = ({userName,id,userDeleteHandler}) => {
  return (
    <>
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
            <Typography sx={{ fontWeight: "bold", mr: 4,cursor:"pointer" }} onClick={()=>userDeleteHandler(id)} ><img alt="delete" src="/icons/userlistdeletebutton.png"></img></Typography>
            <Typography sx={{ fontWeight: "bold",cursor:"pointer" }}><img alt="edit" src="/icons/userlisteditbutton.png"></img></Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SingleUser