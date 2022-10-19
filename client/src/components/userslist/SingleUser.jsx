import React from "react";

import { Box, Typography } from "../../utlis/materialUIComponents";

import DeleteModal from "../../UI/Modals/DeleteModal";
import EditUserModal from "../../UI/Modals/EditUserModal";

const SingleUser = ({ employeeData, userDeleteHandler, userEditHandler }) => {
  const [editOpen, setEditOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  return (
    <>
      <EditUserModal
        handleEditOpen={handleEditOpen}
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        employeeData={employeeData}
        userEditHandler={userEditHandler}
      />
      <DeleteModal
        handleClose={handleClose}
        employeeData={employeeData}
        open={open}
        handleOpen={handleOpen}
        userDeleteHandler={userDeleteHandler}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }} >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#F5F5F5",
            width: "80%",
            p: 1,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", ml: 2 }}>
            <Typography>1</Typography>
            <Typography sx={{ ml: 4, width: "270px" }}>
              {employeeData.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", mr: 4 }}>
            <Typography
              sx={{ fontWeight: "bold", mr: 4, cursor: "pointer" }}
              onClick={handleOpen}
            >
              <img alt="delete" src="/icons/userlistdeletebutton.png"></img>
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={handleEditOpen}
            >
              <img alt="edit" src="/icons/userlisteditbutton.png"></img>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleUser;
