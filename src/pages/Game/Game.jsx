import React, { useState } from "react";
import "./Game.css";
import { useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Game = (props) => {
    const { id } = useParams();
    const [users, setUsers] = useState([
        { id: 1, displayName: 'Frank', role: 'Admin', score: 20 },
        { id: 2, displayName: 'Vic', role: 'Player', score: 20 },
        { id: 3, displayName: 'Gina', role: 'Player', score: 20 },
        { id: 4, displayName: 'Jessi', role: 'Player', score: 20 },
        { id: 5, displayName: 'Jay', role: 'Player', score: 20 },
    ]);
    return (
        <div>
            <h1 class="round-game">ROUND 1</h1>
            <div class="participants-list">
                <h2>ROOM {id}</h2><br></br>
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
                                <ListItemText primary={user.score} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                    )}
                </List>

            </div>
        </div>
    );
};
export default Game;