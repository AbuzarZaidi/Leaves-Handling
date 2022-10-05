import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
const DateRange = () => {
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: { xs: "flex", md: "none", lg: "none" },
            justifyContent: "center",
          }}
        >
          <MobileDatePicker
            label="Select your start date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "90%" }} />
            )}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "none", lg: "none" },
            justifyContent: "center",
            
          }}
        >
          <MobileDatePicker
            label="Select your end date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "90%" }} />
            )}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex", lg: "flex" },
            justifyContent: "center",
          }}
        >
          <DesktopDatePicker
            label="Select your start date"
            value={startDate}
            // minDate={dayjs('2017-01-01')}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "42%" }} />
            )}
          />
           <Typography variant="h6" component="div" gutterBottom sx={{mx:2,mt:1}}>
        To
      </Typography>
               <DesktopDatePicker
            label="Select your end date"
            value={endDate}
            // minDate={dayjs('2017-01-01')}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "42%" }} />
            )}
          />
        </Box>
        {/* <Box
          sx={{
            display: { xs: "none", md: "flex", lg: "flex" },
            justifyContent: "center",
          }}
        >
     
          
        </Box> */}
      </Stack>
    </LocalizationProvider>
  );
};

export default DateRange;
