import React from "react";
import "./Game.css";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dice from "react-dice-roll";
import Countdown from 'react-countdown';

const Game = ({ roomData }) => {
  const users = roomData.users;
  const Completionist = () => {
    setDisableDice1(true);
    setDisableDice2(true);
    return (<span>Time's Up!</span>);
  }
  //pentru o valoare de 1000 este un timer de 1 secunda
  let [timerValue, setTimerValue] = React.useState(0);

  let [diceValue, setDiceValue] = React.useState(0);
  let [disableDice1, setDisableDice1] = React.useState(false);
  let [disableDice2, setDisableDice2] = React.useState(false);

  function diceRoll1(value){
    setDiceValue(0);
    setDiceValue(diceValue+=value);
    setDisableDice1(true);
  };

  function diceRoll2(value){
  setDiceValue(diceValue+=value);
  setDisableDice2(true);
  };

  const handeRoundStart = () => {
    setTimerValue(10000);
  };

  return (
    <div>
      <h1 class="round-game">ROUND 1</h1>
      <div className="dice">
      <h1><Countdown onStart = {()=>{
        setDisableDice1(false);
        setDisableDice2(false);
      }} date={Date.now() + timerValue} autoStart={false}><Completionist /></Countdown></h1>
      <br></br><br></br>
      <Dice onRoll={(value) => diceRoll1(value)} disabled	= {disableDice1}/>
      {/* aici trebuie spatiu intre zariuri */}
      &nbsp&nbsp&nbsp
      {/* dar nu cu &nbsp ca apare scrisul */}
      <Dice onRoll={(value) => diceRoll2(value)} disabled	= {disableDice2}/>
      <br></br> <br></br>
      <h1>Score: {diceValue}</h1>
      </div>
      <div class="participants-list">
        <h2>ROOM {roomData.name}</h2>
        <br></br>
        <List>
          {users &&
            users.map((user) => (
              <div>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.displayName}
                    secondary={user.role}
                  />
                  <ListItemText primary={user.score} />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
        </List>
      <div className="center_all">
        <button className="sign center-all" onClick={handeRoundStart}>
          <b>Start Round!</b>
        </button>
      </div>
      </div>
    </div>
  );
};
export default Game;
