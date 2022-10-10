import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "../utlis/materialUIComponents";
import SingleUser from "../components/userslist/SingleUser";
import { styled } from "@mui/material/styles";
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));
const Icon = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));
const UserList = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Icon
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "32px",
          }}
        >
          <img src="/icons/userlist.png" alt="" />
        </Icon>
        <Text
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "28px",
            ml: 3,
            mt: 1,
            mb: 2,
          }}
        >
          List of users
        </Text>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: 1,
            width: "80%",
            p: 1,
            borderColor: "#999999",
          }}
        >
          <Box sx={{ display: "flex", ml: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Sr</Typography>
            <Typography sx={{ ml: 4, fontWeight: "bold" }}>Name</Typography>
          </Box>
          <Box sx={{ display: "flex", mr: 4 }}>
            <Typography sx={{ fontWeight: "bold", mr: 4 }}>Delete</Typography>
            <Typography sx={{ fontWeight: "bold" }}>Edit</Typography>
          </Box>
        </Box>
      </Box>
      <SingleUser/>
      <SingleUser/>
      <SingleUser/>
      <SingleUser/>
      <SingleUser/>
    </>
  );
};

export default UserList;
