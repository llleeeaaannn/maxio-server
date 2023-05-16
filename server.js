import express from 'express';
import cors from 'cors';
import SendSubscription from './routes/sendsubscription.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/createsubscription', SendSubscription);

app.listen(5000, () => console.log('Server running on port 5000'));
