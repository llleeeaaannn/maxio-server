import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const sendSubscription = async function(req, res, next) {
  try {
    const response = await fetch('https:///frank-test.chargify.com/subscriptions.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('7ctFDGmlwi7j4ozwfGnnZIstPydLKTuBVKTfv3zgGA:x').toString('base64'),
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    req.subscriptionResponse = {
      status: 200,
      message: 'Success',
      data: data
    };
    next();
  } catch (error) {
    next(error)
  }
}

router
  .route('/')
  .post([sendSubscription], function(req, res) {
    res.status(req.subscriptionResponse.status).json(req.subscriptionResponse);
  });

export default router;