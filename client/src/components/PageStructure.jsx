import React from 'react'
import { Grid } from "../utlis/materialUIComponents";
import SideBar from './SideBar';
import Navbar from './Navbar';
const PageStructure = (props) => {
  return (
    <Grid container >
    <Grid item xs={0} md={2} lg={2} sx={{display:{xs:"none",md:"flex",lg:"flex"},backgroundColor:"#0A1833" ,height:"100%",}}>
      <SideBar/>
    </Grid>
    <Grid item xs={12} md={10} lg={10}>
      <Navbar/>
      {props.children}  

      </Grid>
        </Grid>  
  )
}

export default PageStructure