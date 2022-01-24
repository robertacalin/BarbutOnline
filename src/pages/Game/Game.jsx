import React from "react";
import "./Game.css";
import Dice from "react-dice-roll";
import PlayersList from "../../components/PlayersList";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import CountDown from "../../components/CountDown";
import { Box } from "@mui/system";
import WinnerScreen from "../../components/WinnerScreen";

const Game = ({ roomData }) => {
  const users = roomData.users;
  const [gameData, setGameData] = React.useState({});
  const [diceValue1, setDiceValue1] = React.useState(0);
  const [diceValue2, setDiceValue2] = React.useState(0);
  const [rolls, setRolls] = React.useState(0);
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
        timer: new Date().getTime() / 1000 + 15,
      });
    }
    return () => unsub && unsub();
  }, [roomData, user]);

  React.useEffect(() => {
    setRolls(0);
    setDiceValue1(0);
    setDiceValue2(0);
  }, [gameData.currentRound]);

  const updateScore = async () => {
    if (gameData.scores) {
      const allUserScores = gameData.scores.filter(
        (obj) => obj.uid === user.uid
      );

      const mostRecentScore = Math.max.apply(
        Math,
        allUserScores.map((obj) => {
          return obj.score;
        })
      );

      const userScore = allUserScores.find(
        (obj) => obj.score === mostRecentScore
      );

      await updateDoc(doc(db, "game", roomData.gameRef), {
        scores: arrayUnion({
          uid: user.uid,
          score: userScore.score + diceValue1 + diceValue2,
        }),
      });
    }
  };
  /*   if (gameData && gameData.winner && gameData.winner.length > 0) {
    return <WinnerScreen winnerName={gameData.winner} />;
  } */
  return (
    <Box display="flex" minWidth="300px" gap="3rem">
      {gameData && gameData.winner && gameData.winner.length > 0 && (
        <WinnerScreen winnerName={gameData.winner} />
      )}
      <div className="players-list">
        <h2 style={{ marginBottom: "40px" }}>ROOM {roomData.name}</h2>
        <PlayersList
          users={users}
          ownerId={roomData.owner}
          scores={gameData.scores}
          withScore
        />
      </div>
      <Box
        width="100%"
        minHeight="100vh"
        padding="0 2rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <h1 className="round-game">ROUND {gameData.currentRound}</h1>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="20px"
          >
            <h3 style={{ width: 150 }}>
              Time:
              <CountDown
                finalValue={gameData.timer}
                gameData={gameData}
                roomData={roomData}
                updateScore={updateScore}
              />
            </h3>
            <h3>Rolls: {rolls}/2</h3>
          </Box>
          <h6 style={{ textAlign: "center" }}>*Press Enter to roll dice</h6>
        </Box>
        <Box display="flex" justifyContent="center" gap="4rem" padding="20px">
          <Dice
            onRoll={(value) => {
              setDiceValue1(value);
              setRolls((rolls) => rolls + 1);
            }}
            triggers={rolls === 2 ? [] : ["Enter"]}
            sound="http://cd.textfiles.com/itcontinues/WIN/YTB22/MANYDICE.WAV"
            size={150}
            rollingTime={700}
          />
          <Dice
            onRoll={(value) => {
              setDiceValue2(value);
            }}
            triggers={rolls === 2 ? [] : ["Enter"]}
            size={150}
            rollingTime={700}
          />
        </Box>
        <h1>Score: {diceValue1 + diceValue2}</h1>
      </Box>
    </Box>
  );
};
export default Game;
