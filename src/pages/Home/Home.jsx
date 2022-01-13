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

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleJoin = () => {
    console.log("Merge");
    navigate("/login");
    // Redirect to room
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div id="text_div center_all">
        <div className="center_all">
          <Button
            style={{
              backgroundColor: "#1A76D2",
              color: "#FFFFFF",
            }}
          >
            Create room
          </Button>
          <Button
            style={{
              backgroundColor: "#1A76D2",
              color: "#FFFFFF",
            }}
            onClick={handleClickOpen}
          >
            Join room
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
          ;
        </div>
      </div>
    </div>
  );
};

export default Home;
