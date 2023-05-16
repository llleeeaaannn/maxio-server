import express from 'express';
import cors from 'cors';
import SendSubscription from './routes/sendsubscription.js';
import CancelSubscription from './routes/cancelsubscription.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/createsubscription', SendSubscription);
app.use('/cancelsubscription', CancelSubscription);

app.listen(3001, () => console.log('Server running on port 3001'));
