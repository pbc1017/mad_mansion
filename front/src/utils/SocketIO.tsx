// socket.ts

import { io, Socket } from "socket.io-client";

const socket: Socket = io('http://localhost:80');  // 이 URL은 실제 서버의 URL로 바꾸어야 합니다.
let hasRegisteredConnectHandler = false;

export const connectUserId = (userId: string): void => {
  if (!hasRegisteredConnectHandler) {
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('sendUserId', userId);
    });
    hasRegisteredConnectHandler = true;
  }
  
  if (!socket.connected) {
    socket.connect();
  } else {
    console.log('Already connected to server');
    socket.emit('sendUserId', userId);
  }
}

export const sendMessage = (message: string): void => {
  socket.emit('sendMessage', message, "room 1");
}

export const disconnect = (): void => {
  socket.disconnect();
}

// export const sendMessage = (message: string): void => {
//   socket.emit('message', message);
// }

export const receiveMessage = (callback: (message: string) => void): void => {
  socket.on('message', (message) => {
    callback(message);
  });
}
