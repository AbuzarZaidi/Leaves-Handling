import React,{useEffect} from 'react'
import { getEmployees,employeesLeaves} from "../functions/admins";
import {
  Box,
  Typography,
  InputLabel,
  Button,MenuItem,FormControl,Select
} from "../utlis/materialUIComponents";
import { useSelector} from "react-redux";
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
  const id = useSelector((state) => state.authData.id);
  const [year, setYear] = React.useState('');
  const [employees, setEmployees] = React.useState([]);
  const [employee, setEmployee] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [result,setResult]=React.useState('');
  // const [age, setAge] = React.useState()
useEffect(() => {
  const fetchData=async()=>{
    const response=await getEmployees(id);
    if(response.success){
      setEmployees(response.data)
    }
    
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

    const response =await employeesLeaves(id,{employeeId:employee,month,year})
    console.log(response)
    if (response.success) {
    console.log(response.data)
    setResult(response.data)}
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
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employee}
          label="Employee"
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
          label="Month"
          onChange={handleMonthChange}
        >
          <MenuItem value={1}>Jan</MenuItem>
          <MenuItem value={2}>feb</MenuItem>
          <MenuItem value={3}>mar</MenuItem>
          <MenuItem value={4}>apr</MenuItem>
          <MenuItem value={5}>may</MenuItem>
          <MenuItem value={6}>Jun</MenuItem>
          <MenuItem value={7}>Jul</MenuItem>
          <MenuItem value={8}>aug</MenuItem>
          <MenuItem value={9}>sep</MenuItem>
          <MenuItem value={10}>oct</MenuItem>
          <MenuItem value={11}>nov</MenuItem>
          <MenuItem value={12}>dec</MenuItem>
          
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
          label="Year"
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
        {/* <Button onClick={searchHandler} variant="outlined" sx={{color:"#ffffff",backgroundColor:"#00AAFF",width:"140px",height:"38px","&:hover": {
                backgroundColor: "#0A1833",
                color: "#ffffff",
                
              },}}></Button> */}
              <Button variant="outlined" onClick={searchHandler} sx={{ fontWeight: 600,
              fontSize: "14px", borderColor: "#0A1833", border: 2,width:"140px",height:"38px", color: "#1F2533","&:hover": {
                backgroundColor: "#0A1833",
                color: "#ffffff",
                borderColor: "#0A1833",
              },}}>Apply</Button>
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