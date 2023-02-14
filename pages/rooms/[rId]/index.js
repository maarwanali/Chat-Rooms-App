import React, { useEffect, useRef, useState } from "react";
import io from "Socket.IO-client";
import { useRouter } from "next/router";

let socket;
function Chatroom() {
  const [roomid, setRoomId] = useState();
  const [input, setInput] = useState("");
  const [messages, setMessags] = useState("");
  const router = useRouter();

  useEffect(() => {
    setRoomId(router.query.rId);
  }, [router.query]);

  useEffect(() => {
    socketInitializer();
  }, []);
  const socketInitializer = async () => {
    await fetch("api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    // socket.emit("roomId", roomid);

    socket.on("message", (msg) => {
      setMessags(msg);
    });
  };

  const sendMessage = () => {
    console.log(input);
    socket.emit("message", input);
  };
  return (
    <div>
      <div className="container">
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => sendMessage()}>Send</button>
        <p>{messages}</p>
      </div>
    </div>
  );
}

export default Chatroom;
