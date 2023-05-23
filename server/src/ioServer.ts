import { Server, Socket } from 'socket.io';
import http from 'http';
import * as utils from './utils';

interface ServerPlus extends Server {
    hasRoom(id: string): boolean
}

interface SocketPlus extends Socket {
    roomId: string
}

export const init = (server: http.Server): ServerPlus => {
    const getUniqueRoomId = (): string => {
        while (true) {
            const id = utils.randomNumber(10).toString();
            if (!io.hasRoom(id))
                return id;
        }
    };

    const addToRoom = (roomId: string, socket: SocketPlus): void => {
        socket.roomId = roomId;
        socket.join(roomId);
    };
    
    const io = new Server(server, { cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }}) as ServerPlus;

    io.hasRoom = (id: string): boolean => {
        return io.sockets.adapter.rooms.has(id);
    };

    io.on('connection', (socket: SocketPlus) => {
        console.log(`${socket.id} connected.`);

        socket.on('createRoom', () => {
            const roomId = getUniqueRoomId();
            addToRoom(roomId, socket);
            socket.emit('createRoom', roomId);
            console.log(`Room ${roomId} has been created.`);
        });

        socket.on('joinRoom', (roomId: string) => {
            if (!io.hasRoom(roomId)) {
                socket.emit('joinRoom', false);
                return;
            }

            addToRoom(roomId, socket);
            socket.emit('joinRoom', true);
            console.log(`Room ${roomId} has a new member.`);
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected.`);
        });
    });

    return io;
};