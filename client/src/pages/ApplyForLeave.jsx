import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "../utlis/materialUIComponents";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DatePicker from "../components/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const ApplyForLeave = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <DescriptionOutlinedIcon sx={{ fontSize: "42px", fontWeight: 400 }} />
        <Typography
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
        </Typography>
      </Box>

      <DatePicker />

      {/* Select Manager */}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
       
        <FormControl sx={{ width: "90%" }}>
          <InputLabel id="demo-simple-select-label">Select your manager</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Select your manager"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
          rows={2}
          
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#007F78",
            width: "240px",
            fontWeight: "medium",
            fontSize: "16px",
          }}
        >
          Apply
        </Button>
      </Box>
    </>
  );
};
export default ApplyForLeave;
