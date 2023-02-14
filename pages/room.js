import React, { useState, useEffect, useRef } from "react";
import io from "Socket.IO-client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../services/slices/userSlice";
import {
  useAddMessageMutation,
  useGetMessagesMutation,
} from "../services/api/handleReqApiSlice";
import { selectAccessToken } from "../services/slices/tokenSlice";

let socket;

function room({ roomid, userId, userName }) {
  // varibles
  const [input, setInput] = useState("");
  const [messages, setMessags] = useState([]);
  const router = useRouter();
  const inputFaild = useRef(null);
  const useEffectRuning = useRef(false);
  const accessToken = useSelector(selectAccessToken);

  // mutations hooks (initilz)
  const [useAddMessage] = useAddMessageMutation();
  const [useGetMessages] = useGetMessagesMutation();

  // const [roomid, setRoomid] = useState(router.query.roomid);

  useEffect(() => {
    const getAllMessages = async () => {
      const { data } = await useGetMessages(roomid);

      if (data?.status == 200) {
        console.log(data.recordset);
        setMessags(data?.recordset);
      }
    };
    if (accessToken) {
      getAllMessages();
    }
  }, [accessToken]);

  useEffect(() => {
    if (!userId || !roomid || !userName) router.push("/room");
    if (useEffectRuning.current) return;
    useEffectRuning.current = true;
    inputFaild.current.focus();
    socketInitializer();
    console.log("refreshed");
  }, []);

  const socketInitializer = async () => {
    await fetch("api/socket");
    socket = io();
    socket.on("connect", () => {
      console.log("connected");
    });

    console.log(userName);
    socket.emit("join-room", { roomid, userName });

    socket.on("message", (msg) => {
      console.log(msg);
      setMessags((prev) => [...prev, msg]);
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("receved message");
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toISOString().split("T")[1].split(".")[0];
    const { data } = await useAddMessage({ userId, input, date, time, roomid });
    if (data?.status == 200) {
      socket.emit("chatMessage", input);
      setInput(" ");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="h-[90vh] flex flex-col justify-center items-center relative">
          <div className=" h-[70vh] w-[60%] bg-gray-100 p-3 border-2 border-gray-100">
            <div className="">
              {" "}
              {messages?.map((msg, index) => {
                return (
                  <div
                    key={index}
                    className="my-2 py-1 border-b-2 border-blue-100 "
                  >
                    <p>
                      <small className="mr-2">From : {msg.username}</small>{" "}
                      <small>
                        {msg.time} - {msg.date}
                      </small>
                    </p>
                    <p className="ml-3">{msg.message}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex  items-center absolute bottom-3 right-[50%] translate-x-[50%]">
            <form className="flex" onSubmit={sendMessage}>
              <input
                type="text"
                className="w-[500px] bg-gray-100 h-[35px]  outline-none mr-3"
                onChange={(e) => setInput(e.target.value)}
                ref={inputFaild}
              />
              <button
                className="bg-blue-300 px-2 py-1 text-white rounded-lg"
                onClick={sendMessage}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default room;

export const getServerSideProps = async (context) => {
  const roomid = context.query.roomid;
  const userId = context.query.userid;
  const userName = context.query.username;

  if (roomid && userId) {
    return {
      props: {
        roomid: roomid,
        userId: userId,
        userName: userName,
      },
    };
  } else {
    return {
      props: {
        roomid: "",
        userId: "",
        userName: "",
      },
    };
  }
};
