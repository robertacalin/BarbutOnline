import styled from "@emotion/styled";
import { Button } from "@mui/material";

const BigButton = styled(Button)({
  padding: "15px",
  borderRadius: "20px",
  color: "#525252",
  backgroundColor: "#B4F8C8",
  lineHeight: 1.5,
  fontSize: 16,
  "&:hover": {
    backgroundColor: "#94f3b0",
  },
});

export default BigButton;
