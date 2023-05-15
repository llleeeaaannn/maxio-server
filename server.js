const express = require('express');
const cors = require('cors');
const CreateSubscription = require('./createsubscription');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/createsubscription', CreateSubscription);

app.listen(3001, () => console.log('Server running on port 3001'));