import React from "react";
import { useParams } from "react-router-dom";
import "./Game.css";

const Game = (props) => {
    const { id } = useParams();
    return <p>GAME {id}</p>;
};
export default Game;