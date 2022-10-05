import * as React from "react";
import {
    Box,
    Typography,
    TextField,
    Stack
  } from "../utlis/materialUIComponents";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";

const DatePicker = () => {
  const [value, setValue] = React.useState([null, null]);
  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Stack spacing={3}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{
          start: "Select your start date",
          end: "Select your end date",
        }}
      >
        <MobileDateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <Box
                sx={{
                  display: { xs: "flex", md: "none", lg: "none" },
                  flexDirection: "column",
                  m: "auto",
                  width: "90%",
                }}
              >
                <TextField {...startProps} />
                <Box sx={{ m: "auto" }}>
                  {" "}
                  <Typography variant="h6" component="div" gutterBottom>
                    To
                  </Typography>
                </Box>
                <TextField {...endProps} />
              </Box>
            </React.Fragment>
          )}
        />
      </LocalizationProvider>

      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{
          start: "Select your start date",
          end: "Select your end date",
        }}
      >
        <DesktopDateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <Box
                sx={{
                  width: "100%",
                  display: { xs: "none", md: "flex", lg: "flex" },
                  justifyContent: "center",
                }}
              >
                <TextField {...startProps} sx={{ width: "42.5%" }} />
                <Box sx={{ mx: 2, mt: 1 }}>
                  {" "}
                  <Typography variant="h6" component="div" gutterBottom>
                    To
                  </Typography>
                </Box>
                <TextField {...endProps} sx={{ width: "42.5%" }} />
              </Box>
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
};

export default DatePicker;
