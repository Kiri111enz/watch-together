import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

const main = (): void => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Started listening on port ${port}.`));
};

main();