import React, { useEffect, useRef, useState } from "react";
import peer from "peerjs";
import { useSocket } from "../context/socket";
import { useParams } from "react-router-dom";

const usePeer = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return; // check if peer is already set
    isPeerSet.current = true; // set peer only once
    let myPeer;

    (async function initPeer() {
      myPeer = new (await import("peerjs")).default(); // import peerjs dynamically
      setPeer(myPeer);

      myPeer.on("open", (id) => {
        // set myId when peer is open
        console.log("My peer ID: ", id);
        setMyId(id);
        socket?.emit("join-room", roomId, id); // emit join-room event
        console.log("roomId: ", roomId, "- myPeerId: ", id);
      });
    })();
  }, [roomId, socket]);

  return { peer, myId };
};

export default usePeer;
