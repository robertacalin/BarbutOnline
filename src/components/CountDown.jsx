import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";

const CountDown = ({ finalValue, gameData, roomData, updateScore}) => {
  const [localTime, setLocalTime] = React.useState(null);
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    let intv;
    if (finalValue && !intv) {
      intv = setInterval(() => {
        let calcTime = finalValue - new Date().getTime() / 1000;
        calcTime = Math.floor(calcTime);
        calcTime >= 0 && setLocalTime(calcTime);
      }, 1000);
    }
    if (localTime === 0) {
      if (gameData.currentRound < 3 && user.uid === roomData.owner) {
        updateDoc(doc(db, "game", roomData.gameRef), {
          timer: new Date().getTime() / 1000 + 10,
          currentRound: gameData.currentRound + 1,
        });
    }
      updateScore();
      setLocalTime(null);
      intv && clearInterval(intv);
    }
    return () => intv && clearInterval(intv);
  }, [finalValue, localTime]);

  return localTime;
};

export default CountDown;