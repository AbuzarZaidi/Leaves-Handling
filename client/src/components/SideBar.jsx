import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
const Sidebar = () => {
  return (
    <>
      <Box sx={{ mt: 4, mx: "auto" }}>
        <Box sx={{ ml: 5 }}>
          <img src="/icons/logo.png" alt="" />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "25px",
              color: "#00A1BB",
              mr: 1,
            }}
          >
            Mikro
          </Typography>
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "25px",
              color: "#00B7AD",
              ml:0.5
            }}
          >
            St
          </Typography><img src="/icons/star.png" style={{marginTop:"10px"}}/>
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "25px",
              color: "#00B7AD",
              ml:"-10px"
            }}
          >
            r
          </Typography>
        </Box>

        <Box sx={{ display: "flex"}}>
          <Box sx={{ display: "flex", flexDirection: "column",mt:"-2px"}}>
            <img src="/icons/logoLine.png" width="85px"></img>
            <Typography
              sx={{
                fontFamily: "Serpentine-Light",
                fontWeight: 400,
                fontSize: "8px",
                color: "#ffffff",
                mt:"-5px"
              }}
            >
              You name it, We make it
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "25px",
              color: "#ffffff",
            mt:"-10px"
            }}
          >
            Tech
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
