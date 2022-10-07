import React from "react";
import { Routes, Route} from "react-router-dom";

import ApplyForLeave from "./pages/ApplyForLeave";
import EmployeesLeaves from './pages/EmployeesLeaves';
import MyLeaves from "./pages/MyLeaves";
import LoginPage from "./pages/LoginPage";
import PageStructure from "./components/PageStructure";


function App() {

  
  return (
    <>
   

          <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/myleaves" element={<PageStructure><MyLeaves /></PageStructure>} />
          <Route path="/applyforleaves" element={<PageStructure><ApplyForLeave /></PageStructure>} />
          <Route path="/employeesleaves" element={<PageStructure><EmployeesLeaves /></PageStructure>} />
          </Routes>
    
    </>
  );
}

export default App;
