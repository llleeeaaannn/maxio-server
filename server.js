import express from 'express';
import cors from 'cors';
import CreateSubscription from './routes/createsubscription.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/createsubscription', CreateSubscription);

app.listen(3001, () => console.log('Server running on port 3001'));