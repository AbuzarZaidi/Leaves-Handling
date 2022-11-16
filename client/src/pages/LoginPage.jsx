import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "../utlis/materialUIComponents";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import {
  setLoginHandler,
  setIdHandler,
  setNameHandler,
  setTypeHandler,
} from "../store/auth";
const { login } = require("../functions/auth");
const InputField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
     width: "100%",
  },
}));
const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
      }, [])
  const loginHandler = async () => {
    if (email && password) {
      const user = {
        email,
        password,
      };

      const result = await login(user);

      if (result.success) {
        dispatch(setLoginHandler());
        dispatch(setIdHandler(result.data.userId));
        dispatch(setNameHandler(result.data.name));
        dispatch(setTypeHandler(result.data.type));
        navigate("/applyforleaves");
      } else {
        setError(true);
        setErrorMessage(result.message);
      }
    } else {
      setError(true);
      setErrorMessage("Please fill the form");
    }
  };
  return (
    <>
     {isLoading?<Box sx={{display:"flex",
  justifyContent:"center",
  alignItems:"center",
  minHeight:"100vh"}}>
    <CircularProgress size="6rem"/>
    </Box>:
      <Box
        sx={{
          backgroundImage: `url(/icons/LoginBackground.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          height: "100%",
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
            <img src="/icons/logoforlogin.png" alt="" width="120px" />
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
            <img src="/icons/star.png" alt="icon" />
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
          <Grid item xs={3} sx={{ display: "flex", mb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", mt: "-8px" }}>
              <img src="/icons/logoLine.png" width="120px" alt="icon"></img>
              <Typography
                sx={{
                  fontFamily: "sen-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  color: "#ffffff",
                  mt: "-8px",
                }}
              >
                You name it, We make it
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: "Serpentine",
                fontWeight: 500,
                fontSize: "35px",
                color: "#ffffff",
                mt: "-20px",
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
                fontWeight: 700,
                fontSize: "35px",
                color: "#ffffff",
              }}
            >
              LOG In
            </Typography>
          </Grid>
          <form>
            {error && (
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#DC0000",
                  }}
                >
                  {errorMessage}
                </Typography>
              </Box>
            )}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <InputField 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                // label="Email"
                placeholder="Email"
                size="small"
                variant="outlined"
                sx={{
                  backgroundColor: "#ffffff",
                  width: "450px",
                  borderRadius: 1,
                  border: 1,
                }}
                onFocus={() => setError(false)}
                required
                autoComplete="true"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <InputField 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="outlined-required"
                // label="Password"
                required
                placeholder="Password"
                type="password"
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#ffffff",
                  width: "450px",
                  
                  borderRadius: 1,
                }}
                onFocus={() => setError(false)}
                autoComplete="true"
              />
            </Grid>
          </form>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                // backgroundColor: "#00B2A9",
                color: "#ffffff",
                width: "240px",
                fontWeight: 600,
                fontSize: "16px",
                mt: 3,
                textTransform: "capitalize",
                border: 3,
                borderColor: "#00B2A9",
                "&:hover": {
                  backgroundColor: "#00AFFF",
                  border: 3,
                  borderColor: "#00AFFF",
                },
              }}
              onClick={loginHandler}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </Box>}
    </>
  );
};

export default LoginPage;

