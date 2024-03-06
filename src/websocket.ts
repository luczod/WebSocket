import { Socket } from 'socket.io';
import { io } from './http';

interface IRoom {
  socket_id: string;
  username: string;
  room: string;
}

interface IMessage {
  room: string;
  text: string;
  createdAt: Date;
  username: string;
}

const users: IRoom[] = [];
const messages: IMessage[] = [];

io.on('connection', (socket: Socket) => {
  socket.on('select_room', (data: Omit<IRoom, 'socket_id'>, calllback) => {
    socket.join(data.room);

    const usersInRoom = users.find(
      (users) => users.username === data.username && users.room === data.room,
    );

    if (!!usersInRoom) {
      usersInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.room,
        username: data.username,
        socket_id: socket.id,
      });
    }

    const messagesRoom = getMessagesRoom(data.room);
    calllback(messagesRoom);
  });

  socket.on('message', (data) => {
    // save
    const message: IMessage = {
      room: data.room,
      username: data.username,
      text: data.message,
      createdAt: new Date(),
    };

    messages.push(message);

    // Send
    io.to(data.room).emit('message', message);
  });
});

function getMessagesRoom(room: string) {
  const messagesRoom = messages.filter((message) => message.room === room);
  return messagesRoom;
}
