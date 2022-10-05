import React from 'react'
import {Grid} from './utlis/materialUIComponents'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'
import ApplyForLeave from './pages/ApplyForLeave';



function App() {
 
  return (
    
      <Grid container >
        <Grid item xs={0} md={2} lg={2} sx={{display:{xs:"none",md:"flex",lg:"flex"},backgroundColor:"#0A1833" ,height:"100vh",}}>
          <SideBar/>
        </Grid>
        <Grid item xs={12} md={10} lg={10}>
          <Navbar/>
          <ApplyForLeave/>
        </Grid>
        </Grid>
      
    
  );
}

export default App;
