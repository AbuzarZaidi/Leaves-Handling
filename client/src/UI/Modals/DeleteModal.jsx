import React from 'react'
import {Modal,Typography,Box,Button} from '../../utlis/materialUIComponents'
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 250,
    bgcolor: "background.paper",
  
    boxShadow: 24,
    
  };
const DeleteModal = ({employeeData,open,handleClose,userDeleteHandler}) => {
   
  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "45px" }}>
          <img src="icons/deleteformodal.png" width="60px" alt="icon" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              fontFamily: "Montserrat",
            }}
          >
            Delete...
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "Montserrat",
            }}
          >
            Are you sure
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                mr: 1,
                borderColor: "#1F2533",
                border:2,
                px: 3,
                borderRadius: "10px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => userDeleteHandler(employeeData._id)}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#1F2533",
                px: 3,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#0A1833",
                  color: "#ffffff",
                },
              }}
            >
              Yes, Delete It
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  </div>
  )
}

export default DeleteModal