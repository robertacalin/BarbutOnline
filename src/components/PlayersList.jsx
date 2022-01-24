import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

const renderScore = (user, scores) => {
  if (user && scores) {
    const allUserScores = scores.filter((obj) => {
      if (obj.uid === user.uid) return obj;
    });

    const mostRecentScore = Math.max.apply(
      Math,
      allUserScores.map((obj) => {
        return obj.score;
      })
    );

    const userScore = allUserScores.find(
      (obj) => obj.score === mostRecentScore
    );

    return userScore.score;
  }
  return 0;
};

const PlayersList = ({ users, ownerId, withScore, scores }) => {
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.user);

  if (users) {
    const owner = users.find((u) => u.uid === ownerId);
    users = [owner, ...users.filter((u) => u.uid !== ownerId)];
  }

  const getRole = (user) => (user.uid === ownerId ? "Admin" : "Player");

  const isCurrUser = (user) => (user.uid === currUser.uid ? " - YOU" : "");

  const renderAdminIcon = (user) => {
    return user.uid === ownerId && <ManageAccountsIcon />;
  };

  if (!withScore)
    return (
      <List
        dense
        sx={{
          background: "white",
          color: "black",
          borderRadius: "20px",
          padding: "15px 0",
        }}
      >
        {users?.map((user) => (
          <React.Fragment key={user.uid}>
            <ListItem secondaryAction={renderAdminIcon(user)}>
              <ListItemAvatar>
                <Avatar src={user.photo}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.displayName}
                secondary={`${getRole(user)} ${isCurrUser(user)}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    );

  if (withScore)
    return (
      <Box display="flex" flexDirection="column">
        <List
          dense
          sx={{
            background: "white",
            color: "black",
            borderRadius: "20px",
            padding: "15px 0",
            marginBottom: 10,
          }}
        >
          {users?.map((user) => (
            <React.Fragment key={user.uid}>
              <ListItem secondaryAction={renderScore(user, scores)}>
                <ListItemAvatar>
                  <Avatar src={user.photo}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.displayName}
                  secondary={`${getRole(user)} ${isCurrUser(user) && " - YOU"}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        <Button
          variant="text"
          sx={{ color: "white" }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </Box>
    );
};

export default PlayersList;
