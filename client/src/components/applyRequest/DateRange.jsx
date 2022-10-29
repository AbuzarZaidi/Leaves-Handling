import  React,{useState,useEffect} from "react";
import dayjs from "dayjs";
import {
  TextField,
  Stack,
  Typography,
  Box,
} from "../../utlis/materialUIComponents";
import { setReset } from "../../store/applyForLeave";
import { useSelector } from "react-redux";
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
  const startingDate = useSelector((state) => state.leave.startDate);
  const endingDate = useSelector((state) => state.leave.endDate);
  const reset= useSelector((state) => state.leave.reset);
  const [startDate, setStartDate] = useState(startingDate);
  const dispatch = useDispatch();
  const [endDate, setEndDate] = useState(endingDate);
  const startDateHandler = (newValue) => {
    setStartDate(newValue);
  };
  // const endDateHandler = (newValue) => {
  //   console.log(newValue);
  //   console.log("m");
  // };
  useEffect(() => {
 if(reset===true){
  setStartDate(dayjs())
  setEndDate(dayjs())
  dispatch(setReset(false))
 }
  }, [reset])
  
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
            minDate={dayjs()}
            onChange={(newValue) => {
              setStartDate(newValue);
              dispatch(setStartDate(newValue));
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "90%",mt:2 }} />
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
            minDate={startDate}
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
             minDate={dayjs()}
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
            minDate={startDate}
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
