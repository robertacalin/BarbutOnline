import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const CreateRoomModal = ({ open, handleClose }) => {
  const [roomName, setRoomName] = React.useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCreate = async () => {
    const docRef = await addDoc(collection(db, "room"), {
      name: roomName,
      owner: user.uid,
      open: true,
      startGame: false,
      gameRef: '',
      users: [{ displayName: user.displayName, picture: "", uid: user.uid }],
    });

    navigate(`/room/${docRef.id}`);
  };

  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>Enter room details:</DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <TextField
              id="room-name"
              label="Room Name"
              variant="outlined"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreate} disabled={!roomName}>
          Create
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomModal;
