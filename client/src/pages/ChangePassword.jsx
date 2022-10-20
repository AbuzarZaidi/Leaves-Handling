import React, { useState } from "react";
import SuccessFull from "../UI/Modals/SuccessFull";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "../utlis/materialUIComponents";
import { useSelector } from "react-redux";
import { changePassword } from "../functions/employees";

import { styled } from "@mui/material/styles";
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));
const Icon = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));
const ChangePassword = () => {
  const id = useSelector((state) => state.authData.id);
  const [open, setOpen] = React.useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [comparePassword, setComparePassword] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const passwordChangeHandler = async () => {
   
    if (previousPassword === "") {
      setError("previous");
    
    } else if (password === "") {
      setError("password");
    } else if (confirmPassword === "") {
      setError("confirm");
    } 
    else if (password !== confirmPassword) {
      setError("confirm");
      setComparePassword(true);
     
    } 
    else {
      try {
        const response = await changePassword(
          { previousPassword, password, confirmPassword },
          id
        );
      
        if (response.success) {
          console.log(response.message)
          handleOpen();
          setPassword("")
          setConfirmPassword("")
          setPreviousPassword("")
        } else {
          setErrorMessage(response.message)
          setError(true)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <SuccessFull open={open} handleClose={handleClose} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Icon
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "32px",
          }}
        >
          <img src="/icons/reset-password.png" alt="" />
        </Icon>
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
       <Box sx={{display:"flex",justifyContent:"center",mb:2}}>
       {isError&& <Typography sx={{fontWeight:"bold",color:"red"}}>{errorMessage}</Typography>
       }
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>

          <TextField
          type="password"
         onFocus={()=>{isError&&setError(false)}}
            error={isError === "previous" ? true : false}
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
            value={previousPassword}
            onChange={(e) => setPreviousPassword(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
          type="password"
          onFocus={()=>{isError&&setError(false)}}
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
            value={password}
            error={isError === "password" ? true : false}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
          type="password"
          onFocus={()=>{isError&&setError(false)}}
            error={isError === "confirm" ? true : false}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={comparePassword === true ? "Password not match" : ""}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          onClick={() => {
            passwordChangeHandler();
          }}
          variant="outlined"
          sx={{
            color: "#1F2533",
            fontFamily: "Montserrat",
            width: "200px",
            fontWeight: 600,
            fontSize: "14px",
            border: 2,
            borderColor: "#0A1833",
            "&:hover": {
              backgroundColor: "#0A1833",
              color: "#ffffff",
              border: 3,
              borderColor: "#0A1833",
            },
          }}
        >
          Change Password
        </Button>
      </Box>
    </>
  );
};

export default ChangePassword;
