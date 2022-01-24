import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Reward from "react-rewards";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

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

const WinnerScreen = ({ winnerName }) => {
  const navigate = useNavigate();
  const rewardRef = React.useRef(null);

  useEffect(() => {
    const intv = setInterval(() => {
      rewardRef && rewardRef.current.rewardMe();
    }, 2000);

    return () => clearInterval(intv);
  }, [rewardRef]);
  return (
    <div style={{ left: "50%" , position: "absolute" }}>
      <Reward
        ref={rewardRef}
        type="emoji"
        config={{ emoji: ["💵"], spread: 90 }}
      >
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              sx={{ textAlign: "center" }}
              variant="h6"
              component="h2"
            >
              The winner is
            </Typography>

            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center" }}
              variant="h5"
            >
              <StarIcon /> {winnerName} <StarIcon />
            </Typography>

            <Button
              variant="text"
              sx={{ margin: "2rem 0 0" }}
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
            >
              EXIT
            </Button>
          </Box>
        </Modal>
      </Reward>
    </div>
  );
};

export default WinnerScreen;
