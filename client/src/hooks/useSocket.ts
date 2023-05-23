import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

export interface SocketPlus extends Socket {
    send(eventName: string, data: unknown): void
    send(eventName: string): void
    receive(eventName: string): Promise<unknown>
    getResponse(eventName: string, data: unknown): Promise<unknown>
    getResponse(eventName: string): Promise<unknown>
}

const useSocket = (): SocketPlus => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_IO_URL) as SocketPlus;
        
        socket.send = (eventName: string, data: unknown={}): void => {
            socket.emit(eventName, data);
        };

        socket.receive = (eventName: string): Promise<unknown> => {
            return new Promise((resolve, reject) => {
                socket.once(eventName, msg => resolve(msg));
                setTimeout(() => {
                    socket.off(eventName, resolve);
                    reject(Error('Server shut down.'));
                }, 5000);
            });
        };

        socket.getResponse = (eventName: string, data: unknown={}): Promise<unknown> => {
            socket.send(eventName, data);
            return socket.receive(eventName);
        };

        setSocket(socket);

        const cleanup = (): void => {
            socket.disconnect();
        };

        return cleanup;
    }, []);

    return socket;
};

export default useSocket;