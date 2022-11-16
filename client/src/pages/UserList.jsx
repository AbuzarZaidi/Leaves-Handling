import React, { useState, useEffect } from "react";
import {
  allEmployees,
  deleteEmployee,
  editEmployee,
} from "../functions/admins";
import { useSelector} from "react-redux";
import {
  Box,
  Typography,
  TableContainer,
} from "../utlis/materialUIComponents";
import SingleUser from "../components/userslist/SingleUser";
import { styled } from "@mui/material/styles";
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
}));
const Icon = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));

const UserList = () => {
  const id = useSelector((state) => state.authData.id);
  
  const [employees, setEmployees] = useState([]);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const result = await allEmployees(id);
        
        if (result.success) {
          if (result.data.length > 0) {
            setEmployees(result.data);
          }
        } else {
          setError("No Data found");
        }
      } catch (error) {
        console.log(error);
        setError("No Data Found");
      }
    };
    fetchData();
    setEdit(false);
  }, [setEmployees, setEdit, edit,id]);
  const deleteUserHandler = async (uid) => {
    
    const response = await deleteEmployee(id,uid);
    console.log(response)
    if (response.success) {
      const updatedList = employees.filter((user) => user._id !== uid);
      setEmployees(updatedList);
    }
  };
  const editHandler = async (uid, editData, probationTime) => {
    const user = {
      name: editData.name,
      email: editData.email,
      probation: probationTime,
      type: editData.type,
    };
    const response = await editEmployee(id,uid, user);
    console.log(response);
    setEdit(true);
  };
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
          <img src="/icons/userlist.png" alt="" />
        </Icon>
        <Text
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "28px",
            ml: 3,
            mt: 1,
            mb: 2,
          }}
        >
          List of users
        </Text>
      </Box>
      
      
      <Box sx={{ display: "flex", justifyContent: "center" }} >
        <Box
        stickyHeader aria-label="sticky table"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: 1,
            width: "85%",
            p: 1,
            borderColor: "#999999",
          }}
        >
          <Box sx={{ display: "flex", ml: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Sr</Typography>
            <Typography sx={{ ml: 4, fontWeight: "bold" }}>Name</Typography>
          </Box>
          <Box sx={{ display: "flex", mr: 4 }}>
            <Typography sx={{ fontWeight: "bold", mr: 4 }}>Delete</Typography>
            <Typography sx={{ fontWeight: "bold" }}>Edit</Typography>
          </Box>
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: 410 }}>
      {employees.length > 0 ? (
        employees.map((val, ind) => {
          return (
            <SingleUser
              key={ind}
              index={ind}
              employeeData={val}
              id={val._id}
              userDeleteHandler={deleteUserHandler}
              userEditHandler={editHandler}
            />
          );
        })
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>{error}</Typography>
        </Box>
      )}
    </TableContainer>
    </>
  );
};

export default UserList;
