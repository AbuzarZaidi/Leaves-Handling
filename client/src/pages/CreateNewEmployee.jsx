import React,{useState} from "react";
import {createEmployee} from '../functions/admins'
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "../utlis/materialUIComponents";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import dayjs from 'dayjs';

import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
const Icon = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));
const CreateNewEmployee = () => {
  const [addUser,setAddUser]=useState({
    name:"",
    email:"",
    password:"",
    confirm:"",
    type:""
  })
  const [value, setValue] =React.useState(dayjs());
  const [probationTime, setProbationTime] =React.useState(dayjs());
  const handleChange = e => {
    const { name, value } = e.target;
    setAddUser(prevState => ({
        ...prevState,
        [name]: value
    }));
};
const createUserHandler=async()=>{

  if(addUser.confirm===addUser.password){
    const user={
      name:addUser.name,
      email:addUser.email,
      password:addUser.password,
      type:addUser.type,
      probation:probationTime
    }
    const response=await createEmployee(user);
    
console.log(response)
  }
else{
  console.log("Invalid entry")
}
}
  return (
    <>
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
          <img src="/icons/addemployee.png" alt="" />
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
          Create New User
        </Text>
      </Box>
      <form>
      {/* name */}
      <Box sx={{ mt: 3 }}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Name
      </Typography> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="name"
            label="Name"
            name="name"
            
            value={addUser.name}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
          />
        </Box>
      </Box>
      {/* email */}
      <Box sx={{ mt: 3 }}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
       Email
      </Typography> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="email"
            label="Email"
            name="email"
            value={addUser.email}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
          />
        </Box>
      </Box>
      {/* password */}
      <Box sx={{ mt: 3 }}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Password
      </Typography> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="password"
            label="Password"
            name="password"
            value={addUser.password}
            type="password"
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
            autoComplete="on"
          />
        </Box>
      </Box>
      {/* confirm password */}
      <Box sx={{ mt: 3 }}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Confirm Password
      </Typography> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="confirm"
            label="Confirm Password"
            name="confirm"
            type="password"
            value={addUser.confirm}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ width: "30%" }}
            autoComplete="on"
          />
        </Box>
      </Box>
      {/* probaton */}
      <Box sx={{ mt: 3,display:"flex", justifyContent: "center",}}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Probation
      </Typography> */}
         <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Stack spacing={3}  sx={{width:"90%",display: { xs: "flex", md: "none", lg: "none" }}} >
        
        <MobileDatePicker
                  label="Probation"
                  format="MM/dd/yyyy"
                  name="probation"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                    setProbationTime(newValue)
                  }}
                  minDate={dayjs('2017-01-01')}
          renderInput={(params) => <TextField   {...params} />}
        />
      </Stack>
        {/* <Box > */}
        <Stack spacing={3}  sx={{width:"30%",display: { xs: "none", md: "flex", lg: "flex" },}}>
        <DesktopDatePicker
          label="Probation"
          format="MM/dd/yyyy"
          name="probation"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setProbationTime(newValue)
          }}
          minDate={dayjs('2017-01-01')}
          renderInput={(params) => <TextField   {...params}  size="small"/>}
        />
        {/* </Box> */}
       
      </Stack>
    </LocalizationProvider>
      </Box> 
      {/* choose position */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <FormControl 
           name="type"
           value={addUser.type}
           onChange={handleChange}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
                mr: 3,
                mt: 0.3,
              }}
            >
              Choose Type:
            </FormLabel>
            <FormControlLabel
            name="type"
              value="manager"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 14,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: 14 }}
                >
                  Manager{" "}
                </Typography>
              }
            />
            <FormControlLabel
            name="type"
              value="hr"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 14,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: 14 }}
                >
                  {" "}
                  Hr{" "}
                </Typography>
              }
            />
            <FormControlLabel
            name="type"
              value="employee"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 14,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: 14 }}
                >
                  {" "}
                  Employee{" "}
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {/* button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <Button
          onClick={createUserHandler}
          variant="outlined"
          sx={{
            color: "#1F2533",
            fontFamily: "Montserrat",
            width: "180px",
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
          Add
        </Button>
      </Box>
      </form>
    </>
  );
};

export default CreateNewEmployee;
