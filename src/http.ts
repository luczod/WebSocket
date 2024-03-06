import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const serverHTTP = http.createServer(app);
const io = new Server(serverHTTP);

app.disable('x-powered-by');
app.use(express.static('public'));

export { serverHTTP, io };
