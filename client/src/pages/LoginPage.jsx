import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "../utlis/materialUIComponents";

const LoginPage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(/icons/LoginBackground.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          height: "100vh",
          alignItem: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <img src="/icons/logo.png" alt="" width="120px" />
          </Grid>

          <Grid item xs={3} sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontFamily: "Serpentine",
                fontWeight: 700,
                fontSize: "35px",
                color: "#00A1BB",
                mr: 1,
                mt: "-20px",
              }}
            >
              Mikro
            </Typography>
            <Typography
              sx={{
                fontFamily: "Serpentine",
                fontWeight: 700,
                fontSize: "35px",
                color: "#00B7AD",
                ml: 0.5,
                mt: "-20px",
              }}
            >
              St
            </Typography>
            <img src="/icons/star.png" />
            <Typography
              sx={{
                fontFamily: "Serpentine",
                fontWeight: 700,
                fontSize: "35px",
                color: "#00B7AD",
                ml: "-10px",
                mt: "-20px",
              }}
            >
              r
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: "flex",mb:2 }}>
          <Box sx={{ display: "flex", flexDirection: "column",mt:"-8px" }}>
            <img src="/icons/logoLine.png" width="120px" ></img>
            <Typography
              sx={{
                fontFamily: "Serpentine-Light",
                fontWeight: 400,
                fontSize: "11px",
                color: "#ffffff",
                mt:"-8px" 
              }}
            >
              You name it, We make it
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Serpentine",
              fontWeight: 700,
              fontSize: "35px",
              color: "#ffffff",
              mt:"-20px" 
            }}
          >
            Tech
          </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "29px",
                color: "#ffffff",
                
              }}
            >
              LOG In
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{
                backgroundColor: "#ffffff",
                width: "450px",
                borderRadius: 1,
              }}
            />
          </Grid>
          <Grid item xs={3} sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="Password"
           
              variant="outlined"
              sx={{
                backgroundColor: "#ffffff",
                width: "450px",
                borderRadius: 1,
              }}
            />
          </Grid>
          <Grid item xs={3} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00B2A9",
                width: "240px",
                fontWeight: "medium",
                fontSize: "16px",
                mt: 3,
                textTransform:"capitalize"
              }}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
       
      </Box>
    </>
  );
};

export default LoginPage;
