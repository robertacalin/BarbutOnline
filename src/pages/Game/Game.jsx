import React from "react";
import "./Game.css";
import Dice from "react-dice-roll";
import PlayersList from "../../components/PlayersList";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import CountDown from "../../components/CountDown";

const Game = ({ roomData }) => {
  const users = roomData.users;
  const [gameData, setGameData] = React.useState({});
  const [diceValue1, setDiceValue1] = React.useState(0);
  const [diceValue2, setDiceValue2] = React.useState(0);
  const [disableDice1, setDisableDice1] = React.useState(false);
  const [disableDice2, setDisableDice2] = React.useState(false);
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    let unsub;
    if (roomData.gameRef) {
      unsub = onSnapshot(doc(db, "game", roomData.gameRef), (querySnapshot) => {
        const data = querySnapshot.data();
        setGameData(data);
      });
    }
    if (user.uid === roomData.owner) {
      updateDoc(doc(db, "game", roomData.gameRef), {
        timer: new Date().getTime() / 1000 + 10,
      });
    }
    return () => unsub && unsub();
  }, []);

  React.useEffect(() => {
    setDisableDice1(false);
    setDisableDice2(false);
  }, [gameData.currentRound]);

  console.log("scores", gameData.scores);
  const updateScore = () => {
    if (diceValue1 + diceValue2) {
      const newScoreArr = gameData.scores.map((obj) => {
        if (obj.uid === user.uid) {
          obj.score += diceValue1 + diceValue2;
        }
      });
      updateDoc(doc(db, "game", roomData.gameRef), {
        scores: newScoreArr,
      });
    }
  };

  const handeRoundStart = () => {
    setDisableDice1(false);
    setDisableDice2(false);
  };

  return (
    <div>
      <h1 class="round-game">ROUND {gameData.currentRound}</h1>
      <div>
        <h1>
          <CountDown
            finalValue={gameData.timer}
            gameData={gameData}
            roomData={roomData}
            updateScore={updateScore}
          />
        </h1>
        <br></br>
        <br></br>
        <div className="d-flex flex-row justify-content-center gap-5">
          <Dice
            onRoll={(value) => {
              setDiceValue1(value);
              setDisableDice1(true);
            }}
            triggers={disableDice1 ? [] : ["Enter"]}
          />
          &nbsp;
          <Dice
            onRoll={(value) => {
              setDiceValue2(value);
              setDisableDice2(true);
            }}
            triggers={disableDice2 ? [] : ["Enter"]}
          />
        </div>
        <br></br>
        <br></br>
        <h1>Score: {diceValue1 + diceValue2}</h1>
      </div>
      <div class="participants-list">
        <h2>ROOM {roomData.name}</h2>
        <br></br>
        <PlayersList users={users} ownerId={roomData.owner} />
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
