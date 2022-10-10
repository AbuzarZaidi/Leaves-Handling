import React from "react";
import { Routes, Route} from "react-router-dom";
import { useSelector} from "react-redux";
import ApplyForLeave from "./pages/ApplyForLeave";
import EmployeesLeaves from './pages/EmployeesLeaves';
import MyLeaves from "./pages/MyLeaves";
import LoginPage from "./pages/LoginPage";
import PageStructure from "./components/PageStructure";
import OnBehalfLeave from "./pages/OnBehalfLeave";
import CreateNewEmployee from "./pages/CreateNewEmployee";
import ChangePassword from "./pages/ChangePassword";
import UserList from "./pages/UserList";
function App() {
  const isLogin= useSelector((state) => state.authData.isLogin);
  
  return (
    <>
          <Routes>
           <Route path="/" element={<LoginPage />} />
         {isLogin&& <Route path="/myleaves" element={<PageStructure><MyLeaves /></PageStructure>} />}
         
         {isLogin&& <Route path="/applyforleaves" element={<PageStructure><ApplyForLeave /></PageStructure>} />}
          <Route path="/employeesleaves" element={<PageStructure><EmployeesLeaves /></PageStructure>} />
           <Route path="/onbehalfleave" element={<PageStructure><OnBehalfLeave /></PageStructure>} />
           <Route path="/createnewemployee" element={<PageStructure><CreateNewEmployee /></PageStructure>} />
         
          <Route path="/changepassword" element={<PageStructure><ChangePassword /></PageStructure>} />
          <Route path="/userlist" element={<PageStructure><UserList /></PageStructure>} />
          </Routes>
    </>
  );
}

export default App;
