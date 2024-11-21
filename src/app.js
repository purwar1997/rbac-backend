import express from 'express';
import cors from 'cors';
import corsOptions from './utils/corsOptions.js';
import router from './routes/index.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);

export default app;
