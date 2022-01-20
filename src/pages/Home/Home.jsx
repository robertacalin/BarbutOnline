import React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import CreateRoomModal from "../../components/CreateRoomModal";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [openCreateRoom, setOpenCreateRoom] = React.useState(false);
  const [roomId, setRoomId] = React.useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/room/" + roomId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div id="text_div center_all">
        <div className="center_all">
          <div className="d-grid gap-3">
            <button
              className="homeButton"
              onClick={() => setOpenCreateRoom(true)}
            >
              <b>Create room</b>
            </button>
            <button className="homeButton" onClick={handleClickOpen}>
              <b>Join room</b>
            </button>
          </div>
          <Dialog maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Enter room code:</DialogTitle>
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
                    id="room-code"
                    label="Room Code"
                    variant="outlined"
                    value={roomId}
                    onChange={(event) => {
                      setRoomId(event.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleJoin} disabled={!roomId}>
                Join
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>

          <CreateRoomModal
            open={openCreateRoom}
            handleClose={() => setOpenCreateRoom(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
