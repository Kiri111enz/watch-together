import axios from 'axios';

const roomExists = async (roomId: string): Promise<boolean> => {
    return (await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/roomExists`, { params: { roomId }})).data;
};

export default roomExists;