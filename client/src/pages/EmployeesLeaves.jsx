import React,{useState,useEffect} from 'react'
import { getEmployees,employeesLeaves} from "../functions/admins";
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
  const [year, setYear] = React.useState('');
  const [employees, setEmployees] = React.useState([]);
  const [employee, setEmployee] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [result,setResult]=React.useState('');
  // const [age, setAge] = React.useState()
useEffect(() => {
  const fetchData=async()=>{
    const employeesData=await getEmployees();
    setEmployees(employeesData)
  }
  fetchData()
  
}, [])

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const searchHandler=async()=>{
    const response =await employeesLeaves(employee,{month,year})
    console.log(response)
    setResult(response)
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
          value={employee}
          label="Age"
          onChange={(e)=>{setEmployee(e.target.value)}}
        >
          {employees.map((val)=>{
            return <MenuItem value={val._id} key={val.name}>{val.name}</MenuItem>
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
          value={year}
          label="Age"
          onChange={handleYearChange}
        >
          <MenuItem value={2015}>2015</MenuItem>
          <MenuItem value={2016}>2016</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box >
        <Button onClick={searchHandler} variant="contained" sx={{color:"#ffffff",backgroundColor:"#00AAFF",width:"140px",height:"38px"}}>Apply</Button>
        </Box>
</Box>
        </Box>
        <Box
        sx={{ display: "flex", justifyContent: "center",mt:2 }}
      >
     <EmployeePreviousLeaves data={result}/>
     </Box>
        
    </>
  )
}

export default EmployeesLeaves