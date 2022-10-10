import React from 'react'
import {
    Box,
    Typography,
    // TextField,
    // Button,
  } from "../../utlis/materialUIComponents";
const SingleUser = () => {
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
            <Typography sx={{ ml: 4,width:"270px" }}>Syed Abuzar Zaidi</Typography>
          </Box>
          <Box sx={{ display: "flex", mr: 4 }}>
            <Typography sx={{ fontWeight: "bold", mr: 4 }}><img alt="delete" src="/icons/userlistdeletebutton.png"></img></Typography>
            <Typography sx={{ fontWeight: "bold" }}><img alt="edit" src="/icons/userlisteditbutton.png"></img></Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SingleUser