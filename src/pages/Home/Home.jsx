import React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCreate = () => {
    navigate("/login");
    // Redirect to room
  };
  const handleJoin = () => {
    console.log("Merge");
    navigate("/login");
    // Redirect to room
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  return (
    <div>
      <div id="text_div center_all">
        <div className="center_all">
          <Button class="homeButton" onClick={handleClickOpenCreate}>
          <b>Create room</b>
          </Button>
          <Button class="homeButton" onClick={handleClickOpen}>
            <b>Join room</b>
          </Button>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
          >
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
                  />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleJoin}>Join</Button>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>


          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openCreate}
            onClose={handleCloseCreate}
          >
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
                  />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreate}>Create</Button>
              <Button onClick={handleCloseCreate}>Close</Button>
            </DialogActions>
          </Dialog>
          ;
        </div>
      </div>
    </div>

  );
};

export default Home;
