import React,{useState} from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
  } from "../utlis/materialUIComponents";
  import { useSelector} from "react-redux";
  import {changePassword} from '../functions/employees'
  import LockResetIcon from '@mui/icons-material/LockReset';
  import { styled } from "@mui/material/styles";
  const Text = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
  }));

//   const Icon = styled(Typography)(({ theme }) => ({
//       [theme.breakpoints.down("md")]: {
//         fontSize: "20px",
//       },
//     }));
    const IconText = styled(LockResetIcon)(({ theme }) => ({
        [theme.breakpoints.down("md")]: {
          fontSize: "25px",
        },
      }));
const ChangePassword = () => {
  const id= useSelector((state) => state.authData.id);
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [previousPassword,setPreviousPassword]=useState("");
  const passwordChangeHandler=async()=>{
if(password===confirmPassword){
const response=await changePassword({previousPassword,password,confirmPassword},id);
console.log(response)
}
  }
  return (
    <>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {/* <Icon
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "32px",
          }}
        >
          <img src="/icons/myLeaves.png" alt="" />
        </Icon> */}
        <IconText sx={{ fontWeight: 400, fontSize: "40px" }}/>
          <Text
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "28px",
              ml: 3,
              mb: 3,
            }}
          >
            Change Password
          </Text>
        </Box>

        <Box sx={{ mt: 3 }}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
       Email
      </Typography> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
            value={previousPassword}
            onChange={(e)=>setPreviousPassword(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
       Email
      </Typography> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
       Email
      </Typography> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
        </Box>
      </Box>
        {/* button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
            onClick={passwordChangeHandler}
          variant="outlined"
          sx={{
            color: "#1F2533",
            fontFamily: "Montserrat",
            width: "300px",
            fontWeight: 600,
            fontSize: "14px",
            border: 3,
            borderColor: "#007F78",
            "&:hover": {
              backgroundColor: "#1F2533",
              color: "#ffffff",
              border: 3,
              borderColor: "#1F2533",
            },
          }}
        >
          Change Password
        </Button>
      </Box>
    </>
  )
}

export default ChangePassword