import React, { useState } from "react";
import Divider from "@mui/material/Divider";
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
  Modal,
  Stack,
} from "../../utlis/materialUIComponents";

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 250,
  bgcolor: "background.paper",

  boxShadow: 24,
  
};
const editStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
 
};
const SingleUser = ({ employeeData, userDeleteHandler, userEditHandler }) => {
  const [value, setValue] = React.useState(dayjs());
  const [probationTime, setProbationTime] = React.useState();
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    type: "",
  });
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleEditOpen = () => {
    setEditData({
      name: employeeData.name,
      email: employeeData.email,
      type: employeeData.type,
    });
    setValue(employeeData.probation);
    setProbationTime(employeeData.probation);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: "45px" }}>
              <img src="icons/deleteformodal.png" width="60px" alt="icon" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                  fontFamily: "Montserrat",
                }}
              >
                Delete...
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                }}
              >
                Are you sure
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}
              >
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    mr: 1,
                    borderColor: "#1F2533",
                    px: 3,
                    borderRadius: "10px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => userDeleteHandler(employeeData._id)}
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: "#1F2533",
                    px: 3,
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#1F2533",
                      color: "#ffffff",
                    },
                  }}
                >
                  Yes, Delete It
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={editStyle}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Edit Profile {employeeData.name}
              </Typography>
              <Typography sx={{ cursor: "pointer" }} onClick={handleEditClose}>
                <img alt="edit button" src="/icons/editcrossbutton.png"></img>
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <TextField
                value={editData.name}
                name="name"
                onChange={handleChange}
                sx={{ width: "80%" }}
                id="Name"
                label="Name"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <TextField
                value={editData.email}
                name="email"
                onChange={handleChange}
                sx={{ width: "80%" }}
                id="email"
                label="Email"
                variant="outlined"
                size="small"
              />
            </Box>
            {/* probaton */}
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Probation
      </Typography> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack
                  spacing={3}
                  sx={{
                    display: {
                      width: "90%",
                      xs: "flex",
                      md: "none",
                      lg: "none",
                    },
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
                    width: "80%",
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
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                  {/* </Box> */}
                </Stack>
              </LocalizationProvider>
            </Box>
            {/* choose position */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <FormControl name="type">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={editData.type}
                  onChange={handleChange}
                >
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "500",
                      mr: 1,
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
                            fontSize: 12,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", fontSize: 12 }}
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
                            fontSize: 12,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", fontSize: 12 }}
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
                            fontSize: 12,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", fontSize: 12 }}
                      >
                        {" "}
                        Employee{" "}
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#0A1833" }}
                // onClick={editHandler}
                onClick={() => {
                  userEditHandler(employeeData._id, editData, probationTime);
                  handleEditClose();
                }}
              >
                Edit User
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#F5F5F5",
            width: "80%",
            p: 1,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", ml: 2 }}>
            <Typography>1</Typography>
            <Typography sx={{ ml: 4, width: "270px" }}>
              {employeeData.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", mr: 4 }}>
            <Typography
              sx={{ fontWeight: "bold", mr: 4, cursor: "pointer" }}
              onClick={handleOpen}
            >
              <img alt="delete" src="/icons/userlistdeletebutton.png"></img>
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={handleEditOpen}
            >
              <img alt="edit" src="/icons/userlisteditbutton.png"></img>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleUser;
