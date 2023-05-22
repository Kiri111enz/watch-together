import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_IO_URL);

export const receive = (eventName: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        socket.once(eventName, msg => resolve(msg));
        setTimeout(() => {
            socket.off(eventName, resolve);
            reject(Error('Server shut down.'));
        }, 5000);
    });
};

export const send = (eventName: string, data: unknown={}): void => {
    socket.emit(eventName, data);
};

export const response = (eventName: string, data: unknown={}): Promise<unknown> => {
    send(eventName, data);
    return receive(eventName);
};