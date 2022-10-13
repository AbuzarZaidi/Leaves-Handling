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
const AppliedModal = ({open,handleClose}) => {
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
          <img src="icons/applied.png" width="60px" alt="icon" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "26px",
              fontFamily: "Montserrat",
            }}
          >
            Applied
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
            Please wait for response
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#1F2533",
                px: 3,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#1F2533",
                  color: "#ffffff",
                },
              }}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  </div>
  )
}

export default AppliedModal