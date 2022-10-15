import React, { useState, useEffect } from "react";
import MyPreviousLeaves from "../components/myLeaves/MyPreviousLeaves";
import { getPreviousLeaves } from "../functions/employees";
import { useSelector } from "react-redux";
import { Box, Typography } from "../utlis/materialUIComponents";
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
  const id = useSelector((state) => state.authData.id);
  const userName = useSelector((state) => state.authData.userName);
  const [myLeaves, setMyLeaves] = useState([]);
  const [resErrorMessage, setResErrorMessage] = useState("");
  useEffect(() => {
    const data = async () => {
      try {
        const res = await getPreviousLeaves(id);
console.log('id')
console.log(id)
        if (res) {
          if (res.success) {
            setMyLeaves(res.data);
          }
        } else {
          // console.log(res.message)
          throw Error("No Data Found");
        }
      } catch (error) {
        setResErrorMessage(error);
      }
    };
    data();
  }, [id]);

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

      <Box
        sx={{ width: "95%", ml: 3, display: "flex", justifyContent: "center" }}
      >
        <MyPreviousLeaves
          myPreviousLeaves={myLeaves}
          userName={userName}
          errorMessage={resErrorMessage}
        />
      </Box>
    </>
  );
};

export default MyLeaves;
