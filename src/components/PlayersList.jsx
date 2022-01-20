import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const PlayersList = ({ users, ownerId }) => {
  //place admin at the top of the list
  if (users) {
    const owner = users.find((u) => u.uid === ownerId);
    users = [owner, ...users.filter((u) => u.uid !== ownerId)];
  }

  const getRole = (user) => (user.uid === ownerId ? "Admin" : "Player");

  const renderAdminIcon = (user) => {
    return user.uid === ownerId && <ManageAccountsIcon />;
  };

  return (
    <List dense>
      {users?.map((user) => (
        <React.Fragment key={user.uid}>
          <ListItem secondaryAction={renderAdminIcon(user)}>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.displayName}
              secondary={getRole(user)}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default PlayersList;
