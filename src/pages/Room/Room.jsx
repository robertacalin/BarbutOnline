class Room {
  set code(code) {
    this._code = code;
  }
  static create() {
    return new Room();
  }
}

export default Room;
