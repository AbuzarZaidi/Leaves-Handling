import * as React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';

const DatePicker = () => {
    const [value, setValue] = React.useState([null, null]);
React.useEffect(() => {
  console.log(value);
}, [value])

  return (
    <Stack spacing={3}>
        <Box sx={{display:{xs:"flex",md:"none",lg:"none"}}}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: 'Mobile start', end: 'Mobile end' }}
        
      >
        <MobileDateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      </Box>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: 'Desktop start', end: 'Desktop end' }}
      >
        <DesktopDateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DatePicker