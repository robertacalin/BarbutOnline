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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const PlayersList = ({ users, ownerId, withScore, scores }) => {
  //place admin at the top of the list
  const currUser = useSelector((state) => state.user);

  if (users) {
    const owner = users.find((u) => u.uid === ownerId);
    users = [owner, ...users.filter((u) => u.uid !== ownerId)];
  }

  const getRole = (user) => (user.uid === ownerId ? "Admin" : "Player");

  const isCurrUser = (user) => user.uid === currUser.uid;

  const renderAdminIcon = (user) => {
    return user.uid === ownerId && <ManageAccountsIcon />;
  };

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
          <ListItem
            secondaryAction={
              !withScore
                ? renderAdminIcon(user)
                : scores?.find((sc) => sc.uid === user.uid).score
            }
          >
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
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
  );
};

export default PlayersList;
