import React from "react";
import TableRows from '../components/myLeaves/TableRows'
import TableHeadings from '../components/myLeaves/TableHeadings'
import {
  Box,
  Typography,
  TextField,
  Button,
} from "../utlis/materialUIComponents";
import { styled } from "@mui/material/styles";
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "25px",
    paddingTop: "8px",
  },
}));
const Icon = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));
const MyLeaves = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Icon
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "32px",
          }}
        >
          <img src="/icons/myLeaves.png" alt="" />
        </Icon>

        <Text
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "32px",
            ml: 3,
            mb: 4,
          }}
        >
          My Leaves
        </Text>
      </Box>
      <TableHeadings/>
      <Box sx={{width:"95%",ml:3,display:"flex",justifyContent:"center"}}>
        
     <TableRows/>
     </Box>
    </>
  );
};

export default MyLeaves;
