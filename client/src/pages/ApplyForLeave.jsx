import React, { useState, useEffect } from "react";
import AppliedModal from "../UI/Modals/AppliedModal";
import { createNewLeaveRequest, getManagers } from "../functions/employees";
import { useSelector, useDispatch } from "react-redux";
import { setStartDateHandler, setEndDateHandler,setReset } from "../store/applyForLeave";
import {
  Box,
  Typography,
  TextField,
  Button,
  DescriptionOutlinedIcon,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "../utlis/materialUIComponents";

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
  const id = useSelector((state) => state.authData.id);
  const startDate = useSelector((state) => state.leave.startDate);
  const endDate = useSelector((state) => state.leave.endDate);
  const [reasonValue, setReasonValue] = useState("");
  const [managers, setManagers] = useState([]);
  const [manager, setManager] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isError, setError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const data = async () => {
      dispatch(setStartDateHandler(new Date().toISOString()));
      dispatch(setEndDateHandler(new Date().toISOString()));
      try {
        const result = await getManagers(id);
       
        if (result.success) {
          setManagers(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [dispatch]);

  const handleChange = (event) => {
    setManager(event.target.value);
  };
  const applyForLeaveHandler = async () => {
    if (manager === "") {
      setError("manager");
    } else if (reasonValue === "") {
      setError("reason");
    } else {
      const request = {
        reason: reasonValue,
        fromDate: startDate,
        toDate: endDate,
        manager: manager
      };
      const response = await createNewLeaveRequest(request, id);
      if (response.success) {
        handleOpen();
        setManager("");
        setReasonValue("");
         dispatch(setReset(true))
      }
      console.log(response);
    }
  };
  return (
    <>
      <AppliedModal open={open} handleClose={handleClose} />
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
        <FormControl
          error={isError === "manager" ? true : false}
          sx={{ width: "90%" }}
          onFocus={() => {
            isError && setError(false);
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Select your manager
          </InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={manager}
            label={
              isError === "manager"
                ? "Select your Manager*"
                : "Select your manager"
            }
            onChange={handleChange}
          >
            {managers.length > 0
              ? managers.map((val) => {
                  return (
                    <MenuItem key={val.name} value={val._id}>
                      {val.name}
                    </MenuItem>
                  );
                })
              : "no found"}
          </Select>
        </FormControl>
      </Box>
      {/* tell your reason */}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          id="outlined-multiline-static"
          label=" Tell your reason"
          multiline
          onFocus={() => {
            isError && setError(false);
          }}
          value={reasonValue}
          error={isError === "reason" ? true : false}
          sx={{ width: "90%" }}
          rows={3}
          onChange={(e) => setReasonValue(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={applyForLeaveHandler}
          variant="outlined"
          sx={{
            color: "#1F2533",
            fontFamily: "Montserrat",
            width: "200px",
            fontWeight: 600,
            fontSize: "14px",
            border: 2,
            borderColor: "#1F2533",
            "&:hover": {
              backgroundColor: "#1F2533",
              color: "#ffffff",
              border: 2,
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
