import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";

const setWinner = (gameData, roomData) => {
  if (gameData.scores) {
    const highestScore = Math.max.apply(
      Math,
      gameData.scores.map((obj) => {
        return obj.score;
      })
    );

    const userScore = gameData.scores.find((obj) => obj.score === highestScore);
    const winnerName = roomData.users.find(
      (u) => u.uid === userScore.uid
    ).displayName;
    console.log(winnerName);

     updateDoc(doc(db, "game", roomData.gameRef), {
      winner: winnerName
    });
  }
};

const updateGameStatus = (gameData, roomData) => {
  setTimeout(
    () =>
      updateDoc(doc(db, "game", roomData.gameRef), {
        timer: new Date().getTime() / 1000 + 15,
        currentRound: gameData.currentRound + 1,
      }),
    1000
  );
};

const CountDown = ({ finalValue, gameData, roomData, updateScore }) => {
  const [localTime, setLocalTime] = React.useState(null);
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    let intv;
    let calcTime = finalValue - new Date().getTime() / 1000;
    calcTime = Math.floor(calcTime);

    if (finalValue && !intv) {
      intv = setInterval(() => {
        let calcTime = finalValue - new Date().getTime() / 1000;
        calcTime = Math.floor(calcTime);
        calcTime >= 0 && setLocalTime(calcTime);
      }, 1000);
    }
    if (localTime === 0 && calcTime < 1) {
      if (gameData.currentRound < 3 && user.uid === roomData.owner) {
        updateGameStatus(gameData, roomData);
      }
      updateScore();
      intv && clearInterval(intv);
    }
    if (gameData.currentRound === 3 && localTime === 0 && calcTime < 1 && user.uid === roomData.owner) {
      setWinner(gameData, roomData);
      
    }
    return () => intv && clearInterval(intv);
  }, [finalValue, localTime]);

  return localTime === undefined || localTime === null
    ? " -"
    : ` ${localTime}s`;
};

export default CountDown;
