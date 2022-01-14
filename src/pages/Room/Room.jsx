import React from "react";
import "./Room.css";
import { useParams } from "react-router-dom";

const Room = (props) => {
  const {id} = useParams();
  return <p>ROOM {id}</p>;
};

export default Room;
