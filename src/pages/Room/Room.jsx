import React from "react";
import "./Room.css";
import { useNavigate, useParams } from "react-router-dom";
import Game from "../Game/Game";
import { Button, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import BigButton from "../../components/BigButton";
import background from "../../resources/background.jpg";
import PlayersList from "../../components/PlayersList";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

const Room = () => {
  const [roomData, setRoomData] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    let unsub;
    if (id) {
      // gets room details in real time
      unsub = onSnapshot(doc(db, "room", id), (querySnapshot) => {
        const data = { ...querySnapshot.data(), id: querySnapshot.id };
        setRoomData(data);
      });

      //add current user to room list
      updateDoc(doc(db, "room", id), {
        users: arrayUnion({
          displayName: user.displayName,
          picture: "",
          uid: user.uid,
        }),
      });
    }
    return () => unsub && unsub();
  }, [id, user]);


  const removeUserFromList = async () => {
    const newUserList = roomData.users.filter((u) => u.uid !== user.uid);
    await updateDoc(doc(db, "room", roomData.id), {
      users: [...newUserList],
    });
  };

  const exitRoom = () => {
    removeUserFromList();
    navigate("/");
  };

  const handleStartGame = async () => {
    await updateDoc(doc(db, "room", roomData.id), {
      startGame: true,
    });
  };

  const isAdmin = user.uid === roomData.owner;

  if (roomData.startGame) return <Game roomData={roomData} id={id} />;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100%"
      sx={{ backgroundImage: `url(${background})` }}
    >
      <Card variant="outlined" sx={{ minWidth: 400 }}>
        <CardContent>
          <h2>ROOM {roomData.name}</h2>
          <h6>Code: {roomData.id}</h6>
          <PlayersList users={roomData.users} ownerId={roomData.owner} />
          <Box
            id="actions"
            display="flex"
            justifyContent="space-between"
            mt="12px"
          >
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={exitRoom}
            >
              Go Back
            </Button>
            <BigButton onClick={handleStartGame} hidden={!isAdmin}>
              START GAME
            </BigButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Room;
