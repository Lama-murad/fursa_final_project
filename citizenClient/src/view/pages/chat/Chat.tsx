import React, { useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import Navbar from "../../components/navbar/navbar";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import "./Chat.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { getID } from '../../../app/reducer/userReducer'


let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}
const accidentId = generateQuickGuid();
// const accidentId = '6228cd3a3675e59778e0e7ea';

function Chat() {
  const chatRoomId = useParams().chatId;
  const userId = useAppSelector(getID);
  console.log('saaaaa', userId)
  /* previose page should pass
  accedent id,orgid

   i should get user id throw redux*/

  interface messageFormat {
    chatId: String;
    from: String;
    date: Date;
    type: { type: String; enum: ["video", "picture", "message", "location"] };
    video: String;
    picture: String;
    message: String;
    location: { lat: String; lng: String };
    communicationType: { type: String; enum: ["org", "user"] }; //user = communication between org-user; org = comm.between org-org
    accidentId: String;
    orgId: String;
  }

  let orgId = "3";

  const [messages, setMessages] = useState({});

  useEffect(() => {
    socket = socketIOClient();
    socket.on("connect", () => {
      console.log("connecting?", userId, 'dd');
      //before join room, tell other that he joined
      socket.emit('enter chat', { userId, orgId })
      socket.emit("join room", chatRoomId);
    });

    socket.on('message', msg => {
      console.log(msg) // -->add to messages on DOM
    })
    //get previous messages

    //TODO: leave room
  }, []);
  const [value, setValue] = useState("");
  try {
    if (!chatRoomId) throw new Error("no chat id in params");

    const submitForm = (e: any) => {
      e.preventDefault();
      console.log(value)
      socket.emit("message", {
        from: userId,
        date: new Date().toLocaleString() + "",
        type: "message",
        video: "",
        picture: "",
        message: value,
        location: { lat: "", lng: "" },
        communicationType: "user",
        orgId: orgId,
        accidentId: accidentId
      });
      setValue("");
    };
    return (
      <div className="chatPage">
        <Navbar />

        <div className="chatContainer">
          <div className="wrapper">
            {Object.entries(messages).map(function (val: any, index) {
              const new_message: messageFormat = val["1"];
              // eslint-disable-next-line no-lone-blocks
              {
                if (new_message.from === userId)
                  return (
                    <div className="you message">{new_message.message}</div>
                  );
                else
                  return (
                    <div className="them message">{new_message.message}</div>
                  );
              }
            })}
          </div>
          <form onSubmit={submitForm}>
            <input
              autoFocus
              value={value}
              placeholder="Type your message"
              onChange={(e) => {
                setValue(e.currentTarget.value);
              }}
            />
            <input type='submit' value='send'></input>
          </form>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default Chat;
