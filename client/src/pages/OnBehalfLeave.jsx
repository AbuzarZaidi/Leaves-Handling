import React, { useState, useEffect } from "react";
import { createNewLeaveRequest, getManagers } from "../functions/employees";
import { getEmployees} from "../functions/admins";
import { useSelector, useDispatch } from "react-redux";
import { setStartDateHandler, setEndDateHandler,setReset } from "../store/applyForLeave";
import AppliedModal from "../UI/Modals/AppliedModal";
import {
  Box,
  Typography,
  TextField,
  Button,InputLabel, MenuItem,FormControl,Select 
} from "../utlis/materialUIComponents";


import { styled } from "@mui/material/styles";
import DateRange from "../components/applyRequest/DateRange";
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
}));
const Icon = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));


const OnBehalfLeave = () => {
  const dispatch = useDispatch();
  const [isError, setError] = useState(false);
  const id = useSelector((state) => state.authData.id);
  const startDate = useSelector((state) => state.leave.startDate);
  const endDate = useSelector((state) => state.leave.endDate);
  const [reasonValue, setReasonValue] = useState("");
  const [managers, setManagers] = useState([]);
  const [manager, setManager] = React.useState("");
  const [employees,setEmployees]=useState([])
  const [employee,setEmployee]=useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const data = async () => {
      dispatch(setStartDateHandler(new Date().toISOString()));
      dispatch(setEndDateHandler(new Date().toISOString()));
      try {
        const result = await getManagers(id);
        const employeesData=await getEmployees(id);
        if(result.success){
          setManagers(result.data);
        }
        if(employeesData.success){
          setEmployees(employeesData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [dispatch]);


  const handleChange = (event) => {
    setManager(event.target.value);
  };
  const applyForLeaveHandler = async () => {
    if (employee==="") {
      setError("employee");
      
    } else if (manager === "") {
      setError("manager");
    }else if(reasonValue === ""){
      setError("reason");

    }
    else{

    
    const request = {
      reason: reasonValue,
      fromDate: startDate,
      toDate: endDate,
      manager: manager,
    };
    const result = await createNewLeaveRequest(request, employee);
    if (result.success) {
      handleOpen();
      dispatch(setReset(true))
      setManager("")
      setEmployee("")
      setReasonValue("")
    }
}
  };
  return (
    <>
      <AppliedModal open={open} handleClose={handleClose}/>
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
          <img src="/icons/myLeaves.png" alt="" />
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
          On Behalf Leave
        </Text>
      </Box>
      {/* Select Employee*/}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          fontFamily: "Montserrat",
        }}
      >
        <FormControl sx={{ width: "90%" }} error={isError === "employee" ? true : false}>
          <InputLabel id="demo-simple-select-label" >
            Select your Employee
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={employee}
            label="Select your manager"
            onChange={(e)=>setEmployee(e.target.value)}
            sx={{mb:0.5}}
          >
            {employees.length > 0
              ? employees.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.name}
                    </MenuItem>
                  );
                })
              : "no found"}
          </Select>
        </FormControl>
      </Box>
      <DateRange />

      {/* Select Manager */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          fontFamily: "Montserrat",
        }}
      >
        <FormControl sx={{ width: "90%" }} error={isError === "manager" ? true : false}>
          <InputLabel id="demo-simple-select-label">
            Select your manager
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={manager}
            label="Select your manager"
            onChange={handleChange}
          >
            {managers.length > 0
              ? managers.map((val) => {
                  return (
                    <MenuItem key={val.name} value={val._id}>
                      {val.name}
                    </MenuItem>
                  );
                })
              : "no found"}
          </Select>
        </FormControl>
      </Box>
      {/* tell your reason */}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          id="outlined-multiline-static"
          label=" Tell your reason"
          multiline
          sx={{ width: "90%" }}
          rows={3}
          value={reasonValue}
          error={isError === "reason" ? true : false}
          onChange={(e) => setReasonValue(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={applyForLeaveHandler}
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
          Apply
        </Button>
      </Box>
    </>
  );
};

export default OnBehalfLeave;
