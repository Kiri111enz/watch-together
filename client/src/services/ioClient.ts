import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_IO_URL);

const waitforResponse = (eventName: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        socket.once(eventName, msg => resolve(msg));
        setTimeout(() => {
            socket.off(eventName, resolve);
            reject(Error('Server shut down.'));
        }, 5000);
    });
};

export const createRoom = (): Promise<number> => {
    socket.emit('createRoom');
    return waitforResponse('createRoom') as Promise<number>;
};

export const joinRoom = (id: number): Promise<boolean> => {
    socket.emit('joinRoom', id);
    return waitforResponse('joinRoom') as Promise<boolean>;
};

export const roomExists = (id: string): Promise<boolean> => {
    socket.emit('roomExists', id);
    return waitforResponse('roomExists') as Promise<boolean>;
};