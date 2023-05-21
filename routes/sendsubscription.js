import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const apiKey = process.env.CHARGIFY_API_KEY;

const sendSubscription = async function(req, res, next) {
  try {
    const response = await fetch('https:///frank-test.chargify.com/subscriptions.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Error. Status: ${response.status}`);
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
