import * as React from "react";
import dayjs from "dayjs";
import {
  TextField,
  Stack,
  Typography,
  Box,
} from "../../utlis/materialUIComponents";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch } from "react-redux";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import {
  setStartDateHandler,
  setEndDateHandler,
} from "../../store/applyForLeave";
const DateRange = () => {
  const [startDate, setStartDate] = React.useState(dayjs());
  const dispatch = useDispatch();
  const [endDate, setEndDate] = React.useState(dayjs());
  const startDateHandler = (newValue) => {
    setStartDate(newValue);
  };
  // const endDateHandler = (newValue) => {
  //   console.log(newValue);
  //   console.log("m");
  // };
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
              dispatch(setStartDate(newValue));
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
              dispatch(setEndDateHandler(newValue));
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
              startDateHandler(newValue);
              dispatch(setStartDateHandler(newValue));
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "42.5%" }} />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ mx: 2, mt: 1 }}
          >
            To
          </Typography>
          <DesktopDatePicker
            label="Select your end date"
            value={endDate}
            // minDate={dayjs('2017-01-01')}
            onChange={(newValue) => {
              setEndDate(newValue);
              dispatch(setEndDateHandler(newValue));
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "42.5%" }} />
            )}
          />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};

export default DateRange;
