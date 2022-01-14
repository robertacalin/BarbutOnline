import React from "react";
import "./Room.css";

class Room {
  set code(code) {
    this._code = code;
  }
  static create() {
    return new Room();
  }
}

export default Room;
