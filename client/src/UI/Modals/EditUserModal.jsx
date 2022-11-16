import React,{useState} from 'react'
import {Modal,Typography,Box,Button,Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel, TextField, Stack,} from '../../utlis/materialUIComponents'
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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
  const InputField = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      width:"90%"
    },
  }));
const EditUserModal = ({editOpen,handleEditClose,employeeData,userEditHandler}) => {
    const [value, setValue] = React.useState(employeeData.probation);
    const [probationTime, setProbationTime] = React.useState(employeeData.probation);
    const [editData, setEditData] = useState({
      name: employeeData.name,
      email: employeeData.email,
      type: employeeData.type,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
  return (
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
          <InputField
            value={editData.name}
            name="name"
            onChange={handleChange}
            sx={{ width: "80%" }}
            id="Name"
            label="Name"
            variant="outlined"
            size="medium"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <InputField
            value={editData.email}
            name="email"
            onChange={handleChange}
            sx={{ width: "80%" }}
            id="email"
            label="Email"
            variant="outlined"
            size="medium"
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
                minDate={dayjs()}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setProbationTime(newValue);
                }}
                
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
                minDate={dayjs()}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setProbationTime(newValue);
                }}
              
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
            sx={{ backgroundColor: "#0A1833","&:hover": {
              backgroundColor: "#0A1833",
              color: "#ffffff",
            }, }}
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
  )
}

export default EditUserModal