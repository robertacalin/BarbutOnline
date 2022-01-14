import React, { useState } from "react";
import "./Room.css";
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Room = (props) => {
  const [users, setUsers] = useState([
    { id: 1, displayName: 'Frank', role: 'Admin' },
    { id: 2, displayName: 'Vic', role: 'Player' },
    { id: 3, displayName: 'Gina', role: 'Player' },
    { id: 4, displayName: 'Jessi', role: 'Player' },
    { id: 5, displayName: 'Jay', role: 'Player' },
  ]);
  const { id } = useParams();
  return (
    <div class="room-format">
      <h2>ROOM {id}</h2>
      <List>
        {users && users.map(user =>
          <div>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.displayName} secondary={user.role} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )}
      </List>
      <button className="play">
        <b>START GAME</b>
      </button>
    </div>
  );
};

export default Room;
