import React,{useState,useEffect} from 'react'
import { getEmployees} from "../functions/admins";
import {
  Box,
  Typography,
  // TextField,
  // Button,
} from "../utlis/materialUIComponents";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/material/styles";
import EmployeePreviousLeaves from '../components/employeeLeaves/EmployeePreviousLeaves';
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
const EmployeesLeaves = () => {
  const [age, setAge] = React.useState('');
  const [employees, setEmployees] = React.useState([]);
  const [month, setMonth] = React.useState('');
  // const [age, setAge] = React.useState()
useEffect(() => {
  const fetchData=async()=>{
    const employeesData=await getEmployees();
    setEmployees(employeesData)
  }
  fetchData()
  
}, [])

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
    
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
          <img src="/icons/employeeleaves.png" alt="" />
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
            Employee Leave
          </Text>
        </Box>
        <Box sx={{display:"flex",justifyContent:"center",width:"84%",ml:"80px",mt:1}}>
<Box sx={{display:"flex"}}>
<Box sx={{ minWidth: 250 ,mr:2.5}}>
      <FormControl fullWidth  size="small">
        <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {employees.map((val)=>{
            return <MenuItem value={val._id}>{val.name}</MenuItem>
          })}
         

        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 250 ,mr:2,}}>
      <FormControl fullWidth  size="small">
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Age"
          onChange={handleMonthChange}
        >
          <MenuItem value={0}>Jan</MenuItem>
          <MenuItem value={1}>feb</MenuItem>
          <MenuItem value={2}>mar</MenuItem>
          <MenuItem value={3}>apr</MenuItem>
          <MenuItem value={4}>may</MenuItem>
          <MenuItem value={5}>Jun</MenuItem>
          <MenuItem value={6}>Jul</MenuItem>
          <MenuItem value={7}>aug</MenuItem>
          <MenuItem value={8}>sep</MenuItem>
          <MenuItem value={9}>oct</MenuItem>
          <MenuItem value={10}>nov</MenuItem>
          <MenuItem value={11}>dec</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 250 ,mr:2}}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box >
        <Button variant="contained" sx={{color:"#ffffff",backgroundColor:"#00AAFF",width:"140px",height:"38px"}}>Apply</Button>
        </Box>
</Box>
        </Box>
        <Box
        sx={{ display: "flex", justifyContent: "center",mt:2 }}
      >
     <EmployeePreviousLeaves/>
     </Box>
        
    </>
  )
}

export default EmployeesLeaves