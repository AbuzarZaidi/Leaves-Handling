import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "../utlis/materialUIComponents";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DatePicker from "../components/DatePicker";
const ApplyForLeave = () => {
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
            mb:3
          }}
        >
          Apply For Leave Request
        </Typography>
      </Box>
    
      <DatePicker/>
  
      {/* Select Manager */}
      <Box sx={{ display: "flex", ml: 5, mt: 0.5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "16px",
            ml: 3,
          }}
        >
          Select your manager
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          sx={{ width: "90%",p:0 }}
          type="date"
        />
      </Box>
      {/* tell your reason */}
      <Box sx={{ display: "flex", ml: 5, mt: 0.5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "16px",
            ml: 3,
          }}
        >
          Tell your reason
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", }}>
        <TextField
          id="outlined-multiline-static"
          //   label="Multiline"
          multiline
          sx={{ width: "90%" }}
          rows={2}
          //   defaultValue="Default Value"
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
