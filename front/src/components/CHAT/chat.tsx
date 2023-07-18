import React, { useEffect, useState, useRef } from "react";
import { Socket } from 'socket.io-client';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:80";  // Your server URL

const ChatRoom = () => {
  const [response, setResponse] = useState("");
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);

    socketRef.current.on("FromAPI", (data: string) => {
      setResponse(data);
    });

    socketRef.current.on("message", (message: string) => {
      setMessages(oldMessages => [...oldMessages, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socketRef.current?.emit("message", chat);
    setChat("");
  };

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <input value={chat} onChange={e => setChat(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default ChatRoom;
