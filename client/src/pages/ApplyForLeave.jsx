import React from "react";
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
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
          rows={3}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
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
