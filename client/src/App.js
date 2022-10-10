import React,{useEffect} from "react";
import { Routes, Route} from "react-router-dom";
import { useSelector} from "react-redux";
import ApplyForLeave from "./pages/ApplyForLeave";
import EmployeesLeaves from './pages/EmployeesLeaves';
import MyLeaves from "./pages/MyLeaves";
import LoginPage from "./pages/LoginPage";
import PageStructure from "./components/PageStructure";
import OnBehalfLeave from "./pages/OnBehalfLeave";

function App() {
  const isLogin= useSelector((state) => state.authData.isLogin);
  
  return (
    <>
          <Routes>
           <Route path="/" element={<LoginPage />} />
         {isLogin&& <Route path="/myleaves" element={<PageStructure><MyLeaves /></PageStructure>} />}
         {isLogin&& <Route path="/applyforleaves" element={<PageStructure><ApplyForLeave /></PageStructure>} />}
         {isLogin&&  <Route path="/employeesleaves" element={<PageStructure><EmployeesLeaves /></PageStructure>} />}
         {/* {isLogin&&  <Route path="/onbehalfleave" element={<PageStructure><OnBehalfLeave /></PageStructure>} />} */}
           <Route path="/onbehalfleave" element={<PageStructure><OnBehalfLeave /></PageStructure>} />
          </Routes>
    </>
  );
}

export default App;
