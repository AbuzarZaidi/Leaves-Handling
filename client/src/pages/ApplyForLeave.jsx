import React,{useState,useEffect} from "react";
import { createNewLeaveRequest,getManagers} from '../functions/employees'
import { useSelector,useDispatch} from "react-redux";
import {  setStartDateHandler,setEndDateHandler} from "../store/applyForLeave";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "../utlis/materialUIComponents";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import DateRange from "../components/applyRequest/DateRange";
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));
const IconText = styled(DescriptionOutlinedIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "25px",
  },
}));
const ApplyForLeave = () => {
  const dispatch = useDispatch();
  const id= useSelector((state) => state.authData.id);
  const startDate= useSelector((state) => state.leave.startDate);
  const endDate= useSelector((state) => state.leave.endDate);
  const [reasonValue,setReasonValue]=useState("");
  const [managers,setManagers]=useState([]);
  const [manager, setManager] = React.useState("");
useEffect(() => {
  const data=async()=>{
    dispatch(setStartDateHandler(new Date().toISOString()))
    dispatch(setEndDateHandler(new Date().toISOString()))
    try {
      const result = await getManagers();
      setManagers(result)
      console.log(result)
    } catch (error) {
     console.log(error) 
    }
  }
  data();
}, [])

  const handleChange = (event) => {
    setManager(event.target.value);
  };
  const applyForLeaveHandler=async()=>{
    const request={
      reason:reasonValue,
      fromDate:startDate,
      toDate:endDate,
      manager:manager,
    }
const data=await createNewLeaveRequest(request,id)
console.log(data)
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <IconText sx={{ fontWeight: 400, fontSize: "40px" }} />
        <Text
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "32px",
            ml: 3,
            mb: 3,
          }}
        >
          Apply For Leave Request
        </Text>
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
        <FormControl sx={{ width: "90%" }}>
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
            {managers.length>0?managers.map((val)=>{
              return <MenuItem value={val._id}>{val.name}</MenuItem>
            }):"no found"}
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
          onChange={(e)=>setReasonValue(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
        onClick={applyForLeaveHandler}
          variant="outlined"
          sx={{
            color:"#1F2533",
            fontFamily:"Montserrat",
            width: "240px",
            fontWeight: 600,
            fontSize: "14px",
            border: 3,
                borderColor:"#007F78",
            "&:hover": {
              backgroundColor: "#1F2533",
              color:"#ffffff",
              border: 3,
              borderColor: "#1F2533",
            },
          }}
        >
          Apply
        </Button>
      </Box>
    </>
  );
};
export default ApplyForLeave;
