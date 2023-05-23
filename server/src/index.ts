import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as ioServer from './ioServer';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

const main = (): void => {
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => console.log(`Started listening on port ${port}.`));
    const io = ioServer.init(server);
    app.get('/roomExists', (req, res) => {
        const { roomId } = req.query;
        res.send(io.hasRoom(roomId as string));
    });
};

main();