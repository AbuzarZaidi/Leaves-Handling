import React, { useState } from "react";
import { createEmployee } from "../functions/admins";
import SuccessFull from "../UI/Modals/SuccessFull";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stack,
} from "../utlis/materialUIComponents";

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isError, setError] = useState(false);
  const [addUser, setAddUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    type: "",
  });
  const [value, setValue] = React.useState(dayjs());
  const [probationTime, setProbationTime] = React.useState(dayjs());
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const createUserHandler = async () => {
    if(addUser.name===""){
      setError("name")
    }
    else if(addUser.email==="email"){
      setError("email")
    }
    else if(addUser.password===""){
      setError("password")
    }else if(addUser.confirm===""){
      setError("confirm")
    }else if(addUser.type===""){
      setError("type")
    }
    if (addUser.confirm !== addUser.password) {
 
    } else {
      const user = {
        name: addUser.name,
        email: addUser.email,
        password: addUser.password,
        type: addUser.type,
        probation: probationTime,
      };
      const response = await createEmployee(user);
      if(response.success){
        handleOpen();
        setAddUser({
          name: "",
          email: "",
          password: "",
          confirm: "",
          type: "",
        })
        setProbationTime(dayjs())
      }
     
    }
  };
  return (
    <>
    <SuccessFull open={open} handleClose={handleClose}/>
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
              error={isError === "name" ? true : false}
            />
          </Box>
        </Box>
        {/* email */}
        <Box sx={{ mt: 3 }}>
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
              error={isError === "email" ? true : false}
            />
          </Box>
        </Box>
        {/* password */}
        <Box sx={{ mt: 3 }}>
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
              error={isError === "password" ? true : false}
            />
          </Box>
        </Box>
        {/* confirm password */}
        <Box sx={{ mt: 3 }}>
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
              error={isError === "confirm" ? true : false}
            />
          </Box>
        </Box>
        {/* probaton */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
              spacing={3}
              sx={{
                width: "90%",
                display: { xs: "flex", md: "none", lg: "none" },
              }}
            >
              <MobileDatePicker
                label="Probation"
                format="MM/dd/yyyy"
                name="probation"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setProbationTime(newValue);
                }}
                minDate={dayjs("2017-01-01")}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
            {/* <Box > */}
            <Stack
              spacing={3}
              sx={{
                width: "30%",
                display: { xs: "none", md: "flex", lg: "flex" },
              }}
            >
              <DesktopDatePicker
                label="Probation"
                format="MM/dd/yyyy"
                name="probation"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setProbationTime(newValue);
                }}
                minDate={dayjs("2017-01-01")}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              {/* </Box> */}
            </Stack>
          </LocalizationProvider>
        </Box>
        {/* choose position */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <FormControl name="type" value={addUser.type} onChange={handleChange} error={isError === "type" ? true : false}>
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
            onClick={()=>{createUserHandler();}}
            variant="outlined"
            sx={{
              color: "#1F2533",
              fontFamily: "Montserrat",
              width: "180px",
              fontWeight: 600,
              fontSize: "14px",
              border: 2,
              borderColor: "#1F2533",
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
