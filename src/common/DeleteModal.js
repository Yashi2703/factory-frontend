import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Typography, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const DeleteModal = ({ isModalOpen, setIsModalOpen, deleteData }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="confirmModal">
        <div></div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <DeleteOutlineIcon
            style={{
              fontSize: "40px",
              color: "#f00",
              textAlign: "center",
            }}
          />
        </Typography>
        <Typography id="modal-modal-description" style={{ marginTop: "10px" }}>
          {/* {content} */}
          Are you sure you want to delete this item?
        </Typography>
        <div
          style={{
            display: "flex",
            marginTop: "25px",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Button onClick={() => deleteData()} className="blueButton">
            Delete
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false);
            //   setOpen(null);
            }}
            className=" blueButton cancel"
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
