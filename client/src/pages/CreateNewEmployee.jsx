import React from 'react'
import { styled } from "@mui/material/styles";
import {
    Box,
    Typography,
    TextField,
    Button,
  } from "../utlis/materialUIComponents";
  import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const Icon = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
  }));
  const Text = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
  }));
const CreateNewEmployee = () => {
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
          <img src="/icons/addemployee.png" alt="" />
        </Icon>
          <Text
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "28px",
              ml: 3,
              mb: 3,
            }}
          >
            Create New User
          </Text>
        </Box>
        {/* name */}
        <Box sx={{mt:3}}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Name
      </Typography> */}
        <Box sx={{display:"flex",justifyContent:"center"}}>
      
<TextField id="outlined-basic" label="Name" variant="outlined"  size="small" sx={{width:"30%"}}
/>
        </Box>
        </Box>
       {/* email */}
       <Box sx={{mt:3}}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
       Email
      </Typography> */}
        <Box sx={{display:"flex",justifyContent:"center"}}>
      
<TextField id="outlined-basic" label="Email" variant="outlined"  size="small" sx={{width:"30%"}}
/>
        </Box>
        </Box>
        {/* password */}
        <Box sx={{mt:3}}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Password
      </Typography> */}
        <Box sx={{display:"flex",justifyContent:"center"}}>
      
<TextField id="outlined-basic" label="Password" variant="outlined"  size="small" sx={{width:"30%"}}
/>
        </Box>
        </Box>
        {/* confirm password */}
        <Box sx={{mt:3}}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Confirm Password
      </Typography> */}
        <Box sx={{display:"flex",justifyContent:"center"}}>
      
<TextField id="outlined-basic" label="Confirm Password" variant="outlined"  size="small" sx={{width:"30%"}}
/>
        </Box>
        </Box>
        {/* probaton */}
        <Box sx={{mt:3}}>
        {/* <Typography gutterBottom sx={{fontFamily:"Montserrat",fontWeight:500,fontSize:"18px",display:"flex",justifyContent:"center"}}>
        Probation
      </Typography> */}
        <Box sx={{display:"flex",justifyContent:"center"}}>
      
<TextField id="outlined-basic" label="Probation" variant="outlined"  size="small" sx={{width:"30%"}}
/>
        </Box>
        </Box>
{/* choose position */}
<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
<FormControl>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        
      >
        <FormLabel id="demo-row-radio-buttons-group-label"sx={{display: "flex", justifyContent: "center",fontWeight:'500',mr:3,mt:0.3}}>Choose Type:</FormLabel>
        <FormControlLabel value="female"control={<Radio       
         sx={{
           
            '& .MuiSvgIcon-root': {
              fontSize: 14,
            },
           
          }}
          />}  label={
            <Typography variant="subtitle1" sx={{fontWeight:'bold',fontSize: 14,}}>Manager </Typography>
          } />
        <FormControlLabel value="male"  control={<Radio 
        sx={{
            '& .MuiSvgIcon-root': {
                fontSize: 14,
            },
          }}
        />}  label={
            <Typography variant="subtitle1" sx={{fontWeight:'bold',fontSize: 14,}}> Hr </Typography>
          }/>
        <FormControlLabel value="other" control={<Radio  
        sx={{
            '& .MuiSvgIcon-root': {
                fontSize: 14,
            },
            
          }}
        />}   label={
            <Typography variant="subtitle1" sx={{fontWeight:'bold',fontSize: 14,}}> Employee </Typography>
          } />
        
      </RadioGroup>
    </FormControl>
    </Box>
{/* button */}
<Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Button
        //   onClick={applyForLeaveHandler}
            variant="outlined"
            sx={{
              color:"#1F2533",
              fontFamily:"Montserrat",
              width: "180px",
              fontWeight: 600,
              fontSize: "14px",
              border: 3,
                  borderColor:"#007F78",
              "&:hover": {
                backgroundColor: "#1F2533",
                color:"#ffffff",
                border: 3,
                borderColor: "#1F2533",
              },
            }}
          >
            Add
          </Button>
        </Box>
    </>
  )
}

export default CreateNewEmployee