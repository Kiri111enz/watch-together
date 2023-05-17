import { Server, Socket } from 'socket.io';
import http from 'http';
import * as utils from './utils';

interface SocketPlus extends Socket {
    roomId: string
}

export const init = (server: http.Server): void => {
    const roomExists = (id: string): boolean => {
        return io.sockets.adapter.rooms.has(id);
    };

    const getUniqueRoomId = (): string => {
        while (true) {
            const id = utils.randomNumber(10).toString();
            if (!roomExists(id))
                return id;
        }
    };

    const addToRoom = (roomId: string, socket: SocketPlus): void => {
        socket.roomId = roomId;
        socket.join(roomId);
    };
    
    const io = new Server(server, { cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }});

    io.on('connection', (socket: SocketPlus) => {
        console.log('New connection.');

        socket.on('createRoom', () => {
            const roomId = getUniqueRoomId();
            addToRoom(roomId, socket);
            socket.emit('createRoom', roomId);
            console.log(`Room ${roomId} has been created.`);
        });

        socket.on('joinRoom', (roomId: string) => {
            if (!roomExists(roomId)) {
                socket.emit('joinRoom', false);
                return;
            }

            addToRoom(roomId, socket);
            socket.emit('joinRoom', true);
            console.log(`Room ${roomId} has a new member.`);
        });

        socket.on('roomExists', (roomId: string) => {
            socket.emit('roomExists', roomExists(roomId));
        });
    });
};